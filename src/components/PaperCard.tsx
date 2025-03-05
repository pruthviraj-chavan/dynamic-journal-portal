
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { Paper } from "@/context/PapersContext";
import { CalendarIcon, UsersIcon, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  paper: Paper;
  className?: string;
  featured?: boolean;
}

export default function PaperCard({ paper, className, featured = false }: PaperCardProps) {
  const publishedDate = new Date(paper.publicationDate);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "content-card overflow-hidden",
        featured ? "md:grid md:grid-cols-2 gap-6" : "",
        className
      )}
    >
      {/* Paper Image */}
      <div className={cn(
        "relative overflow-hidden rounded-lg",
        featured ? "h-full" : "h-48 mb-4"
      )}>
        <img
          src={paper.image || "/placeholder.svg"}
          alt={paper.title}
          className="paper-image h-full w-full transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {paper.keywords.slice(0, 3).map((keyword, index) => (
            <span key={index} className="badge">
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Paper Content */}
      <div className="space-y-4">
        <h3 className={cn(
          "font-display font-bold line-clamp-2 hover:text-primary transition-colors",
          featured ? "text-2xl" : "text-lg"
        )}>
          <Link to={`/paper/${paper.id}`}>{paper.title}</Link>
        </h3>
        
        <p className="text-muted-foreground line-clamp-3">{paper.abstract}</p>
        
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="mr-1 h-4 w-4" />
            <span>{paper.authors.length} author{paper.authors.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 pt-2">
          {paper.authors.slice(0, 3).map((author, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarImage src={author.photo} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {index === paper.authors.length - 1 || index === 2 ? "" : ""}
            </div>
          ))}
          <div className="ml-2">
            <span className="text-sm font-medium">
              {paper.authors[0]?.name}
              {paper.authors.length > 1 && " et al."}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
