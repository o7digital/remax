export const runtime = 'nodejs';

export async function POST() {
  return Response.json(
    {
      error:
        'CSV import from the application is disabled. Use a private backup restore outside the repo.',
    },
    { status: 410 }
  );
}
