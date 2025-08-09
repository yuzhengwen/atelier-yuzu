export async function GET() {
  return Response.json({
    DEBUG_TEXT: process.env.DEBUG_TEXT,
    NODE_ENV: process.env.NODE_ENV
  });
}