
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePapers } from "@/context/PapersContext";
import { PlusCircle, Search, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const AdminPapers = () => {
  const { papers, volumes, deletePaper } = usePapers();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.some((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDelete = (id: string) => {
    deletePaper(id);
    setDeleteId(null);
    toast({
      title: "Paper deleted",
      description: "The paper has been successfully deleted",
    });
  };

  const getVolumeName = (volumeId: string) => {
    const volume = volumes.find((v) => v.id === volumeId);
    return volume ? `${volume.title} (${volume.year})` : "Unknown";
  };

  return (
    <AdminLayout title="Manage Papers">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">Papers</h2>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search papers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/admin/new-paper">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Paper
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Authors</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Publication Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPapers.length > 0 ? (
                  filteredPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="max-w-[300px] truncate font-medium">
                        {paper.title}
                      </TableCell>
                      <TableCell>
                        {paper.authors
                          .map((author) => author.name)
                          .join(", ")}
                      </TableCell>
                      <TableCell>{getVolumeName(paper.volumeId)}</TableCell>
                      <TableCell>
                        {new Date(paper.publicationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link to={`/admin/paper/${paper.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteId(paper.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No papers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the paper permanently. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminPapers;
