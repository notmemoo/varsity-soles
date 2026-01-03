"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
    Wrench,
    Search,
    Filter,
    MoreHorizontal,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type RestorationRequest = {
    id: string;
    request_number: string;
    customer_name: string;
    email: string;
    service_type: string;
    sneaker_brand: string;
    sneaker_model: string;
    status: string;
    quote?: number;
    created_at: string;
    images: string[];
    description: string;
};

export default function RestorationsPage() {
    const [requests, setRequests] = useState<RestorationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRequest, setSelectedRequest] = useState<RestorationRequest | null>(null);
    const [quoteAmount, setQuoteAmount] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch("/api/admin/restorations");
            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string, quote?: number) => {
        setUpdating(true);
        try {
            const response = await fetch(`/api/admin/restorations/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status, quote }),
            });

            if (response.ok) {
                setRequests(requests.map(req =>
                    req.id === id ? { ...req, status, quote: quote || req.quote } : req
                ));
                setSelectedRequest(null);
            }
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setUpdating(false);
        }
    };

    const handleQuoteSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRequest && quoteAmount) {
            updateStatus(selectedRequest.id, "quoted", parseFloat(quoteAmount));
        }
    };

    const filteredRequests = requests.filter(req =>
        req.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.request_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.sneaker_model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const statusColors: Record<string, string> = {
        pending: "bg-yellow-500/20 text-yellow-500",
        quoted: "bg-blue-500/20 text-blue-400",
        approved: "bg-purple-500/20 text-purple-400",
        in_progress: "bg-orange-500/20 text-orange-400",
        completed: "bg-green-500/20 text-green-400",
        cancelled: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Restorations</h1>
                    <p className="text-muted-foreground">Manage service requests and quotes</p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, order #, or sneaker..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-charcoal border-slate"
                    />
                </div>
            </div>

            {loading ? (
                <Card className="bg-charcoal border-slate">
                    <CardContent className="py-12 text-center">
                        <p className="text-muted-foreground">Loading requests...</p>
                    </CardContent>
                </Card>
            ) : filteredRequests.length === 0 ? (
                <Card className="bg-charcoal border-slate">
                    <CardContent className="py-12 text-center">
                        <Wrench className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No active requests</h3>
                        <p className="text-muted-foreground">
                            New restoration requests will appear here
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-charcoal border-slate">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate">
                                <TableHead>Request #</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Sneaker</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Quote</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRequests.map((req) => (
                                <TableRow key={req.id} className="border-slate">
                                    <TableCell className="font-mono">{req.request_number.slice(0, 8)}</TableCell>
                                    <TableCell>{format(new Date(req.created_at), "MMM d")}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{req.customer_name}</div>
                                        <div className="text-xs text-muted-foreground">{req.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        {req.sneaker_brand} {req.sneaker_model}
                                    </TableCell>
                                    <TableCell>{req.service_type}</TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[req.status.toLowerCase()] || "bg-slate-500/20"}>
                                            {req.status.replace("_", " ").toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {req.quote ? `$${req.quote.toFixed(2)}` : "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-jet border-slate">
                                                    <DialogTrigger asChild onClick={() => setSelectedRequest(req)}>
                                                        <DropdownMenuItem>
                                                            <DollarSign className="w-4 h-4 mr-2" />
                                                            Send Quote
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                    <DropdownMenuItem onClick={() => updateStatus(req.id, "approved")}>
                                                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                        Mark Approved
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(req.id, "in_progress")}>
                                                        <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                                        Start Work
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(req.id, "completed")}>
                                                        <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                                                        Mark Complete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                            <DialogContent className="bg-jet border-slate">
                                                <DialogHeader>
                                                    <DialogTitle>Send Quote</DialogTitle>
                                                    <DialogDescription>
                                                        Set a price for the {selectedRequest?.service_type} on {selectedRequest?.sneaker_model}.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleQuoteSubmit}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label htmlFor="quote" className="text-right">
                                                                Amount ($)
                                                            </Label>
                                                            <Input
                                                                id="quote"
                                                                type="number"
                                                                value={quoteAmount}
                                                                onChange={(e) => setQuoteAmount(e.target.value)}
                                                                className="col-span-3 bg-charcoal border-slate"
                                                                placeholder="150.00"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit" disabled={updating} className="bg-varsity-red">
                                                            {updating ? "Sending..." : "Send Quote"}
                                                        </Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}
