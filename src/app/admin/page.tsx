import { Package, ShoppingCart, Wrench, MessageSquare, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Stats cards for the dashboard
const stats = [
    {
        title: "Total Products",
        value: "0",
        description: "Active listings",
        icon: Package,
        href: "/admin/products",
        color: "text-blue-500",
    },
    {
        title: "Orders",
        value: "0",
        description: "Pending orders",
        icon: ShoppingCart,
        href: "/admin/orders",
        color: "text-green-500",
    },
    {
        title: "Restorations",
        value: "0",
        description: "Active requests",
        icon: Wrench,
        href: "/admin/restorations",
        color: "text-orange-500",
    },
    {
        title: "Messages",
        value: "0",
        description: "Unread messages",
        icon: MessageSquare,
        href: "/admin/messages",
        color: "text-purple-500",
    },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with Varsity Soles.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Link key={stat.title} href={stat.href}>
                        <Card className="bg-charcoal border-slate hover:border-varsity-red/50 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="bg-charcoal border-slate">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-varsity-red" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link
                            href="/admin/products/new"
                            className="block p-3 rounded-lg bg-jet hover:bg-slate/50 transition-colors"
                        >
                            <span className="font-medium">+ Add New Product</span>
                            <p className="text-sm text-muted-foreground">List a new sneaker for sale</p>
                        </Link>
                        <Link
                            href="/admin/restorations"
                            className="block p-3 rounded-lg bg-jet hover:bg-slate/50 transition-colors"
                        >
                            <span className="font-medium">View Restoration Requests</span>
                            <p className="text-sm text-muted-foreground">Check pending restoration jobs</p>
                        </Link>
                        <Link
                            href="/admin/messages"
                            className="block p-3 rounded-lg bg-jet hover:bg-slate/50 transition-colors"
                        >
                            <span className="font-medium">Check Messages</span>
                            <p className="text-sm text-muted-foreground">Respond to customer inquiries</p>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-charcoal border-slate">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            Revenue Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-8">
                            <p className="text-4xl font-bold">$0.00</p>
                            <p className="text-muted-foreground mt-2">Total Revenue</p>
                            <p className="text-sm text-muted-foreground mt-4">
                                Revenue tracking will be available once Square is connected.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
