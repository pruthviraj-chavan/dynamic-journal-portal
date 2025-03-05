
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { usePapers } from "@/context/PapersContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Paper = () => {
  const { id } = useParams<{ id: string }>();
  const { papers, volumes } = usePapers();
  
  const paper = papers.find(p => p.id === id);
  const volume = paper ? volumes.find(v => v.id === paper.volumeId) : null;
  
  if (!paper || !volume) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Paper not found</h2>
          <p className="mb-8">The paper you are looking for does not exist or has been removed.</p>
          <Link to="/archives">
            <Button>Back to Archives</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-12"
      >
        <div className="flex justify-between items-center mb-6">
          <Link to={`/volume/${volume.id}`}>
            <Button variant="ghost" size="sm">
              ← Back to Volume
            </Button>
          </Link>
          
          <div className="flex space-x-2">
            <Badge variant="outline">
              {new Date(paper.publicationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Badge>
            {paper.doi && (
              <Badge variant="secondary">DOI: {paper.doi}</Badge>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold mb-6">{paper.title}</h1>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Abstract</h2>
                <div className="bg-card p-6 rounded-lg">
                  <p className="leading-relaxed">{paper.abstract}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {paper.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>
              
              {paper.fullText && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Full Text</h2>
                  <div className="bg-card p-6 rounded-lg">
                    <p className="whitespace-pre-line">{paper.fullText}</p>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">References</h2>
                <div className="bg-card p-6 rounded-lg">
                  <ul className="list-disc pl-5 space-y-2">
                    {paper.references.map((reference, index) => (
                      <li key={index}>{reference}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Authors</h2>
                  <div className="space-y-6">
                    {paper.authors.map((author, index) => (
                      <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg">
                        <Avatar className="h-24 w-24 mb-4">
                          <AvatarImage src={author.photo} alt={author.name} />
                          <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <h3 className="text-lg font-medium">{author.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{author.affiliation}</p>
                        <p className="text-sm">{author.bio}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Publication Info</h2>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Published in</p>
                        <p className="font-medium">{volume.title}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volume</p>
                        <p className="font-medium">{volume.issueNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {new Date(volume.year, volume.month - 1).toLocaleString('default', { month: 'long' })} {volume.year}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Button className="w-full">Download PDF</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Paper;
