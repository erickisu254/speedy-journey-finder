
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

interface ImageWithOverlayProps {
  src: string;
  alt: string;
  ratio?: number;
  overlay?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
}

const ImageWithOverlay: React.FC<ImageWithOverlayProps> = ({
  src,
  alt,
  ratio = 1,
  overlay,
  className,
  imageClassName,
  overlayClassName,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <AspectRatio ratio={ratio} className="bg-muted/30">
        {!isLoaded && (
          <div className="absolute inset-0 bg-muted/20 animate-pulse" />
        )}
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.05,
          }}
          transition={{ duration: 0.5 }}
          className={cn(
            "object-cover w-full h-full",
            imageClassName
          )}
        />
      </AspectRatio>
      
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-black/20 flex items-center justify-center",
            overlayClassName
          )}
        >
          {overlay}
        </div>
      )}
    </div>
  );
};

export default ImageWithOverlay;
