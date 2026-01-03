import { NextResponse } from "next/server";
import { getRestorationRequests } from "@/lib/database";

export async function GET() {
    try {
        const requests = await getRestorationRequests();
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Error fetching restoration requests:", error);
        return NextResponse.json(
            { error: "Failed to fetch requests" },
            { status: 500 }
        );
    }
}
