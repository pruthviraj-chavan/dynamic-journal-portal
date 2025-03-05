
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePapers, Volume } from "@/context/PapersContext";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const AdminVolume = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { volumes, updateVolume } = usePapers();
  const [formData, setFormData] = useState<Volume | null>(null);

  useEffect(() => {
    if (id) {
      const volume = volumes.find((v) => v.id === id);
      if (volume) {
        setFormData(volume);
      } else {
        toast({
          title: "Volume not found",
          description: "The requested volume could not be found",
          variant: "destructive",
        });
        navigate("/admin/volumes");
      }
    }
  }, [id, volumes, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "issueNumber" || name === "year" || name === "month" 
        ? parseInt(value) 
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData || !id) return;
    
    updateVolume(id, formData);
    
    toast({
      title: "Volume updated",
      description: "The volume has been successfully updated",
    });
    
    navigate("/admin/volumes");
  };

  if (!formData) {
    return (
      <AdminLayout title="Edit Volume">
        <div className="flex justify-center items-center h-64">
          <p>Loading volume data...</p>
        </div>
      </AdminLayout>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <AdminLayout title="Edit Volume">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Volume</h2>
        
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Volume Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Advances in Machine Learning"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="issueNumber">Issue Number</Label>
                    <Input
                      id="issueNumber"
                      name="issueNumber"
                      type="number"
                      min="1"
                      value={formData.issueNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="year">Year</Label>
                    <select
                      id="year"
                      name="year"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="month">Month</Label>
                    <select
                      id="month"
                      name="month"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.month}
                      onChange={handleChange}
                      required
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {new Date(0, month - 1).toLocaleString("default", { month: "long" })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide a brief description of this volume"
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="image">Cover Image URL (Optional)</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image || "/placeholder.svg"}
                    onChange={handleChange}
                    placeholder="/placeholder.svg"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Leave as default for placeholder image
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate("/admin/volumes")}>
                  Cancel
                </Button>
                <Button type="submit">Update Volume</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminVolume;
