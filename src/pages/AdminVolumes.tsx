
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreVertical, Plus, Search, Trash } from "lucide-react";

const AdminVolumes = () => {
  const { volumes, deleteVolume, getPapersByVolume } = usePapers();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter volumes based on search query
  const filteredVolumes = volumes.filter(volume => {
    const query = searchQuery.toLowerCase();
    return (
      volume.title.toLowerCase().includes(query) ||
      volume.description.toLowerCase().includes(query) ||
      volume.year.toString().includes(query)
    );
  });
  
  // Sort volumes by year and month (descending)
  const sortedVolumes = [...filteredVolumes].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
  
  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Volumes</h1>
          <Link to="/admin/new-volume">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Volume
            </Button>
          </Link>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Search Volumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center w-full max-w-sm">
              <Input
                type="text"
                placeholder="Search by title, year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Volume Title</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Papers</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedVolumes.length > 0 ? (
                  sortedVolumes.map((volume) => {
                    const paperCount = getPapersByVolume(volume.id).length;
                    return (
                      <TableRow key={volume.id}>
                        <TableCell className="font-medium">{volume.title}</TableCell>
                        <TableCell>{volume.issueNumber}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {new Date(volume.year, volume.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                          </Badge>
                        </TableCell>
                        <TableCell>{paperCount}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link to={`/admin/volume/${volume.id}`}>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${volume.title}"?`)) {
                                    deleteVolume(volume.id);
                                  }
                                }}
                              >
                                <Trash className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      {searchQuery ? "No volumes found matching your search." : "No volumes have been created yet."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminVolumes;
