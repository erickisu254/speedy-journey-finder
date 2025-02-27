
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  center = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        center && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium tracking-wider text-primary uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl"
          style={{ marginLeft: center ? "auto" : undefined, marginRight: center ? "auto" : undefined }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
