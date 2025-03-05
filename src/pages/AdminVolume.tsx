
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Edit, MoreVertical, Plus, Save, Trash } from "lucide-react";

const AdminVolume = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { volumes, updateVolume, papers, getPapersByVolume } = usePapers();
  
  const volume = volumes.find(v => v.id === id);
  const volumePapers = getPapersByVolume(id || "");
  
  const [formData, setFormData] = useState({
    title: "",
    issueNumber: 1,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    description: "",
    image: "",
  });
  
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  
  useEffect(() => {
    if (volume) {
      setFormData({
        title: volume.title,
        issueNumber: volume.issueNumber,
        year: volume.year,
        month: volume.month,
        description: volume.description,
        image: volume.image || "",
      });
    }
  }, [volume]);
  
  if (!volume) {
    return (
      <AdminLayout>
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Volume not found</h2>
          <p className="mb-8">The volume you are looking for does not exist or has been removed.</p>
          <Link to="/admin/volumes">
            <Button>Back to Volumes</Button>
          </Link>
        </div>
      </AdminLayout>
    );
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateVolume(id!, {
      title: formData.title,
      issueNumber: formData.issueNumber,
      year: formData.year,
      month: formData.month,
      description: formData.description,
      image: formData.image,
    });
    
    toast({
      title: "Volume Updated",
      description: "The volume has been successfully updated.",
    });
  };
  
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link to="/admin/volumes">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Edit Volume</h1>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Volume Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Volume Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter volume title"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="issueNumber">Issue Number</Label>
                      <Input
                        id="issueNumber"
                        name="issueNumber"
                        type="number"
                        min="1"
                        value={formData.issueNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Month</Label>
                      <Select
                        value={formData.month.toString()}
                        onValueChange={(value) => handleSelectChange("month", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value.toString()}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        name="year"
                        type="number"
                        min="1900"
                        max="2100"
                        value={formData.year}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter volume description"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Enter image URL (optional)"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Volume Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-4">
                  {formData.image && (
                    <div className="aspect-[3/2] bg-muted rounded-md overflow-hidden mb-4">
                      <img 
                        src={formData.image} 
                        alt={formData.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold">{formData.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Volume {formData.issueNumber} | {months.find(m => m.value === formData.month)?.label} {formData.year}
                  </p>
                  <p className="text-sm mt-2">{formData.description}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Volume Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Papers in volume</p>
                    <p className="text-2xl font-semibold">{volumePapers.length}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Publication Date</p>
                    <p className="font-medium">
                      {months.find(m => m.value === volume.month)?.label} {volume.year}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card className="mt-6">
          <CardHeader className="flex-row justify-between items-center">
            <CardTitle>Papers in this Volume</CardTitle>
            <Link to="/admin/new-paper">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" /> Add Paper
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paper Title</TableHead>
                  <TableHead>Authors</TableHead>
                  <TableHead>Publication Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {volumePapers.length > 0 ? (
                  volumePapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">{paper.title}</TableCell>
                      <TableCell>{paper.authors.map(a => a.name).join(", ")}</TableCell>
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
                              <Link to={`/admin/paper/${paper.id}`}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      No papers in this volume yet.
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

export default AdminVolume;
