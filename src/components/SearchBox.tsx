
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePapers, Paper } from "@/context/PapersContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  onSearch?: (results: Paper[]) => void;
  inline?: boolean;
}

export default function SearchBox({ 
  className, 
  placeholder = "Search papers...", 
  onSearch,
  inline = false 
}: SearchBoxProps) {
  const { searchPapers } = usePapers();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Paper[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search query change
  useEffect(() => {
    if (query.length > 2) {
      const searchResults = searchPapers(query);
      setResults(searchResults);
      setIsOpen(true);
      if (onSearch) onSearch(searchResults);
    } else {
      setResults([]);
      if (onSearch) onSearch([]);
      setIsOpen(false);
    }
  }, [query, searchPapers, onSearch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length > 0) {
      const searchResults = searchPapers(query);
      if (inline && onSearch) {
        onSearch(searchResults);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const handleSelectPaper = (paper: Paper) => {
    navigate(`/paper/${paper.id}`);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    if (onSearch) onSearch([]);
  };

  return (
    <div className={cn("relative", className)} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-10 py-6 bg-secondary/50 border-secondary w-full"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full rounded-lg glass shadow-lg overflow-hidden max-h-96 overflow-y-auto"
          >
            <div className="py-2">
              <p className="px-4 py-2 text-sm text-muted-foreground">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              <ul>
                {results.map((paper) => (
                  <li key={paper.id}>
                    <button
                      onClick={() => handleSelectPaper(paper)}
                      className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors"
                    >
                      <p className="font-medium line-clamp-1">{paper.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {paper.authors.map(a => a.name).join(", ")}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
