
import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePapers } from "@/context/PapersContext";
import { Layers, FileText, Users, PlusCircle } from "lucide-react";

const Admin = () => {
  const { papers, volumes } = usePapers();

  const stats = [
    {
      title: "Total Volumes",
      value: volumes.length,
      icon: Layers,
      color: "bg-blue-500",
      link: "/admin/volumes"
    },
    {
      title: "Total Papers",
      value: papers.length,
      icon: FileText,
      color: "bg-green-500",
      link: "/admin/papers"
    },
    {
      title: "Total Authors",
      value: [...new Set(papers.flatMap(paper => paper.authors.map(author => author.id)))].length,
      icon: Users,
      color: "bg-purple-500",
      link: "/admin/authors"
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className={`text-white rounded-t-lg ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-3">
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/new-volume">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Volume
                </Link>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <Link to="/admin/new-paper">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New Paper
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Recent volumes and papers will appear here.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
