"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
    { href: "#shop", label: "Shop" },
    { href: "#services", label: "Restoration" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo.jpg"
                            alt="Varsity Soles"
                            width={50}
                            height={50}
                            className="rounded-full"
                        />
                        <span className="font-bold text-lg hidden sm:block">
                            VARSITY SOLES
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <ShoppingBag className="h-5 w-5" />
                        </Button>
                        <Button className="bg-varsity-red hover:bg-varsity-red-dark">
                            Shop Now
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-jet border-slate">
                            <div className="flex flex-col gap-8 mt-8">
                                <Link href="/" className="flex items-center gap-2">
                                    <Image
                                        src="/logo.jpg"
                                        alt="Varsity Soles"
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <span className="font-bold">VARSITY SOLES</span>
                                </Link>
                                <nav className="flex flex-col gap-4">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                                <Button className="bg-varsity-red hover:bg-varsity-red-dark w-full">
                                    Shop Now
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
