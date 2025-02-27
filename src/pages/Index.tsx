
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Clock, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/section-heading";
import ServiceCard from "@/components/ui/service-card";
import ImageWithOverlay from "@/components/ui/image-with-overlay";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    content:
      "Working with Ramjet Photography for our wedding was the best decision we made. The photos captured every emotional moment beautifully, and the team was professional and unobtrusive throughout the day.",
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Michael Chen",
    role: "Corporate Event Manager",
    content:
      "The Ramjet team delivered exceptional photos for our annual corporate event. They understood our brand and captured the essence of our company culture perfectly.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Emily Rodriguez",
    role: "Family Portrait Client",
    content:
      "Our family portraits exceeded expectations. The photographer made our children feel comfortable and captured their personalities beautifully. We'll cherish these photos forever.",
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

const services = [
  {
    title: "Wedding Photography",
    description: "Capture every magical moment of your special day with our comprehensive wedding photography packages.",
    imageSrc: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop",
    link: "/services",
  },
  {
    title: "Portrait Sessions",
    description: "Professional portrait photography for individuals, couples, and families that truly capture your essence.",
    imageSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop",
    link: "/services",
  },
  {
    title: "Corporate Events",
    description: "Elevate your corporate events with professional photography that aligns with your brand identity.",
    imageSrc: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=600&auto=format&fit=crop",
    link: "/services",
  },
  {
    title: "Family Portraits",
    description: "Preserve precious family moments with beautiful portraits that capture the unique bond you share.",
    imageSrc: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop",
    link: "/services",
  },
];

const features = [
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Premium Equipment",
    description: "We use only the highest quality cameras and lenses to ensure exceptional image clarity and detail."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Quick Turnaround",
    description: "Receive your professionally edited photos within days, not weeks, without compromising on quality."
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Personalized Experience",
    description: "Every session is tailored to your unique preferences, style, and vision for truly personalized results."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Expert Team",
    description: "Our photographers have years of experience and a passion for capturing life's most precious moments."
  }
];

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithOverlay
            src="https://images.unsplash.com/photo-1566133548668-e77b1a13c2bb?q=80&w=2000&auto=format&fit=crop"
            alt="Photography Hero"
            ratio={16/9}
            imageClassName="w-full h-full object-cover"
            overlayClassName="bg-black/40"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight"
            >
              Capturing Life's Most Precious Moments
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            >
              Professional photography services for weddings, portraits, events, and more
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <Button asChild size="lg" className="text-base">
                <Link to="/book">Book a Session</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                <Link to="/gallery">View Gallery</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container px-6 mx-auto">
          <SectionHeading
            eyebrow="Our Services"
            title="Professional Photography Services"
            description="We offer a wide range of photography services to capture your special moments with precision and artistry."
            center
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                imageSrc={service.imageSrc}
                link={service.link}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button asChild size="lg">
              <Link to="/services" className="flex items-center space-x-2">
                <span>View All Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden"
            >
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1552642986-ccb41e7059e7?q=80&w=800&auto=format&fit=crop"
                alt="Photographer in action"
                ratio={4/5}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <SectionHeading
                eyebrow="About Us"
                title="Passionate About Photography"
                description="With over 10 years of experience, Ramjet Photography has been capturing life's most precious moments with artistry and precision."
              />
              
              <p className="text-muted-foreground">
                Our team of skilled photographers specializes in a variety of styles and techniques, ensuring that we can accommodate your unique vision and preferences. We believe that every photo tells a story, and we're dedicated to telling yours in the most beautiful way possible.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex space-x-4">
                    <div className="flex-shrink-0 h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6">
                <Button asChild variant="outline">
                  <Link to="/about">Learn More About Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-6 mx-auto">
          <SectionHeading
            eyebrow="Our Work"
            title="Featured Photography"
            description="Browse through a selection of our best work across different photography genres."
            center
            className="mb-16"
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=800&auto=format&fit=crop"
                alt="Wedding photography"
                ratio={1}
                className="rounded-lg overflow-hidden h-full"
              />
            </div>
            <div>
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1544717305-f9c88f2897cf?q=80&w=400&auto=format&fit=crop"
                alt="Portrait photography"
                ratio={1}
                className="rounded-lg overflow-hidden"
              />
            </div>
            <div>
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1602526429747-ac387a91d43b?q=80&w=400&auto=format&fit=crop"
                alt="Family photography"
                ratio={1}
                className="rounded-lg overflow-hidden"
              />
            </div>
            <div>
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=400&auto=format&fit=crop"
                alt="Corporate photography"
                ratio={1}
                className="rounded-lg overflow-hidden"
              />
            </div>
            <div>
              <ImageWithOverlay
                src="https://images.unsplash.com/photo-1594022277257-32b2895ed8ae?q=80&w=400&auto=format&fit=crop"
                alt="Event photography"
                ratio={1}
                className="rounded-lg overflow-hidden"
              />
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/gallery" className="flex items-center space-x-2">
                <span>Explore Full Gallery</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container px-6 mx-auto">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Clients Say"
            description="Don't just take our word for it. Hear what our satisfied clients have to say about their experience with us."
            center
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border p-8 rounded-xl"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={testimonial.imageSrc}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 z-0">
          <ImageWithOverlay
            src="https://images.unsplash.com/photo-1600025282051-ec0c6bf3137a?q=80&w=2000&auto=format&fit=crop"
            alt="Photography setup"
            ratio={16/9}
            imageClassName="w-full h-full object-cover"
            overlayClassName="bg-black/60"
          />
        </div>

        <div className="container px-6 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium"
            >
              Ready to Capture Your Special Moments?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-white/80"
            >
              Book your photography session today and let us help you create memories that will last a lifetime.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <Link to="/book">Book Your Session Now</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
