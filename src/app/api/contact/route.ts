import { NextRequest, NextResponse } from "next/server";
import { createContactSubmission } from "@/lib/database";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Save to database
        const submission = await createContactSubmission({
            name,
            email,
            subject: subject || null,
            message,
        });

        return NextResponse.json(
            { success: true, id: submission.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to submit contact form" },
            { status: 500 }
        );
    }
}
