
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Save, XCircle } from "lucide-react";

const AdminNewPaper = () => {
  const navigate = useNavigate();
  const { addPaper, volumes } = usePapers();
  
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    authors: [] as { id: string; name: string; affiliation: string; bio: string; photo: string }[],
    keywords: [] as string[],
    publicationDate: new Date().toISOString().split('T')[0],
    volumeId: "",
    references: [] as string[],
    doi: "",
    image: "",
  });
  
  const [newKeyword, setNewKeyword] = useState("");
  const [newReference, setNewReference] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const addKeyword = () => {
    if (newKeyword.trim() && !formData.keywords.includes(newKeyword.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()]
      }));
      setNewKeyword("");
    }
  };
  
  const removeKeyword = (keyword: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };
  
  const addReference = () => {
    if (newReference.trim() && !formData.references.includes(newReference.trim())) {
      setFormData(prev => ({
        ...prev,
        references: [...prev.references, newReference.trim()]
      }));
      setNewReference("");
    }
  };
  
  const removeReference = (reference: string) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.filter(r => r !== reference)
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.abstract || !formData.volumeId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    const newPaper = {
      id: `p${Date.now()}`,
      title: formData.title,
      abstract: formData.abstract,
      authors: formData.authors,
      keywords: formData.keywords,
      publicationDate: formData.publicationDate,
      volumeId: formData.volumeId,
      references: formData.references,
      doi: formData.doi || undefined,
      image: formData.image || undefined,
    };
    
    addPaper(newPaper);
    
    toast({
      title: "Paper Created",
      description: "The new paper has been successfully created.",
    });
    
    navigate("/admin/papers");
  };
  
  return (
    <AdminLayout title="Create New Paper">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link to="/admin/papers">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Create New Paper</h1>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Create Paper
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Paper Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Paper Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter paper title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="abstract">Abstract</Label>
                    <Textarea
                      id="abstract"
                      name="abstract"
                      value={formData.abstract}
                      onChange={handleInputChange}
                      placeholder="Enter paper abstract"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="volumeId">Volume</Label>
                      <Select
                        value={formData.volumeId}
                        onValueChange={(value) => handleSelectChange("volumeId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          {volumes.map((volume) => (
                            <SelectItem key={volume.id} value={volume.id}>
                              {volume.title} (Volume {volume.issueNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="publicationDate">Publication Date</Label>
                      <Input
                        id="publicationDate"
                        name="publicationDate"
                        type="date"
                        value={formData.publicationDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="doi">DOI (Optional)</Label>
                    <Input
                      id="doi"
                      name="doi"
                      value={formData.doi}
                      onChange={handleInputChange}
                      placeholder="e.g., 10.1234/journal.paper.2023"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Cover Image URL (Optional)</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL for paper cover"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Add a keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addKeyword();
                      }
                    }}
                  />
                  <Button onClick={addKeyword}>Add</Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full">
                      <span className="mr-1">{keyword}</span>
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input
                    placeholder="Add a reference"
                    value={newReference}
                    onChange={(e) => setNewReference(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addReference();
                      }
                    }}
                  />
                  <Button onClick={addReference}>Add</Button>
                </div>
                
                <div className="space-y-2 mt-4">
                  {formData.references.map((reference, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <span className="mr-2">{reference}</span>
                      <button
                        type="button"
                        onClick={() => removeReference(reference)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Authors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    To manage authors, go to the Authors section in admin.
                  </p>
                  <Link to="/admin/authors">
                    <Button variant="outline" size="sm">Manage Authors</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publication Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.volumeId && (
                    <div>
                      <p className="text-sm text-muted-foreground">Volume</p>
                      <p className="font-medium">
                        {volumes.find(v => v.id === formData.volumeId)?.title || "No volume selected"}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Publication Date</p>
                    <p className="font-medium">
                      {formData.publicationDate 
                        ? new Date(formData.publicationDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "Not set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminNewPaper;
