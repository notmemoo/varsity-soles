"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function ContactSection() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="py-20 md:py-32 bg-charcoal">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Info */}
                    <div>
                        <Badge variant="outline" className="mb-4 border-varsity-red text-varsity-red">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Get In Touch
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Let&apos;s <span className="text-gradient">Connect</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            Have questions about our sneakers or restoration services?
                            Want to sell or trade your kicks? Drop us a message and we&apos;ll get back to you.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-varsity-red/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-varsity-red" />
                                </div>
                                <div>
                                    <p className="font-semibold">Email Us</p>
                                    <a href="mailto:info@varsitysoles.com" className="text-muted-foreground hover:text-varsity-red transition-colors">
                                        info@varsitysoles.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-varsity-red/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-varsity-red" />
                                </div>
                                <div>
                                    <p className="font-semibold">Response Time</p>
                                    <p className="text-muted-foreground">Usually within 24 hours</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <Card className="bg-jet border-slate">
                        <CardContent className="p-6 md:p-8">
                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground">
                                        We&apos;ll get back to you as soon as possible.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="Your name"
                                                required
                                                className="bg-charcoal border-slate focus:border-varsity-red"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                                className="bg-charcoal border-slate focus:border-varsity-red"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="What's this about?"
                                            className="bg-charcoal border-slate focus:border-varsity-red"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your sneakers, restoration needs, or any questions..."
                                            rows={5}
                                            required
                                            className="bg-charcoal border-slate focus:border-varsity-red resize-none"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-varsity-red hover:bg-varsity-red-dark py-6 text-lg font-semibold"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 mr-2" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
