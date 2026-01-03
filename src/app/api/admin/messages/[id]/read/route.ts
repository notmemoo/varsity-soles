import { NextRequest, NextResponse } from "next/server";
import { markContactAsRead } from "@/lib/database";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await markContactAsRead(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error marking message as read:", error);
        return NextResponse.json(
            { error: "Failed to update message" },
            { status: 500 }
        );
    }
}
