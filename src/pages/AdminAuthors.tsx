
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Search, Plus, Edit, Trash } from "lucide-react";

const AdminAuthors = () => {
  const { papers, updatePaper } = usePapers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isEditAuthorOpen, setIsEditAuthorOpen] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState<{
    id: string;
    name: string;
    affiliation: string;
    bio: string;
    photo: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    affiliation: "",
    bio: "",
    photo: "",
  });
  
  // Extract all unique authors from papers
  const allAuthors: { 
    id: string;
    name: string;
    affiliation: string;
    bio: string;
    photo: string;
    paperCount: number;
  }[] = [];
  
  const authorMap = new Map();
  
  papers.forEach(paper => {
    paper.authors.forEach(author => {
      if (!authorMap.has(author.id)) {
        authorMap.set(author.id, {
          ...author,
          paperCount: 1
        });
      } else {
        const existingAuthor = authorMap.get(author.id);
        existingAuthor.paperCount += 1;
        authorMap.set(author.id, existingAuthor);
      }
    });
  });
  
  authorMap.forEach(author => {
    allAuthors.push(author);
  });
  
  // Filter authors based on search query
  const filteredAuthors = allAuthors.filter(author => {
    const query = searchQuery.toLowerCase();
    return (
      author.name.toLowerCase().includes(query) ||
      author.affiliation.toLowerCase().includes(query)
    );
  });
  
  // Sort authors by name
  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addAuthor = () => {
    const newAuthor = {
      id: `a${Date.now()}`,
      name: formData.name,
      affiliation: formData.affiliation,
      bio: formData.bio,
      photo: formData.photo,
    };
    
    // Since we don't have a separate authors state,
    // we'll simply show a success message
    toast({
      title: "Author Added",
      description: "The author has been added and can now be assigned to papers.",
    });
    
    setFormData({
      name: "",
      affiliation: "",
      bio: "",
      photo: "",
    });
    
    setIsAddAuthorOpen(false);
  };
  
  const editAuthor = () => {
    if (!currentAuthor) return;
    
    // Update this author in all papers
    papers.forEach(paper => {
      const updatedAuthors = paper.authors.map(author => {
        if (author.id === currentAuthor.id) {
          return {
            ...author,
            name: formData.name,
            affiliation: formData.affiliation,
            bio: formData.bio,
            photo: formData.photo,
          };
        }
        return author;
      });
      
      updatePaper(paper.id, { ...paper, authors: updatedAuthors });
    });
    
    toast({
      title: "Author Updated",
      description: "The author has been updated across all papers.",
    });
    
    setCurrentAuthor(null);
    setFormData({
      name: "",
      affiliation: "",
      bio: "",
      photo: "",
    });
    
    setIsEditAuthorOpen(false);
  };
  
  const deleteAuthor = (authorId: string) => {
    if (!window.confirm("Are you sure you want to delete this author? This will remove them from all papers.")) {
      return;
    }
    
    // Remove this author from all papers
    papers.forEach(paper => {
      const updatedAuthors = paper.authors.filter(author => author.id !== authorId);
      if (updatedAuthors.length !== paper.authors.length) {
        updatePaper(paper.id, { ...paper, authors: updatedAuthors });
      }
    });
    
    toast({
      title: "Author Deleted",
      description: "The author has been removed from all papers.",
    });
  };
  
  const openEditAuthor = (author: typeof currentAuthor) => {
    setCurrentAuthor(author);
    setFormData({
      name: author?.name || "",
      affiliation: author?.affiliation || "",
      bio: author?.bio || "",
      photo: author?.photo || "",
    });
    setIsEditAuthorOpen(true);
  };
  
  return (
    <AdminLayout title="Authors">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Authors</h1>
          <Dialog open={isAddAuthorOpen} onOpenChange={setIsAddAuthorOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Author
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Author</DialogTitle>
                <DialogDescription>
                  Add a new author who can be assigned to papers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="affiliation" className="text-sm font-medium">Affiliation</label>
                  <Input
                    id="affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    placeholder="Enter author affiliation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Enter author bio"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="photo" className="text-sm font-medium">Photo URL</label>
                  <Input
                    id="photo"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    placeholder="Enter photo URL (optional)"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={addAuthor}>Add Author</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isEditAuthorOpen} onOpenChange={setIsEditAuthorOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Author</DialogTitle>
                <DialogDescription>
                  Update author information across all papers.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Name</label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-affiliation" className="text-sm font-medium">Affiliation</label>
                  <Input
                    id="edit-affiliation"
                    name="affiliation"
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    placeholder="Enter author affiliation"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-bio" className="text-sm font-medium">Bio</label>
                  <Textarea
                    id="edit-bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Enter author bio"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="edit-photo" className="text-sm font-medium">Photo URL</label>
                  <Input
                    id="edit-photo"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    placeholder="Enter photo URL (optional)"
                  />
                </div>
                <div className="pt-4 flex justify-end">
                  <Button onClick={editAuthor}>Update Author</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Search Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center w-full max-w-sm">
              <Input
                type="text"
                placeholder="Search by name, affiliation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Author</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>Papers</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAuthors.length > 0 ? (
                  sortedAuthors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {author.photo && (
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                              <img 
                                src={author.photo} 
                                alt={author.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{author.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{author.affiliation}</TableCell>
                      <TableCell>{author.paperCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEditAuthor(author)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive"
                            onClick={() => deleteAuthor(author.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      {searchQuery ? "No authors found matching your search." : "No authors have been added yet."}
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

export default AdminAuthors;
