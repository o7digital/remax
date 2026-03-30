import { createClient } from "@supabase/supabase-js";

function parseArgs(argv) {
  const parsed = {};

  for (const arg of argv) {
    if (!arg.startsWith("--")) {
      continue;
    }

    const [key, value] = arg.slice(2).split("=");
    parsed[key] = value ?? "";
  }

  return parsed;
}

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function requireArg(args, name) {
  const value = args[name];

  if (!value) {
    throw new Error(`Missing --${name}`);
  }

  return value;
}

const args = parseArgs(process.argv.slice(2));
const email = requireArg(args, "email").trim().toLowerCase();
const password = requireArg(args, "password");
const displayName = (args.name ?? "ERP Admin").trim();

const supabase = createClient(
  requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const { data: userPage, error: listError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000
});

if (listError) {
  throw listError;
}

let authUser = userPage.users.find((user) => user.email?.toLowerCase() === email) ?? null;

if (!authUser) {
  const createUserResult = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: displayName
    }
  });

  if (createUserResult.error || !createUserResult.data.user) {
    throw createUserResult.error ?? new Error("Unable to create auth user");
  }

  authUser = createUserResult.data.user;
} else {
  const updateUserResult = await supabase.auth.admin.updateUserById(authUser.id, {
    password,
    email_confirm: true,
    user_metadata: {
      ...(authUser.user_metadata ?? {}),
      full_name: displayName
    }
  });

  if (updateUserResult.error || !updateUserResult.data.user) {
    throw updateUserResult.error ?? new Error("Unable to update auth user");
  }

  authUser = updateUserResult.data.user;
}

const existingByAuth = await supabase.from("profiles").select("id").eq("auth_user_id", authUser.id).maybeSingle();

if (existingByAuth.error) {
  throw existingByAuth.error;
}

const existingByEmail =
  !existingByAuth.data ? await supabase.from("profiles").select("id").eq("email", email).maybeSingle() : null;

if (existingByEmail?.error) {
  throw existingByEmail.error;
}

const profileId = existingByAuth.data?.id ?? existingByEmail?.data?.id ?? null;
const savedProfile = profileId
  ? await supabase
      .from("profiles")
      .update({
        auth_user_id: authUser.id,
        email,
        display_name: displayName,
        is_active: true
      })
      .eq("id", profileId)
      .select("id")
      .single()
  : await supabase
      .from("profiles")
      .insert({
        auth_user_id: authUser.id,
        email,
        display_name: displayName,
        is_active: true
      })
      .select("id")
      .single();

if (savedProfile.error) {
  throw savedProfile.error;
}

const existingStaffByProfile = await supabase
  .from("staff_members")
  .select("id")
  .eq("profile_id", savedProfile.data.id)
  .maybeSingle();

if (existingStaffByProfile.error) {
  throw existingStaffByProfile.error;
}

const existingStaffByWorkEmail =
  !existingStaffByProfile.data ? await supabase.from("staff_members").select("id").eq("work_email", email).maybeSingle() : null;

if (existingStaffByWorkEmail?.error) {
  throw existingStaffByWorkEmail.error;
}

const existingStaffByPersonalEmail =
  !existingStaffByProfile.data && !existingStaffByWorkEmail?.data
    ? await supabase.from("staff_members").select("id").eq("personal_email", email).maybeSingle()
    : null;

if (existingStaffByPersonalEmail?.error) {
  throw existingStaffByPersonalEmail.error;
}

const staffId =
  existingStaffByProfile.data?.id ??
  existingStaffByWorkEmail?.data?.id ??
  existingStaffByPersonalEmail?.data?.id ??
  null;

const savedStaff = staffId
  ? await supabase
      .from("staff_members")
      .update({
        profile_id: savedProfile.data.id,
        display_name: displayName,
        work_email: email,
        staff_kind: "admin",
        advisor_class: "staff",
        employment_status: "active",
        is_guard_eligible: false
      })
      .eq("id", staffId)
      .select("id")
      .single()
  : await supabase
      .from("staff_members")
      .insert({
        profile_id: savedProfile.data.id,
        display_name: displayName,
        work_email: email,
        staff_kind: "admin",
        advisor_class: "staff",
        employment_status: "active",
        is_guard_eligible: false,
        metadata: {
          bootstrap: "scripts/bootstrap_supabase_admin.mjs"
        }
      })
      .select("id")
      .single();

if (savedStaff.error) {
  throw savedStaff.error;
}

const roleLookup = await supabase
  .from("staff_roles")
  .select("id")
  .eq("staff_member_id", savedStaff.data.id)
  .eq("role_code", "admin")
  .maybeSingle();

if (roleLookup.error) {
  throw roleLookup.error;
}

if (!roleLookup.data) {
  const insertRoleResult = await supabase.from("staff_roles").insert({
    staff_member_id: savedStaff.data.id,
    role_code: "admin",
    role_label: "Administrator",
    is_primary: true,
    starts_on: new Date().toISOString().slice(0, 10)
  });

  if (insertRoleResult.error) {
    throw insertRoleResult.error;
  }
}

console.log(
  JSON.stringify(
    {
      email,
      authUserId: authUser.id,
      profileId: savedProfile.data.id,
      staffId: savedStaff.data.id,
      role: "admin"
    },
    null,
    2
  )
);
