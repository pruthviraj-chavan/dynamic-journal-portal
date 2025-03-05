
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Users, Settings, FileText, BookMarked } from "lucide-react";

const Admin = () => {
  const { papers, volumes } = usePapers();
  const uniqueAuthors = new Set();
  
  papers.forEach(paper => {
    paper.authors.forEach(author => {
      uniqueAuthors.add(author.id);
    });
  });
  
  const adminCards = [
    {
      title: "Volumes",
      description: "Manage journal volumes and issues",
      count: volumes.length,
      icon: <BookOpen className="h-5 w-5" />,
      link: "/admin/volumes",
      color: "bg-blue-500"
    },
    {
      title: "Papers",
      description: "Manage research papers",
      count: papers.length,
      icon: <FileText className="h-5 w-5" />,
      link: "/admin/papers",
      color: "bg-green-500"
    },
    {
      title: "Authors",
      description: "Manage paper authors",
      count: uniqueAuthors.size,
      icon: <Users className="h-5 w-5" />,
      link: "/admin/authors",
      color: "bg-purple-500"
    },
    {
      title: "Settings",
      description: "Journal settings and configuration",
      icon: <Settings className="h-5 w-5" />,
      link: "/admin/settings",
      color: "bg-amber-500"
    }
  ];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className={`p-2 rounded-md text-white ${card.color}`}>
                      {card.icon}
                    </div>
                    <Link to={card.link}>
                      <Button variant="ghost" size="icon">
                        <ArrowUpRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-2xl">{card.count !== undefined ? card.count : ""}</CardTitle>
                  <CardDescription className="text-lg font-medium">{card.title}</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookMarked className="mr-2 h-5 w-5" />
                Recent Volumes
              </CardTitle>
            </CardHeader>
            <CardContent>
              {volumes.length > 0 ? (
                <div className="space-y-4">
                  {volumes.slice(0, 5).map((volume) => (
                    <div key={volume.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{volume.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Volume {volume.issueNumber} | {new Date(volume.year, volume.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                        </p>
                      </div>
                      <Link to={`/admin/volume/${volume.id}`}>
                        <Button variant="ghost" size="sm">Manage</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No volumes created yet</p>
              )}
              <div className="mt-4">
                <Link to="/admin/new-volume">
                  <Button className="w-full">Create New Volume</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Papers
              </CardTitle>
            </CardHeader>
            <CardContent>
              {papers.length > 0 ? (
                <div className="space-y-4">
                  {papers.slice(0, 5).map((paper) => (
                    <div key={paper.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{paper.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {paper.authors.map(a => a.name).join(", ")}
                        </p>
                      </div>
                      <Link to={`/admin/paper/${paper.id}`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No papers published yet</p>
              )}
              <div className="mt-4">
                <Link to="/admin/new-paper">
                  <Button className="w-full">Add New Paper</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default Admin;
