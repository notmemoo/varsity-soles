import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
    shop: [
        { label: "All Sneakers", href: "/shop" },
        { label: "New Arrivals", href: "/shop?filter=new" },
        { label: "Restored", href: "/shop?filter=restored" },
    ],
    services: [
        { label: "Restoration Services", href: "#services" },
        { label: "Pricing", href: "#services" },
        { label: "Book Now", href: "#services" },
    ],
    company: [
        { label: "About Us", href: "#about" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
    ],
};

const socialLinks = [
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

export function Footer() {
    return (
        <footer className="bg-jet border-t border-slate">
            <div className="container-custom py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.jpg"
                                alt="Varsity Soles"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <span className="font-bold text-lg">VARSITY SOLES</span>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-4">
                            Your premier destination for buying, selling, and restoring sneakers.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center hover:bg-varsity-red transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            {footerLinks.shop.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Mail className="h-4 w-4 text-varsity-red" />
                                <a href="mailto:info@varsitysoles.com" className="hover:text-foreground transition-colors">
                                    info@varsitysoles.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground text-sm">
                                <Phone className="h-4 w-4 text-varsity-red" />
                                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                                    (123) 456-7890
                                </a>
                            </li>
                            <li className="flex items-start gap-2 text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4 text-varsity-red mt-0.5" />
                                <span>123 Sneaker Street<br />Your City, ST 12345</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="my-8 bg-slate" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} Varsity Soles. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
