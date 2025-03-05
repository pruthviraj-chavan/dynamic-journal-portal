
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaperCard from "@/components/PaperCard";
import SearchBox from "@/components/SearchBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Search = () => {
  const location = useLocation();
  const { searchPapers, papers, volumes } = usePapers();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(papers);
  const [activeTab, setActiveTab] = useState("papers");
  
  // Parse the search query from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
    
    if (q) {
      setSearchResults(searchPapers(q));
    } else {
      setSearchResults([]);
    }
  }, [location.search, searchPapers]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
    window.history.pushState({}, "", newUrl);
    setSearchResults(searchPapers(searchQuery));
  };
  
  // Filter volumes based on search query
  const filteredVolumes = volumes.filter(volume => {
    const query = searchQuery.toLowerCase();
    return (
      volume.title.toLowerCase().includes(query) ||
      volume.description.toLowerCase().includes(query)
    );
  });
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
          
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch} className="flex w-full space-x-2">
              <Input
                type="text"
                placeholder="Search papers, authors, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Search</Button>
            </form>
          </div>
          
          {searchQuery && (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold">
                  Search results for: <span className="text-primary">{searchQuery}</span>
                </h2>
                <p className="text-muted-foreground">
                  Found {searchResults.length} papers and {filteredVolumes.length} volumes matching your search
                </p>
              </div>
              
              <Tabs defaultValue="papers" className="max-w-5xl mx-auto">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="papers" 
                    onClick={() => setActiveTab("papers")}
                  >
                    Papers ({searchResults.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="volumes" 
                    onClick={() => setActiveTab("volumes")}
                  >
                    Volumes ({filteredVolumes.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="papers" className="mt-6">
                  {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.map((paper) => (
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
                      <p className="text-muted-foreground">
                        Try different keywords or browse our archives.
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="volumes" className="mt-6">
                  {filteredVolumes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVolumes.map((volume) => (
                        <motion.div
                          key={volume.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link to={`/volume/${volume.id}`}>
                            <div className="bg-card border rounded-lg overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                              {volume.image && (
                                <div className="aspect-[3/2] bg-muted">
                                  <img 
                                    src={volume.image} 
                                    alt={volume.title} 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold mb-2">{volume.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                  Volume {volume.issueNumber} | {new Date(volume.year, volume.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                                </p>
                                <p className="text-sm mb-4 flex-1">{volume.description}</p>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-lg">
                      <h3 className="text-xl font-medium mb-2">No volumes found</h3>
                      <p className="text-muted-foreground">
                        Try different keywords or browse our archives.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
          
          {!searchQuery && (
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Start searching</h2>
              <p className="text-muted-foreground mb-8">
                Use the search box above to find papers, authors, or research topics.
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Popular searches</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Quantum Computing", "Artificial Intelligence", "Sustainability", "Data Science", "Blockchain"].map((topic, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery(topic);
                        const newUrl = `/search?q=${encodeURIComponent(topic)}`;
                        window.history.pushState({}, "", newUrl);
                        setSearchResults(searchPapers(topic));
                      }}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Search;
