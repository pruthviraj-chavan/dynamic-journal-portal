
import React, { useState } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { usePapers, Author } from "@/context/PapersContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

const AdminAuthors = () => {
  const { papers } = usePapers();
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique authors from all papers
  const uniqueAuthors = papers.reduce((acc: Author[], paper) => {
    paper.authors.forEach((author) => {
      if (!acc.some((a) => a.id === author.id)) {
        acc.push(author);
      }
    });
    return acc;
  }, []);

  // Filter authors based on search term
  const filteredAuthors = uniqueAuthors.filter(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.affiliation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count papers for each author
  const getPaperCount = (authorId: string) => {
    return papers.filter((paper) =>
      paper.authors.some((author) => author.id === authorId)
    ).length;
  };

  return (
    <AdminLayout title="Authors">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">Authors</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search authors..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredAuthors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAuthors.map((author) => (
              <Card key={author.id}>
                <CardHeader>
                  <CardTitle>{author.name}</CardTitle>
                  <CardDescription>{author.affiliation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{author.bio}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    {getPaperCount(author.id)} paper{getPaperCount(author.id) !== 1 ? "s" : ""}
                  </p>
                  <Button variant="outline" size="sm" disabled>View Papers</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No authors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or adding papers with authors</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAuthors;
