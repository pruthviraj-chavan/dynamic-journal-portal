
import { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";

const AdminSettings = () => {
  const [journalSettings, setJournalSettings] = useState({
    title: "Scientific Journal of Research",
    description: "A leading journal publishing cutting-edge research across scientific disciplines.",
    logo: "",
    email: "editor@scientificjournal.com",
    issn: "1234-5678",
    submissionGuide: "Please follow APA style guidelines for all submissions.",
    peerReviewProcess: "All submissions undergo a double-blind peer review process.",
    publishingFee: "$50",
    enableComments: true,
    enableDownloads: true,
    enableMetrics: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJournalSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setJournalSettings(prev => ({ ...prev, [name]: checked }));
  };
  
  const saveSettings = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Settings Saved",
      description: "Journal settings have been updated successfully.",
    });
  };
  
  return (
    <AdminLayout title="Settings">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Journal Settings</h1>
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" /> Save Settings
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Journal Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={journalSettings.title}
                      onChange={handleInputChange}
                      placeholder="Enter journal title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={journalSettings.description}
                      onChange={handleInputChange}
                      placeholder="Enter journal description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={journalSettings.email}
                        onChange={handleInputChange}
                        placeholder="Enter contact email"
                        type="email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="issn">ISSN</Label>
                      <Input
                        id="issn"
                        name="issn"
                        value={journalSettings.issn}
                        onChange={handleInputChange}
                        placeholder="Enter ISSN number"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input
                      id="logo"
                      name="logo"
                      value={journalSettings.logo}
                      onChange={handleInputChange}
                      placeholder="Enter logo URL"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="submissionGuide">Submission Guidelines</Label>
                    <Textarea
                      id="submissionGuide"
                      name="submissionGuide"
                      value={journalSettings.submissionGuide}
                      onChange={handleInputChange}
                      placeholder="Enter submission guidelines"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="peerReviewProcess">Peer Review Process</Label>
                    <Textarea
                      id="peerReviewProcess"
                      name="peerReviewProcess"
                      value={journalSettings.peerReviewProcess}
                      onChange={handleInputChange}
                      placeholder="Describe peer review process"
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="publishingFee">Publishing Fee</Label>
                    <Input
                      id="publishingFee"
                      name="publishingFee"
                      value={journalSettings.publishingFee}
                      onChange={handleInputChange}
                      placeholder="Enter publishing fee"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Feature Toggles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableComments" className="cursor-pointer">
                      Enable Comments
                    </Label>
                    <Switch
                      id="enableComments"
                      checked={journalSettings.enableComments}
                      onCheckedChange={(checked) => handleSwitchChange("enableComments", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableDownloads" className="cursor-pointer">
                      Enable PDF Downloads
                    </Label>
                    <Switch
                      id="enableDownloads"
                      checked={journalSettings.enableDownloads}
                      onCheckedChange={(checked) => handleSwitchChange("enableDownloads", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableMetrics" className="cursor-pointer">
                      Enable Article Metrics
                    </Label>
                    <Switch
                      id="enableMetrics"
                      checked={journalSettings.enableMetrics}
                      onCheckedChange={(checked) => handleSwitchChange("enableMetrics", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">System Version</p>
                    <p className="font-medium">1.0.0</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Last Updated</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Storage Usage</p>
                    <p className="font-medium">42 MB used</p>
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

export default AdminSettings;
