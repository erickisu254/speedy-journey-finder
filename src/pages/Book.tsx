
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneRegex, {
    message: "Please enter a valid phone number.",
  }),
  eventType: z.string({
    required_error: "Please select an event type.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  notes: z.string().optional(),
});

const eventTypes = [
  { value: "wedding", label: "Wedding Photography" },
  { value: "portrait", label: "Portrait Session" },
  { value: "family", label: "Family Photography" },
  { value: "corporate", label: "Corporate Event" },
  { value: "product", label: "Product Photography" },
  { value: "other", label: "Other" },
];

const Book: React.FC = () => {
  const { toast } = useToast();
  const [formattedRequest, setFormattedRequest] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Format the request sentence
    const request = `My name is ${values.name}, and I'm interested in a ${
      eventTypes.find((type) => type.value === values.eventType)?.label || values.eventType
    } session. The ideal session date would be ${format(
      values.date,
      "MMMM dd, yyyy"
    )}. You can get in touch with me at ${values.phone}.`;
    
    setFormattedRequest(request);

    try {
      // Here you would normally send the data to your API
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      toast({
        title: "Booking request sent!",
        description: "We'll contact you shortly to confirm your booking.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your booking request could not be sent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="container px-6 mx-auto">
          <SectionHeading
            eyebrow="Book a Session"
            title="Schedule Your Photography Session"
            description="Fill out the form below to request a photography session. We'll get back to you within 24 hours to confirm your booking."
            center
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto">
            {!isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="eventType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select event type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {eventTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Preferred Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter session location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes</FormLabel>
                          <FormControl>
                            <textarea
                              className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Any special requests or additional information"
                              {...field}
                            ></textarea>
                          </FormControl>
                          <FormDescription>
                            Share any specific requirements or questions you might have.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Book Your Session"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-8 text-center"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-medium">Booking Request Received!</h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest in our photography services. We'll review your request and get back to you within 24 hours.
                  </p>
                  
                  {formattedRequest && (
                    <div className="mt-6 p-4 bg-secondary/50 rounded-lg text-left">
                      <p className="text-sm font-medium mb-2">Your request summary:</p>
                      <p className="italic text-muted-foreground">"{formattedRequest}"</p>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button variant="outline" onClick={() => setIsSuccess(false)} className="mr-4">
                      Edit Request
                    </Button>
                    <Button asChild>
                      <a href="/">Return Home</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
