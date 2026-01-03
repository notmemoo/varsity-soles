"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Camera, X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// Placeholder gallery items - in production, these would come from a database
const galleryItems = [
    {
        id: 1,
        title: "Jordan 1 Restoration",
        category: "restoration",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop",
    },
    {
        id: 2,
        title: "Nike Air Max Cleaning",
        category: "cleaning",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    },
    {
        id: 3,
        title: "Yeezy Deep Clean",
        category: "cleaning",
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&h=600&fit=crop",
    },
    {
        id: 4,
        title: "New Balance Suede Restore",
        category: "restoration",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=600&fit=crop",
    },
    {
        id: 5,
        title: "Air Force 1 Un-Yellowing",
        category: "unyellowing",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
    },
    {
        id: 6,
        title: "Dunk Collection",
        category: "inventory",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&h=600&fit=crop",
    },
];

const categories = [
    { id: "all", label: "All" },
    { id: "restoration", label: "Restorations" },
    { id: "cleaning", label: "Cleaning" },
    { id: "unyellowing", label: "Un-Yellowing" },
    { id: "inventory", label: "Inventory" },
];

export function GallerySection() {
    const [filter, setFilter] = useState("all");
    const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

    const filteredItems = filter === "all"
        ? galleryItems
        : galleryItems.filter(item => item.category === filter);

    return (
        <section id="gallery" className="py-20 md:py-32 bg-jet">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <Badge variant="outline" className="mb-4 border-varsity-red text-varsity-red">
                        <Camera className="w-3 h-3 mr-1" />
                        Our Work
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Gallery <span className="text-gradient">Showcase</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Browse our collection of restored sneakers and inventory highlights.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category.id
                                    ? "bg-varsity-red text-white"
                                    : "bg-charcoal text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedImage(item)}
                            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-semibold">{item.title}</p>
                                <Badge variant="secondary" className="mt-1 bg-varsity-red/20 text-varsity-red border-0">
                                    {item.category}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox Dialog */}
                <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                    <DialogContent className="max-w-4xl bg-jet border-slate p-0 overflow-hidden">
                        <VisuallyHidden>
                            <DialogTitle>{selectedImage?.title ?? "Gallery Image"}</DialogTitle>
                        </VisuallyHidden>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        {selectedImage && (
                            <div className="relative aspect-square md:aspect-video">
                                <Image
                                    src={selectedImage.image}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                        {selectedImage && (
                            <div className="p-4 border-t border-slate">
                                <h3 className="font-semibold text-lg">{selectedImage.title}</h3>
                                <Badge variant="secondary" className="mt-1 bg-varsity-red/20 text-varsity-red border-0">
                                    {selectedImage.category}
                                </Badge>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
}
