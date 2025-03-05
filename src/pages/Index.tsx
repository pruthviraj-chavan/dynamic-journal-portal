
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { usePapers } from "@/context/PapersContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, TrendingUp, Clock, Award } from "lucide-react";
import PaperCard from "@/components/PaperCard";
import SearchBox from "@/components/SearchBox";
import { motion } from "framer-motion";

export default function Index() {
  const { papers, volumes } = usePapers();
  const [featuredPaper, setFeaturedPaper] = useState(papers[0]);

  // Sort papers by date for recent papers
  const recentPapers = [...papers].sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );

  // Assume trending papers could be a curated list or based on some metrics
  // Here we'll just use a sample selection
  const trendingPapers = [...papers].sort(() => 0.5 - Math.random());

  // Get the latest volume
  const latestVolume = [...volumes].sort(
    (a, b) => b.year * 100 + b.month - (a.year * 100 + a.month)
  )[0];

  useEffect(() => {
    // Set a random featured paper each time
    if (papers.length > 0) {
      const randomIndex = Math.floor(Math.random() * papers.length);
      setFeaturedPaper(papers[randomIndex]);
    }
  }, [papers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-card min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div 
              className="text-center md:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/30 text-primary text-sm font-medium">
                Latest Issue: Volume {latestVolume?.issueNumber}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
                Research Journal
                <span className="block mt-2 text-primary">Modern Science & Technology</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto md:mx-0">
                A premier platform for academic excellence, featuring peer-reviewed research across multiple disciplines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="relative overflow-hidden group">
                  <Link to="/submit">
                    <span className="relative z-10">Submit Your Paper</span>
                    <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/archives">Browse Archives</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Research Journal" 
                  className="w-full h-auto rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <SearchBox />
        </div>
      </section>

      {/* Featured Paper */}
      {featuredPaper && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="section-title">
                  <span className="badge mb-2 block w-fit">Featured Paper</span>
                  Highlighted Research
                </h2>
                <Button variant="ghost" asChild>
                  <Link to={`/paper/${featuredPaper.id}`} className="group">
                    View Paper
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
              
              <PaperCard paper={featuredPaper} featured={true} />
            </div>
          </div>
        </section>
      )}
      
      {/* Recent and Trending Papers */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="recent" className="w-full max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">
                Explore Papers
              </h2>
              <TabsList className="grid grid-cols-2 w-[400px]">
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Recent</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="recent">
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {recentPapers.slice(0, 6).map((paper) => (
                  <motion.div key={paper.id} variants={itemVariants}>
                    <PaperCard paper={paper} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="trending">
              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {trendingPapers.slice(0, 6).map((paper) => (
                  <motion.div key={paper.id} variants={itemVariants}>
                    <PaperCard paper={paper} />
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <div className="mt-10 text-center">
              <Button asChild>
                <Link to="/archives" className="group">
                  View All Papers
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Editorial Board Preview */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="section-title mb-4">Meet Our Editorial Team</h2>
            <p className="text-lg text-muted-foreground">
              Our distinguished board of editors ensures the highest standards of research quality and academic integrity.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Dr. Jane Smith", role: "Editor in Chief", photo: "/placeholder.svg" },
              { name: "Prof. John Davis", role: "Associate Editor", photo: "/placeholder.svg" },
              { name: "Dr. Sarah Johnson", role: "Review Editor", photo: "/placeholder.svg" },
              { name: "Prof. Michael Lee", role: "Technical Editor", photo: "/placeholder.svg" },
            ].map((editor, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-background">
                  <AvatarImage src={editor.photo} alt={editor.name} />
                  <AvatarFallback>{editor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{editor.name}</h3>
                <p className="text-sm text-muted-foreground">{editor.role}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" asChild>
              <Link to="/editorial" className="group">
                View Full Editorial Board
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="h-5 w-5 mr-2" />
              <span>Peer-Reviewed Excellence</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Ready to Contribute to the Scientific Community?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Share your research findings with a global audience of academics, researchers, and industry professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="relative overflow-hidden group">
                <Link to="/submit">
                  <span className="relative z-10">Submit Your Research</span>
                  <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">Learn About Our Journal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
