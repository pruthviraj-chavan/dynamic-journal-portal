
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const Submit = () => {
  const [activeTab, setActiveTab] = useState("guidelines");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Submission Received",
      description: "Your paper has been submitted for review. You will receive a confirmation email shortly.",
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Submit Your Research</h1>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-center">
            We welcome original research papers in all areas of science and technology. 
            Please review our submission guidelines before proceeding.
          </p>

          <Tabs defaultValue="guidelines" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guidelines" onClick={() => setActiveTab("guidelines")}>Guidelines</TabsTrigger>
              <TabsTrigger value="charges" onClick={() => setActiveTab("charges")}>Processing Charges</TabsTrigger>
              <TabsTrigger value="submission" onClick={() => setActiveTab("submission")}>Submit</TabsTrigger>
            </TabsList>
            
            <TabsContent value="guidelines" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Guidelines</CardTitle>
                  <CardDescription>Please follow these guidelines carefully to ensure your paper is considered for review.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Paper Format</h3>
                    <p>All papers must be submitted in PDF format and adhere to our template guidelines. The maximum paper length is 10 pages including references.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Original Content</h3>
                    <p>Submissions must contain original work that has not been published elsewhere or is currently under review at another journal or conference.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ethical Standards</h3>
                    <p>Authors must adhere to ethical standards in research and publication, including proper attribution of sources and disclosure of conflicts of interest.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Author Information</h3>
                    <p>All authors must be listed with their full affiliations. The corresponding author will be responsible for communication with the editorial team.</p>
                  </div>
                  
                  <div className="bg-muted p-4 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Templates</h3>
                    <p className="mb-4">Please use one of the following templates for your submission:</p>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <Button variant="outline">LaTeX Template</Button>
                      <Button variant="outline">Word Template</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="charges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Charges</CardTitle>
                  <CardDescription>Our fee structure for paper submission and publication.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card p-6 rounded-lg border">
                      <h3 className="text-xl font-semibold mb-4">Standard Publication</h3>
                      <p className="text-3xl font-bold mb-4">$295</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Peer review process
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Online publication
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          DOI assignment
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-primary/5 p-6 rounded-lg border border-primary">
                      <h3 className="text-xl font-semibold mb-4">Open Access Publication</h3>
                      <p className="text-3xl font-bold mb-4">$495</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          All standard features
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Unrestricted public access
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Enhanced digital features
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Inclusion in premium indexes
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Fee Waivers</h3>
                    <p>Fee waivers are available for researchers from low-income countries and for exceptional research with significant impact potential. To apply for a waiver, please contact our editorial office.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="submission" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Paper</CardTitle>
                  <CardDescription>Please provide all required information about your submission.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Paper Title</Label>
                        <Input id="title" placeholder="Enter the full title of your paper" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="abstract">Abstract</Label>
                        <Textarea id="abstract" placeholder="Provide a concise summary of your research (250-300 words)" className="min-h-[120px]" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="keywords">Keywords</Label>
                        <Input id="keywords" placeholder="Enter 3-5 keywords separated by commas" required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="authors">Authors</Label>
                          <Input id="authors" placeholder="List all authors (First Name, Last Name)" required />
                        </div>
                        
                        <div>
                          <Label htmlFor="corresponding">Corresponding Author Email</Label>
                          <Input id="corresponding" type="email" placeholder="Email address" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="file">Upload Paper (PDF)</Label>
                        <Input id="file" type="file" accept=".pdf" className="mt-1" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="comments">Additional Comments</Label>
                        <Textarea id="comments" placeholder="Any special considerations or notes for the editors" className="min-h-[80px]" />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="agreement" className="rounded" required />
                      <Label htmlFor="agreement" className="text-sm">
                        I confirm that this submission is original work and not under consideration elsewhere.
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full">Submit Paper</Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Submit;
