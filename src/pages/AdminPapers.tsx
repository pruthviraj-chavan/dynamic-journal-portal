
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Eye, MoreVertical, Plus, Search, Trash } from "lucide-react";

const AdminPapers = () => {
  const { papers, volumes, deletePaper } = usePapers();
  const [searchQuery, setSearchQuery] = useState("");
  const [volumeFilter, setVolumeFilter] = useState("all");
  
  // Filter papers based on search query and volume filter
  const filteredPapers = papers.filter(paper => {
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some(author => author.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesVolume = volumeFilter === "all" || paper.volumeId === volumeFilter;
    
    return matchesSearch && matchesVolume;
  });
  
  // Sort papers by publication date (descending)
  const sortedPapers = [...filteredPapers].sort((a, b) => {
    return new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime();
  });
  
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Papers</h1>
          <Link to="/admin/new-paper">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Paper
            </Button>
          </Link>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Search and Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search by title, author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <Select
                value={volumeFilter}
                onValueChange={setVolumeFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Volumes</SelectItem>
                  {volumes.map((volume) => (
                    <SelectItem key={volume.id} value={volume.id}>
                      {volume.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>Authors</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Publication Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPapers.length > 0 ? (
                  sortedPapers.map((paper) => {
                    const volume = volumes.find(v => v.id === paper.volumeId);
                    return (
                      <TableRow key={paper.id}>
                        <TableCell className="font-medium">{paper.title}</TableCell>
                        <TableCell>{paper.authors.map(a => a.name).join(", ")}</TableCell>
                        <TableCell>
                          {volume ? (
                            <Badge variant="outline">
                              {volume.title}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-destructive">
                              Unknown Volume
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(paper.publicationDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/paper/${paper.id}`} target="_blank">
                                  <Eye className="mr-2 h-4 w-4" /> View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/paper/${paper.id}`}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${paper.title}"?`)) {
                                    deletePaper(paper.id);
                                  }
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      {searchQuery || volumeFilter !== "all" 
                        ? "No papers found matching your search or filter criteria." 
                        : "No papers have been added yet."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminPapers;
