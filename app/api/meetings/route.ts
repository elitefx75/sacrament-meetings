import { getMeetings } from "../../../lib/meetings-db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get("date");
    return Response.json(await getMeetings(date ?? undefined));
}
