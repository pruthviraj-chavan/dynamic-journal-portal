
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PaperCard from "@/components/PaperCard";
import { Badge } from "@/components/ui/badge";

const Volume = () => {
  const { id } = useParams<{ id: string }>();
  const { volumes, getPapersByVolume } = usePapers();
  const [searchQuery, setSearchQuery] = useState("");
  
  const volume = volumes.find(v => v.id === id);
  const papers = getPapersByVolume(id || "");
  
  // Filter papers based on search query
  const filteredPapers = papers.filter(paper => {
    const query = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(query) ||
      paper.abstract.toLowerCase().includes(query) ||
      paper.authors.some(author => author.name.toLowerCase().includes(query)) ||
      paper.keywords.some(keyword => keyword.toLowerCase().includes(query))
    );
  });

  if (!volume) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Volume not found</h2>
          <p className="mb-8">The volume you are looking for does not exist or has been removed.</p>
          <Link to="/archives">
            <Button>Back to Archives</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <Link to="/archives">
                <Button variant="ghost" size="sm" className="mb-2">
                  ← Back to Archives
                </Button>
              </Link>
              <h1 className="text-4xl font-bold">{volume.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-sm">
                  Volume {volume.issueNumber}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {new Date(volume.year, volume.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                </Badge>
              </div>
            </div>
            {volume.image && (
              <div className="hidden md:block h-32 w-32 rounded-md overflow-hidden">
                <img 
                  src={volume.image} 
                  alt={volume.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-lg p-6 mb-8">
            <p className="text-lg">{volume.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Papers in this Volume</h2>
            <div className="flex items-center space-x-4 mb-6">
              <Input
                type="text"
                placeholder="Search papers by title, author, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  onClick={() => setSearchQuery("")}
                  size="sm"
                >
                  Clear
                </Button>
              )}
            </div>
            
            {filteredPapers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPapers.map((paper) => (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/paper/${paper.id}`}>
                      <PaperCard paper={paper} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No papers found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery 
                    ? "No papers match your search criteria. Try different keywords."
                    : "There are no papers published in this volume yet."}
                </p>
                {searchQuery && (
                  <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Volume;
