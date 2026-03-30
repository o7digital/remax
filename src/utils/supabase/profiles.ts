import type { User } from "@supabase/supabase-js";

import { createAdminClient } from "@/utils/supabase/admin";
import { getUserLabel } from "@/utils/supabase/auth";

export async function ensureProfileForUser(user: User) {
  const admin = createAdminClient();
  const email = user.email?.trim().toLowerCase() ?? null;

  const existingByAuth = await admin
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  if (existingByAuth.error) {
    throw existingByAuth.error;
  }

  const existingByEmail =
    !existingByAuth.data && email
      ? await admin.from("profiles").select("id").eq("email", email).maybeSingle()
      : null;

  if (existingByEmail?.error) {
    throw existingByEmail.error;
  }

  const profileId = existingByAuth.data?.id ?? existingByEmail?.data?.id ?? null;
  const profilePayload = {
    auth_user_id: user.id,
    email,
    display_name: getUserLabel(user),
    is_active: true
  };

  const savedProfile = profileId
    ? await admin.from("profiles").update(profilePayload).eq("id", profileId).select("id").single()
    : await admin.from("profiles").insert(profilePayload).select("id").single();

  if (savedProfile.error) {
    throw savedProfile.error;
  }

  if (!email) {
    return savedProfile.data.id;
  }

  const workEmailMatch = await admin
    .from("staff_members")
    .select("id, profile_id")
    .eq("work_email", email)
    .maybeSingle();

  if (workEmailMatch.error) {
    throw workEmailMatch.error;
  }

  let staffMatch = workEmailMatch.data;

  if (!staffMatch) {
    const personalEmailMatch = await admin
      .from("staff_members")
      .select("id, profile_id")
      .eq("personal_email", email)
      .maybeSingle();

    if (personalEmailMatch.error) {
      throw personalEmailMatch.error;
    }

    staffMatch = personalEmailMatch.data;
  }

  if (staffMatch?.id && staffMatch.profile_id !== savedProfile.data.id) {
    const updateStaff = await admin
      .from("staff_members")
      .update({ profile_id: savedProfile.data.id })
      .eq("id", staffMatch.id);

    if (updateStaff.error) {
      throw updateStaff.error;
    }
  }

  return savedProfile.data.id;
}
