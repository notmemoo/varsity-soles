import { supabase } from "./supabase";

// ==================== PRODUCTS ====================

export type Product = {
    id: string;
    name: string;
    brand: string;
    size: number;
    price: number;
    description?: string;
    condition: "new" | "used" | "restored";
    images: string[];
    category: string;
    in_stock: boolean;
    featured: boolean;
    created_at: string;
    updated_at: string;
};

export async function getProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("in_stock", true)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Product[];
}

export async function getFeaturedProducts() {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .eq("in_stock", true)
        .limit(8);

    if (error) throw error;
    return data as Product[];
}

export async function getProductById(id: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data as Product;
}

export async function createProduct(product: Omit<Product, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

    if (error) throw error;
    return data as Product;
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
        .from("products")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as Product;
}

export async function deleteProduct(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
}

// ==================== ORDERS ====================

export type Order = {
    id: string;
    order_number: string;
    customer_email: string;
    customer_name: string;
    customer_phone?: string;
    shipping_address: Record<string, unknown>;
    status: string;
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
    payment_id?: string;
    payment_status?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
};

export async function getOrders() {
    const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Order[];
}

export async function createOrder(order: Omit<Order, "id" | "order_number" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
        .from("orders")
        .insert(order)
        .select()
        .single();

    if (error) throw error;
    return data as Order;
}

export async function updateOrderStatus(id: string, status: string) {
    const { data, error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as Order;
}

// ==================== RESTORATION REQUESTS ====================

export type RestorationRequest = {
    id: string;
    request_number: string;
    customer_name: string;
    email: string;
    phone?: string;
    service_type: string;
    sneaker_brand: string;
    sneaker_model: string;
    size?: number;
    description: string;
    images: string[];
    status: string;
    quote?: number;
    estimated_completion?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
};

export async function getRestorationRequests() {
    const { data, error } = await supabase
        .from("restoration_requests")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data as RestorationRequest[];
}

export async function createRestorationRequest(
    request: Omit<RestorationRequest, "id" | "request_number" | "created_at" | "updated_at">
) {
    const { data, error } = await supabase
        .from("restoration_requests")
        .insert(request)
        .select()
        .single();

    if (error) throw error;
    return data as RestorationRequest;
}

export async function updateRestorationStatus(id: string, status: string, quote?: number) {
    const updates: Record<string, unknown> = { status, updated_at: new Date().toISOString() };
    if (quote !== undefined) updates.quote = quote;

    const { data, error } = await supabase
        .from("restoration_requests")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data as RestorationRequest;
}

// ==================== CONTACT SUBMISSIONS ====================

export type ContactSubmission = {
    id: string;
    name: string;
    email: string;
    subject?: string;
    message: string;
    read: boolean;
    created_at: string;
};

export async function getContactSubmissions() {
    const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ContactSubmission[];
}

export async function createContactSubmission(
    submission: Omit<ContactSubmission, "id" | "read" | "created_at">
) {
    const { data, error } = await supabase
        .from("contact_submissions")
        .insert(submission)
        .select()
        .single();

    if (error) throw error;
    return data as ContactSubmission;
}

export async function markContactAsRead(id: string) {
    const { error } = await supabase
        .from("contact_submissions")
        .update({ read: true })
        .eq("id", id);

    if (error) throw error;
}
