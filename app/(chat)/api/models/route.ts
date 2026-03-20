import {
  getAllGatewayModels,
  getCapabilities,
  isDemo,
} from "@/lib/ai/models";

export async function GET() {
  const headers = {
    "Cache-Control": "public, max-age=86400, s-maxage=86400",
  };

  if (isDemo) {
    const models = await getAllGatewayModels();
    const capabilities = Object.fromEntries(
      models.map((m) => [m.id, m.capabilities])
    );

    return Response.json({ capabilities, models }, { headers });
  }

  const capabilities = await getCapabilities();
  return Response.json(capabilities, { headers });
}
