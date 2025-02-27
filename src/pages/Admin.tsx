
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Clock, X, Eye, Calendar, Search, User, MapPin, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { format } from "date-fns";

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 123-4567",
    eventType: "wedding",
    date: new Date(2023, 6, 15),
    location: "Golden Gate Park, San Francisco",
    notes: "Looking for a photographer for our wedding ceremony and reception.",
    status: "pending",
    createdAt: new Date(2023, 5, 10),
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "(555) 987-6543",
    eventType: "corporate",
    date: new Date(2023, 7, 22),
    location: "Tech Conference Center, Downtown",
    notes: "Annual company event with approximately 200 attendees.",
    status: "confirmed",
    createdAt: new Date(2023, 6, 5),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "(555) 345-6789",
    eventType: "family",
    date: new Date(2023, 8, 3),
    location: "Sunset Beach",
    notes: "Family portraits with 2 children and a dog.",
    status: "completed",
    createdAt: new Date(2023, 6, 15),
  },
  {
    id: "4",
    name: "James Wilson",
    email: "j.wilson@example.com",
    phone: "(555) 456-7890",
    eventType: "portrait",
    date: new Date(2023, 7, 10),
    location: "Downtown Studio",
    notes: "Professional headshots for LinkedIn and company website.",
    status: "pending",
    createdAt: new Date(2023, 6, 20),
  },
  {
    id: "5",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    phone: "(555) 234-5678",
    eventType: "wedding",
    date: new Date(2023, 9, 12),
    location: "Meadowland Gardens",
    notes: "Wedding photography for ceremony and reception, approximately 100 guests.",
    status: "confirmed",
    createdAt: new Date(2023, 7, 1),
  },
];

const Admin: React.FC = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewBooking, setViewBooking] = useState<any | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Handle search and filtering
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterBookings(query, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterBookings(searchQuery, status);
  };

  const filterBookings = (query: string, status: string) => {
    let filtered = [...bookings];
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(
        (booking) =>
          booking.name.toLowerCase().includes(query.toLowerCase()) ||
          booking.email.toLowerCase().includes(query.toLowerCase()) ||
          booking.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter((booking) => booking.status === status);
    }
    
    setFilteredBookings(filtered);
  };

  // Handle booking status update
  const updateBookingStatus = (id: string, newStatus: string) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    filterBookings(searchQuery, statusFilter);
    
    toast({
      title: "Status updated",
      description: `Booking #${id} has been marked as ${newStatus}.`,
    });
  };

  // Handle view booking details
  const handleViewBooking = (booking: any) => {
    setViewBooking(booking);
    setIsViewDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" /> Pending
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            <Check className="w-3 h-3 mr-1" /> Confirmed
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            <Check className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            <X className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-medium">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your photography booking requests
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="mt-4 md:mt-0"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="clients">Clients</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative w-full md:w-96">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search bookings..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    <Select
                      value={statusFilter}
                      onValueChange={handleStatusFilter}
                    >
                      <SelectTrigger className="w-full md:w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="h-10 px-4 text-left font-medium">Client</th>
                            <th className="h-10 px-4 text-left font-medium">Event Type</th>
                            <th className="h-10 px-4 text-left font-medium">Date</th>
                            <th className="h-10 px-4 text-left font-medium">Status</th>
                            <th className="h-10 px-4 text-left font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                              <tr key={booking.id} className="border-b">
                                <td className="p-4 align-middle">
                                  <div>
                                    <p className="font-medium">{booking.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {booking.email}
                                    </p>
                                  </div>
                                </td>
                                <td className="p-4 align-middle capitalize">
                                  {booking.eventType}
                                </td>
                                <td className="p-4 align-middle">
                                  {format(booking.date, "MMM dd, yyyy")}
                                </td>
                                <td className="p-4 align-middle">
                                  {getStatusBadge(booking.status)}
                                </td>
                                <td className="p-4 align-middle">
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleViewBooking(booking)}
                                    >
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm">
                                          Status
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                          onClick={() => updateBookingStatus(booking.id, "pending")}
                                        >
                                          <Clock className="h-4 w-4 mr-2" />
                                          Mark as Pending
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => updateBookingStatus(booking.id, "confirmed")}
                                        >
                                          <Check className="h-4 w-4 mr-2" />
                                          Mark as Confirmed
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => updateBookingStatus(booking.id, "completed")}
                                        >
                                          <Check className="h-4 w-4 mr-2" />
                                          Mark as Completed
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => updateBookingStatus(booking.id, "cancelled")}
                                        >
                                          <X className="h-4 w-4 mr-2" />
                                          Mark as Cancelled
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                No bookings found matching your criteria.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar View</CardTitle>
                  <CardDescription>
                    Manage your bookings in a calendar view. (This feature would be implemented in a production environment)
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                    <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
                    <p className="max-w-md mx-auto mt-2">
                      The calendar view will allow you to see all your bookings in a monthly, weekly, or daily format.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <CardTitle>Client Management</CardTitle>
                  <CardDescription>
                    Manage your client database. (This feature would be implemented in a production environment)
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <User className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                    <h3 className="text-lg font-medium">Client Database Coming Soon</h3>
                    <p className="max-w-md mx-auto mt-2">
                      The client management system will allow you to track client information, communication history, and booking preferences.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your account and application settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <h3 className="text-lg font-medium">Settings Coming Soon</h3>
                    <p className="max-w-md mx-auto mt-2">
                      This section will include options to customize your account, notification preferences, and application settings.
                    </p>
                    <Button 
                      variant="destructive" 
                      className="mt-8" 
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* View Booking Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              View detailed information about this booking.
            </DialogDescription>
          </DialogHeader>
          {viewBooking && (
            <div className="space-y-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{viewBooking.name}</h3>
                  <p className="text-sm text-muted-foreground">{viewBooking.email}</p>
                </div>
                {getStatusBadge(viewBooking.status)}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Event Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(viewBooking.date, "MMMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{viewBooking.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{viewBooking.phone}</p>
                  </div>
                </div>
              </div>
              
              {viewBooking.notes && (
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm font-medium">Notes</p>
                  <p className="text-sm text-muted-foreground mt-1">{viewBooking.notes}</p>
                </div>
              )}
              
              <div className="border-t pt-4 mt-4">
                <p className="text-xs text-muted-foreground">
                  Created on {format(viewBooking.createdAt, "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Admin;
