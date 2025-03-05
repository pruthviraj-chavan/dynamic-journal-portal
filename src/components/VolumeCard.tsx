
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Volume } from "@/context/PapersContext";
import { CalendarIcon, BookOpenIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface VolumeCardProps {
  volume: Volume;
  paperCount: number;
  className?: string;
}

export default function VolumeCard({ volume, paperCount, className }: VolumeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn("content-card overflow-hidden", className)}
    >
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden rounded-lg mb-4 h-40">
          <img
            src={volume.image || "/placeholder.svg"}
            alt={volume.title}
            className="paper-image h-full w-full transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="badge-secondary">
              Volume {volume.issueNumber}
            </span>
          </div>
        </div>
        
        <h3 className="font-display font-bold text-xl mb-2 line-clamp-2">
          {volume.title}
        </h3>
        
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {volume.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center text-sm text-muted-foreground space-x-4 mb-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              <span>{MONTHS[volume.month - 1]} {volume.year}</span>
            </div>
            <div className="flex items-center">
              <BookOpenIcon className="mr-1 h-4 w-4" />
              <span>{paperCount} paper{paperCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <Button asChild className="w-full group">
            <Link to={`/volume/${volume.id}`}>
              <span>View Volume</span>
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
