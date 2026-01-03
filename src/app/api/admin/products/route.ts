import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET all products
export async function GET() {
    try {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// POST create new product
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from("products")
            .insert({
                name: body.name,
                brand: body.brand,
                size: body.size,
                price: body.price,
                description: body.description || null,
                condition: body.condition,
                images: body.images || [],
                category: body.category,
                in_stock: body.in_stock ?? true,
                featured: body.featured ?? false,
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
