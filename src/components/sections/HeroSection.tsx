"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-jet via-charcoal to-jet" />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-varsity-red/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-varsity-red/5 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-varsity-red/10 border border-varsity-red/20 mb-8">
                        <Sparkles className="w-4 h-4 text-varsity-red" />
                        <span className="text-sm font-medium text-varsity-red">Premium Sneaker Marketplace</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        <span className="block">Buy. Sell. Trade.</span>
                        <span className="block text-gradient mt-2">Restore.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Your premier destination for authentic sneakers. Shop rare kicks,
                        trade your collection, or bring your worn favorites back to life with
                        our professional restoration services.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="#shop">
                            <Button
                                size="lg"
                                className="bg-varsity-red hover:bg-varsity-red-dark text-white px-8 py-6 text-lg font-semibold hover-lift group"
                            >
                                Shop Collection
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="#services">
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-slate hover:bg-charcoal px-8 py-6 text-lg font-semibold hover-lift"
                            >
                                Restoration Services
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate/50">
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-varsity-red">500+</div>
                            <div className="text-sm text-muted-foreground mt-1">Sneakers Sold</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-varsity-red">1000+</div>
                            <div className="text-sm text-muted-foreground mt-1">Restorations</div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-4xl font-bold text-varsity-red">100%</div>
                            <div className="text-sm text-muted-foreground mt-1">Authentic</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
