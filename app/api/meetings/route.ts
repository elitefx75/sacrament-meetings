import { getMeetings } from "../../../lib/meetings-db";
import { NextRequest } from "next/server";

export function GET(request: NextRequest) {
    const date = request.nextUrl.searchParams.get("date");
    return Response.json(getMeetings(date));
}
