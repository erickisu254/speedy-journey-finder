
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ImageWithOverlay from "./image-with-overlay";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  imageSrc,
  link,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ImageWithOverlay
          src={imageSrc}
          alt={title}
          ratio={4/3}
          className="w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-grow space-y-2 p-6">
        <h3 className="font-serif text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{description}</p>
        <div className="pt-4">
          <Button asChild className="w-full" variant="outline">
            <Link to={link}>Learn More</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
