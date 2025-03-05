
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
import { ArrowLeft, Save } from "lucide-react";

const AdminNewVolume = () => {
  const navigate = useNavigate();
  const { addVolume, volumes } = usePapers();
  
  const [formData, setFormData] = useState({
    title: "",
    issueNumber: volumes.length + 1,
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: parseInt(value) }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newVolume = {
      id: `v${Date.now()}`,
      title: formData.title,
      issueNumber: formData.issueNumber,
      year: formData.year,
      month: formData.month,
      description: formData.description,
      image: formData.image || undefined,
    };
    
    addVolume(newVolume);
    
    toast({
      title: "Volume Created",
      description: "The new volume has been successfully created.",
    });
    
    navigate("/admin/volumes");
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
            <h1 className="text-3xl font-bold">Create New Volume</h1>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Create Volume
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Volume Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
            <Card>
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
                  <h3 className="text-lg font-semibold">{formData.title || "Volume Title"}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Volume {formData.issueNumber} | {months.find(m => m.value === formData.month)?.label} {formData.year}
                  </p>
                  <p className="text-sm mt-2">{formData.description || "Volume description will appear here."}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminNewVolume;
