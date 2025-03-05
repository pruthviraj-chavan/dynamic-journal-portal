
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const AdminSettings = () => {
  const [journalName, setJournalName] = useState("Research Journal");
  const [journalDescription, setJournalDescription] = useState("A journal of scientific research.");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkModeDefault, setDarkModeDefault] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance settings saved",
      description: "Your appearance settings have been updated",
    });
  };

  const handleExportData = () => {
    // In a real app, this would generate a proper JSON export
    const data = localStorage.getItem("papers") || "[]";
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "journal_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your journal data has been exported successfully",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Data cleared",
      description: "Demo functionality only - data would be cleared in a real app",
    });
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="data">Data Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your journal information and basic settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="journalName">Journal Name</Label>
                  <Input
                    id="journalName"
                    value={journalName}
                    onChange={(e) => setJournalName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="journalDescription">Journal Description</Label>
                  <Textarea
                    id="journalDescription"
                    value={journalDescription}
                    onChange={(e) => setJournalDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="maintenance" className="flex-1">Maintenance Mode</Label>
                  <Switch
                    id="maintenance"
                    checked={maintenance}
                    onCheckedChange={setMaintenance}
                  />
                </div>
                
                <Button onClick={handleSaveGeneral}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="emailNotifications" className="flex-1">
                    Email Notifications
                  </Label>
                  <Switch
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emailAddress">Email Address</Label>
                  <Input
                    id="emailAddress"
                    type="email"
                    placeholder="admin@example.com"
                    disabled={!emailNotifications}
                  />
                </div>
                
                <Button onClick={handleSaveNotifications} disabled={!emailNotifications}>
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the journal appears to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="darkMode" className="flex-1">
                    Dark Mode as Default
                  </Label>
                  <Switch
                    id="darkMode"
                    checked={darkModeDefault}
                    onCheckedChange={setDarkModeDefault}
                  />
                </div>
                
                <Button onClick={handleSaveAppearance}>
                  Save Appearance Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Export or clear your journal data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Export Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Download a JSON file containing all your journal data
                  </p>
                  <Button onClick={handleExportData}>
                    Export All Data
                  </Button>
                </div>
                
                <div className="space-y-2 pt-4 border-t">
                  <h3 className="text-lg font-medium">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">
                    Warning: These actions cannot be undone
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleClearData}
                  >
                    Clear All Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
