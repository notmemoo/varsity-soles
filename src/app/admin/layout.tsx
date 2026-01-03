import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Wrench,
    MessageSquare,
    Settings,
    LogOut,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/restorations", label: "Restorations", icon: Wrench },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

function Sidebar({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col h-full bg-jet border-r border-slate ${className}`}>
            {/* Logo */}
            <div className="p-4 border-b border-slate">
                <Link href="/admin" className="flex items-center gap-2">
                    <Image
                        src="/logo.jpg"
                        alt="Varsity Soles"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <span className="font-bold text-sm">VARSITY SOLES</span>
                        <span className="text-xs text-muted-foreground block">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-charcoal transition-colors"
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate space-y-2">
                <Link href="/" target="_blank">
                    <Button variant="outline" className="w-full justify-start border-slate">
                        View Site
                    </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-jet border-b border-slate p-4">
                <div className="flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Image
                            src="/logo.jpg"
                            alt="Varsity Soles"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <span className="font-bold text-sm">Admin</span>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar />
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed left-0 top-0 bottom-0 w-64">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
