"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { use } from "react";

const brands = [
    "Nike",
    "Jordan",
    "Adidas",
    "New Balance",
    "Yeezy",
    "Puma",
    "Reebok",
    "Converse",
    "Vans",
    "Other",
];

const sizes = Array.from({ length: 21 }, (_, i) => (i + 4) * 0.5 + 3.5); // 4 to 14

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");

    // Form initial state
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        size: "",
        price: "",
        condition: "",
        category: "",
        description: "",
        in_stock: true,
        featured: false,
    });

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/admin/products/${id}`);
            if (!response.ok) throw new Error("Failed to fetch product");

            const product = await response.json();
            setFormData({
                name: product.name,
                brand: product.brand,
                size: product.size.toString(),
                price: product.price.toString(),
                condition: product.condition,
                category: product.category,
                description: product.description || "",
                in_stock: product.in_stock,
                featured: product.featured,
            });
            setImageUrls(product.images || []);
        } catch (error) {
            console.error("Error fetching product:", error);
            alert("Failed to load product details");
            router.push("/admin/products");
        } finally {
            setLoading(false);
        }
    };

    const addImageUrl = () => {
        if (newImageUrl && !imageUrls.includes(newImageUrl)) {
            setImageUrls([...imageUrls, newImageUrl]);
            setNewImageUrl("");
        }
    };

    const removeImage = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);

        const submissionData = {
            ...formData,
            size: parseFloat(formData.size),
            price: parseFloat(formData.price),
            images: imageUrls,
        };

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                router.push("/admin/products");
            } else {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold">Edit Product</h1>
                    <p className="text-muted-foreground">Update product details</p>
                </div>
            </div>

            {/* Form */}
            <Card className="bg-charcoal border-slate">
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                placeholder="e.g., Air Jordan 1 Retro High OG Chicago"
                                required
                                className="bg-jet border-slate"
                            />
                        </div>

                        {/* Brand & Category */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand *</Label>
                                <Select
                                    value={formData.brand}
                                    onValueChange={(val) => handleChange("brand", val)}
                                    required
                                >
                                    <SelectTrigger className="bg-jet border-slate">
                                        <SelectValue placeholder="Select brand" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-jet border-slate">
                                        {brands.map((brand) => (
                                            <SelectItem key={brand} value={brand}>
                                                {brand}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="category">Category *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(val) => handleChange("category", val)}
                                    required
                                >
                                    <SelectTrigger className="bg-jet border-slate">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-jet border-slate">
                                        <SelectItem value="sneakers">Sneakers</SelectItem>
                                        <SelectItem value="accessories">Accessories</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Size & Price */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="size">Size (US) *</Label>
                                <Select
                                    value={formData.size}
                                    onValueChange={(val) => handleChange("size", val)}
                                    required
                                >
                                    <SelectTrigger className="bg-jet border-slate">
                                        <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-jet border-slate max-h-60">
                                        {sizes.map((size) => (
                                            <SelectItem key={size} value={size.toString()}>
                                                {size}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($) *</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={(e) => handleChange("price", e.target.value)}
                                    placeholder="299.00"
                                    required
                                    className="bg-jet border-slate"
                                />
                            </div>
                        </div>

                        {/* Condition */}
                        <div className="space-y-2">
                            <Label htmlFor="condition">Condition *</Label>
                            <Select
                                value={formData.condition}
                                onValueChange={(val) => handleChange("condition", val)}
                                required
                            >
                                <SelectTrigger className="bg-jet border-slate">
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent className="bg-jet border-slate">
                                    <SelectItem value="new">New / Deadstock</SelectItem>
                                    <SelectItem value="used">Used</SelectItem>
                                    <SelectItem value="restored">Restored</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                placeholder="Add details about the condition, colorway, etc..."
                                rows={4}
                                className="bg-jet border-slate resize-none"
                            />
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                            <Label>Product Images</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="Paste image URL..."
                                    className="bg-jet border-slate"
                                />
                                <Button type="button" onClick={addImageUrl} variant="outline" className="border-slate">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                            {imageUrls.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {imageUrls.map((url, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={url}
                                                alt={`Product ${i + 1}`}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Switches */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="in_stock">In Stock</Label>
                                    <p className="text-sm text-muted-foreground">Product is available for purchase</p>
                                </div>
                                <Switch
                                    id="in_stock"
                                    checked={formData.in_stock}
                                    onCheckedChange={(checked) => handleChange("in_stock", checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="featured">Featured</Label>
                                    <p className="text-sm text-muted-foreground">Show in Fresh Drops section</p>
                                </div>
                                <Switch
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => handleChange("featured", checked)}
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-4">
                            <Link href="/admin/products" className="flex-1">
                                <Button type="button" variant="outline" className="w-full border-slate">
                                    Cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-varsity-red hover:bg-varsity-red-dark"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
