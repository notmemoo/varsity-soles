import { NextRequest, NextResponse } from "next/server";
import { updateRestorationStatus } from "@/lib/database";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status, quote } = body;

        const updated = await updateRestorationStatus(id, status, quote);
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Error updating restoration request:", error);
        return NextResponse.json(
            { error: "Failed to update request" },
            { status: 500 }
        );
    }
}
