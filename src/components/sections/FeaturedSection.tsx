"use client";

import Image from "next/image";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Placeholder featured products - in production, these would come from a database
const featuredProducts = [
    {
        id: 1,
        name: "Air Jordan 1 Retro High OG",
        brand: "Jordan",
        price: 320,
        condition: "Restored",
        size: 10,
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
    },
    {
        id: 2,
        name: "Nike Dunk Low Panda",
        brand: "Nike",
        price: 180,
        condition: "New",
        size: 9.5,
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=500&fit=crop",
    },
    {
        id: 3,
        name: "Yeezy Boost 350 V2",
        brand: "Adidas",
        price: 275,
        condition: "Used",
        size: 11,
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop",
    },
    {
        id: 4,
        name: "New Balance 550",
        brand: "New Balance",
        price: 150,
        condition: "New",
        size: 10.5,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop",
    },
];

const conditionColors = {
    New: "bg-green-500/20 text-green-400",
    Used: "bg-yellow-500/20 text-yellow-400",
    Restored: "bg-varsity-red/20 text-varsity-red",
};

export function FeaturedSection() {
    return (
        <section id="shop" className="py-20 md:py-32 bg-jet">
            <div className="container-custom">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <Badge variant="outline" className="mb-4 border-varsity-red text-varsity-red">
                            <ShoppingBag className="w-3 h-3 mr-1" />
                            Featured Kicks
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                            Fresh <span className="text-gradient">Drops</span>
                        </h2>
                        <p className="text-muted-foreground mt-2 max-w-lg">
                            Hand-picked sneakers from our collection. Authentic, verified, and ready to ship.
                        </p>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline" className="border-slate hover:bg-charcoal group">
                            View All
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <Card
                            key={product.id}
                            className="bg-charcoal border-slate hover:border-varsity-red/50 transition-all duration-300 hover-lift group overflow-hidden"
                        >
                            <div className="relative aspect-square overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <Badge
                                    className={`absolute top-3 left-3 ${conditionColors[product.condition as keyof typeof conditionColors]} border-0`}
                                >
                                    {product.condition}
                                </Badge>
                            </div>
                            <CardContent className="p-4">
                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                    {product.brand}
                                </p>
                                <h3 className="font-semibold line-clamp-1 mb-1">{product.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">Size {product.size}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-bold text-varsity-red">${product.price}</span>
                                    <Button size="sm" className="bg-varsity-red hover:bg-varsity-red-dark">
                                        <ShoppingBag className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
