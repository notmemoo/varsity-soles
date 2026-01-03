import { NextResponse } from "next/server";
import { getContactSubmissions } from "@/lib/database";

export async function GET() {
    try {
        const messages = await getContactSubmissions();
        return NextResponse.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
