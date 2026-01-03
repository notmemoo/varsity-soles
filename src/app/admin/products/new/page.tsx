"use client";

import { useState } from "react";
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

export default function NewProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");

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
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            brand: formData.get("brand") as string,
            size: parseFloat(formData.get("size") as string),
            price: parseFloat(formData.get("price") as string),
            condition: formData.get("condition") as string,
            category: formData.get("category") as string,
            description: formData.get("description") as string,
            images: imageUrls,
            in_stock: formData.get("in_stock") === "on",
            featured: formData.get("featured") === "on",
        };

        try {
            const response = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                router.push("/admin/products");
            } else {
                throw new Error("Failed to create product");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                    <h1 className="text-3xl font-bold">Add New Product</h1>
                    <p className="text-muted-foreground">Add a sneaker to your inventory</p>
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
                                name="name"
                                placeholder="e.g., Air Jordan 1 Retro High OG Chicago"
                                required
                                className="bg-jet border-slate"
                            />
                        </div>

                        {/* Brand & Category */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand *</Label>
                                <Select name="brand" required>
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
                                <Select name="category" required>
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
                                <Select name="size" required>
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
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="299.00"
                                    required
                                    className="bg-jet border-slate"
                                />
                            </div>
                        </div>

                        {/* Condition */}
                        <div className="space-y-2">
                            <Label htmlFor="condition">Condition *</Label>
                            <Select name="condition" required>
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
                                name="description"
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
                            <p className="text-xs text-muted-foreground">
                                Add image URLs from Imgur, Cloudinary, or other image hosts
                            </p>
                        </div>

                        {/* Switches */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="in_stock">In Stock</Label>
                                    <p className="text-sm text-muted-foreground">Product is available for purchase</p>
                                </div>
                                <Switch id="in_stock" name="in_stock" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label htmlFor="featured">Featured</Label>
                                    <p className="text-sm text-muted-foreground">Show in Fresh Drops section</p>
                                </div>
                                <Switch id="featured" name="featured" />
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
                                disabled={loading}
                                className="flex-1 bg-varsity-red hover:bg-varsity-red-dark"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Product"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
