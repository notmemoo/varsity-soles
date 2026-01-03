"use client";

import { useState, useEffect } from "react";
import { Mail, Calendar, Check, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

type Message = {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    read: boolean;
    created_at: string;
};

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch("/api/admin/messages");
            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/messages/${id}/read`, {
                method: "PUT",
            });
            if (response.ok) {
                setMessages(messages.map(m =>
                    m.id === id ? { ...m, read: true } : m
                ));
            }
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Messages</h1>
                    <p className="text-muted-foreground">Customer inquiries from contact form</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading messages...</p>
                </div>
            ) : messages.length === 0 ? (
                <Card className="bg-charcoal border-slate">
                    <CardContent className="py-12 text-center">
                        <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                        <p className="text-muted-foreground">
                            When customers contact you, their messages will appear here.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <Card className="bg-charcoal border-slate">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-slate hover:bg-transparent">
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.map((item) => (
                                    <TableRow key={item.id} className="border-slate">
                                        <TableCell>
                                            {item.read ? (
                                                <Badge variant="secondary" className="bg-slate/50">Read</Badge>
                                            ) : (
                                                <Badge className="bg-varsity-red">New</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {format(new Date(item.created_at), "MMM d, yyyy")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="truncate max-w-[200px]">
                                                {item.subject || "No Subject"}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => !item.read && markAsRead(item.id)}
                                                    >
                                                        View Message
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="bg-jet border-slate">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl">{item.subject || "No Subject"}</DialogTitle>
                                                        <DialogDescription>
                                                            From {item.name} ({item.email}) on {format(new Date(item.created_at), "PPpp")}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="mt-4 p-4 bg-charcoal rounded-lg border border-slate min-h-[120px] whitespace-pre-wrap">
                                                        {item.message}
                                                    </div>
                                                    <div className="flex justify-end gap-2 mt-4">
                                                        <Button asChild variant="default" className="bg-varsity-red hover:bg-varsity-red-dark">
                                                            <a href={`mailto:${item.email}?subject=Re: ${item.subject || 'Inquiry'}`}>
                                                                <Mail className="w-4 h-4 mr-2" />
                                                                Reply via Email
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
