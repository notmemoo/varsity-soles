"use client";

import { Check, AlertCircle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const services = [
    {
        id: 1,
        name: "Light Cleaning",
        price: 50,
        description: "Surface cleaning to refresh your sneakers",
        popular: false,
    },
    {
        id: 2,
        name: "Deep Cleaning",
        price: 60,
        description: "Top to bottom/inside & out cleaning. Minor un-yellowing included if needed",
        popular: false,
    },
    {
        id: 3,
        name: "Un-Yellowing & Deep Cleaning",
        price: 80,
        description: "Complete sole restoration with thorough cleaning",
        popular: true,
    },
    {
        id: 4,
        name: "Suede Light Clean",
        price: 60,
        description: "Gentle cleaning for delicate suede materials",
        popular: false,
    },
    {
        id: 5,
        name: "Suede Deep Clean",
        price: 80,
        description: "Intensive suede restoration and cleaning",
        popular: false,
    },
    {
        id: 6,
        name: "Un-Yellowing & Suede Deep Clean",
        price: 100,
        description: "Complete suede and sole restoration package",
        popular: false,
    },
    {
        id: 7,
        name: "Full Restoration",
        price: 120,
        description: "Taking care of any and all flaws except major glue and paint work",
        popular: true,
    },
];

const policies = [
    "Varsity Soles is not liable for ANY damages to customer items while in our possession.",
    "Not all items will yield brand new results, but we will always attempt to recreate brand new/original quality and detail.",
    "Varsity Soles is NOT obligated to refund service fees for unsatisfactory work.",
    "Previous work done to any items MUST be mentioned prior to paying for services.",
    "If a customer is contacted to pick up finished items and does not pick up within 14 days, Varsity Soles has the right to dispose of owner's property.",
    "Any turnaround times given are estimations and not concrete. Quality of work is more important to us than quantity of work.",
];

export function ServicesSection() {
    return (
        <section id="services" className="py-20 md:py-32 bg-charcoal">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="outline" className="mb-4 border-varsity-red text-varsity-red">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Restoration Services
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Bring Your Kicks <span className="text-gradient">Back to Life</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Professional sneaker restoration services to make your worn favorites look like new.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-varsity-red/10 border border-varsity-red/20">
                        <AlertCircle className="w-4 h-4 text-varsity-red" />
                        <span className="text-sm font-medium text-varsity-red">2 Pair Minimum Required</span>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {services.map((service) => (
                        <Card
                            key={service.id}
                            className={`bg-jet border-slate hover:border-varsity-red/50 transition-all duration-300 hover-lift ${service.popular ? "ring-2 ring-varsity-red" : ""
                                }`}
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        {service.popular && (
                                            <Badge className="bg-varsity-red text-white mb-2">Most Popular</Badge>
                                        )}
                                        <CardTitle className="text-lg">{service.name}</CardTitle>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-varsity-red">${service.price}</span>
                                        <span className="text-muted-foreground text-sm block">/pair</span>
                                    </div>
                                </div>
                                <CardDescription className="text-muted-foreground">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href="#contact">
                                    <Button
                                        variant={service.popular ? "default" : "outline"}
                                        className={service.popular ? "w-full bg-varsity-red hover:bg-varsity-red-dark" : "w-full border-slate hover:bg-charcoal"}
                                    >
                                        Book Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Major Restorations CTA */}
                <div className="text-center mb-16">
                    <Card className="bg-gradient-to-r from-varsity-red/10 to-varsity-red/5 border-varsity-red/30 max-w-2xl mx-auto">
                        <CardContent className="py-8">
                            <h3 className="text-xl font-bold mb-2">Need Major Restoration Work?</h3>
                            <p className="text-muted-foreground mb-4">
                                For major glue work, paint work, or custom projects, please contact us for a custom quote.
                            </p>
                            <Link href="#contact">
                                <Button className="bg-varsity-red hover:bg-varsity-red-dark">
                                    Request Custom Quote
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Policies */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-varsity-red" />
                        Service Policies
                    </h3>
                    <div className="space-y-3">
                        {policies.map((policy, index) => (
                            <div key={index} className="flex items-start gap-3 text-muted-foreground">
                                <Check className="w-5 h-5 text-varsity-red shrink-0 mt-0.5" />
                                <span className="text-sm">{policy}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground italic">
                        * Express options available upon request. Quality of work is more important to us than quantity of work.
                    </p>
                </div>
            </div>
        </section>
    );
}
