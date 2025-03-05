
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

const AdminVolumes = () => {
  const { volumes, getPapersByVolume, deleteVolume } = usePapers();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredVolumes = volumes.filter(
    (volume) =>
      volume.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volume.year.toString().includes(searchTerm)
  );

  const handleDelete = (id: string) => {
    deleteVolume(id);
    setDeleteId(null);
    toast({
      title: "Volume deleted",
      description: "The volume has been successfully deleted",
    });
  };

  return (
    <AdminLayout title="Manage Volumes">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold">Volumes</h2>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search volumes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button asChild>
              <Link to="/admin/new-volume">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Volume
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Papers</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVolumes.length > 0 ? (
                filteredVolumes.map((volume) => {
                  const paperCount = getPapersByVolume(volume.id).length;
                  return (
                    <TableRow key={volume.id}>
                      <TableCell className="font-medium">
                        {volume.title}
                      </TableCell>
                      <TableCell>{volume.issueNumber}</TableCell>
                      <TableCell>{volume.year}</TableCell>
                      <TableCell>
                        {new Date(0, volume.month - 1).toLocaleString(
                          "default",
                          { month: "long" }
                        )}
                      </TableCell>
                      <TableCell>{paperCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            asChild
                          >
                            <Link to={`/admin/volume/${volume.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteId(volume.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    No volumes found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will delete the volume and all associated papers. This action cannot be undone.
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

export default AdminVolumes;
