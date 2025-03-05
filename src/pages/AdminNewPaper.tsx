
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { usePapers, Paper, Author } from "@/context/PapersContext";
import { toast } from "@/components/ui/use-toast";
import { PlusCircle, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const AdminNewPaper = () => {
  const navigate = useNavigate();
  const { volumes, addPaper } = usePapers();
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: `a${uuidv4()}`,
      name: "",
      affiliation: "",
      bio: "",
      photo: "/placeholder.svg",
    },
  ]);
  const [keywords, setKeywords] = useState<string[]>([""]);
  const [references, setReferences] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    volumeId: volumes.length > 0 ? volumes[0].id : "",
    publicationDate: new Date().toISOString().split("T")[0],
    fullText: "",
    doi: "",
    image: "/placeholder.svg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = {
      ...updatedAuthors[index],
      [field]: value,
    };
    setAuthors(updatedAuthors);
  };

  const addAuthor = () => {
    setAuthors([
      ...authors,
      {
        id: `a${uuidv4()}`,
        name: "",
        affiliation: "",
        bio: "",
        photo: "/placeholder.svg",
      },
    ]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((_, i) => i !== index));
    }
  };

  const handleKeywordChange = (index: number, value: string) => {
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = value;
    setKeywords(updatedKeywords);
  };

  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const removeKeyword = (index: number) => {
    if (keywords.length > 1) {
      setKeywords(keywords.filter((_, i) => i !== index));
    }
  };

  const handleReferenceChange = (index: number, value: string) => {
    const updatedReferences = [...references];
    updatedReferences[index] = value;
    setReferences(updatedReferences);
  };

  const addReference = () => {
    setReferences([...references, ""]);
  };

  const removeReference = (index: number) => {
    if (references.length > 1) {
      setReferences(references.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.volumeId) {
      toast({
        title: "Error",
        description: "Please select a volume",
        variant: "destructive",
      });
      return;
    }
    
    // Filter out empty values
    const filteredAuthors = authors.filter(author => author.name.trim());
    const filteredKeywords = keywords.filter(keyword => keyword.trim());
    const filteredReferences = references.filter(reference => reference.trim());
    
    if (filteredAuthors.length === 0) {
      toast({
        title: "Error",
        description: "At least one author is required",
        variant: "destructive",
      });
      return;
    }
    
    const newPaper: Paper = {
      id: `p${uuidv4()}`,
      ...formData,
      authors: filteredAuthors,
      keywords: filteredKeywords,
      references: filteredReferences,
    };
    
    addPaper(newPaper);
    
    toast({
      title: "Paper Created",
      description: "The new paper has been successfully created",
    });
    
    navigate("/admin/papers");
  };

  return (
    <AdminLayout title="Create New Paper">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Create New Paper</h2>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Paper Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter the title of the paper"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="abstract">Abstract</Label>
                  <Textarea
                    id="abstract"
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                    placeholder="Provide a summary of the paper"
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="volumeId">Volume</Label>
                  {volumes.length > 0 ? (
                    <select
                      id="volumeId"
                      name="volumeId"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.volumeId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a volume</option>
                      {volumes.map((volume) => (
                        <option key={volume.id} value={volume.id}>
                          {volume.title} ({volume.year})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="text-destructive py-2">
                      No volumes available. Please create a volume first.
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="publicationDate">Publication Date</Label>
                  <Input
                    id="publicationDate"
                    name="publicationDate"
                    type="date"
                    value={formData.publicationDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Authors</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addAuthor}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Author
                    </Button>
                  </div>
                  
                  {authors.map((author, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">Author {index + 1}</h4>
                        {authors.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAuthor(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`author-name-${index}`}>Name</Label>
                          <Input
                            id={`author-name-${index}`}
                            value={author.name}
                            onChange={(e) => handleAuthorChange(index, "name", e.target.value)}
                            placeholder="Author's full name"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`author-affiliation-${index}`}>Affiliation</Label>
                          <Input
                            id={`author-affiliation-${index}`}
                            value={author.affiliation}
                            onChange={(e) => handleAuthorChange(index, "affiliation", e.target.value)}
                            placeholder="University or Institution"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`author-bio-${index}`}>Bio</Label>
                          <Textarea
                            id={`author-bio-${index}`}
                            value={author.bio}
                            onChange={(e) => handleAuthorChange(index, "bio", e.target.value)}
                            placeholder="Brief biographical information"
                            rows={2}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Keywords</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addKeyword}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Keyword
                    </Button>
                  </div>
                  
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={keyword}
                        onChange={(e) => handleKeywordChange(index, e.target.value)}
                        placeholder="Enter a keyword"
                        required
                      />
                      {keywords.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeKeyword(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>References</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addReference}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Reference
                    </Button>
                  </div>
                  
                  {references.map((reference, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={reference}
                        onChange={(e) => handleReferenceChange(index, e.target.value)}
                        placeholder="Enter a reference citation"
                        required
                      />
                      {references.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeReference(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="fullText">Full Text (Optional)</Label>
                  <Textarea
                    id="fullText"
                    name="fullText"
                    value={formData.fullText}
                    onChange={handleChange}
                    placeholder="Full text of the paper (can be added later)"
                    rows={6}
                  />
                </div>
                
                <div>
                  <Label htmlFor="doi">DOI (Optional)</Label>
                  <Input
                    id="doi"
                    name="doi"
                    value={formData.doi}
                    onChange={handleChange}
                    placeholder="e.g. 10.1000/xyz123"
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Cover Image URL (Optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="/placeholder.svg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave as default for placeholder image
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/papers")}>
                  Cancel
                </Button>
                <Button type="submit">Create Paper</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminNewPaper;
