import { auth, currentUser } from "@clerk/nextjs/server";

export async function getAuthenticatedUserEmail() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const user = await currentUser();
  const primaryEmail = user?.emailAddresses.find(
    (entry) => entry.id === user?.primaryEmailAddressId
  );

  return primaryEmail?.emailAddress ?? null;
}
