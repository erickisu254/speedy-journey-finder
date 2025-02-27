
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { ArrowLeft, Camera } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <section className="py-20 flex items-center min-h-[70vh]">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <Camera className="h-16 w-16 mx-auto text-primary/30" />
            <h1 className="text-6xl md:text-8xl font-serif font-medium">404</h1>
            <h2 className="text-2xl md:text-3xl font-medium">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="pt-6">
              <Button asChild size="lg">
                <Link to="/" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
