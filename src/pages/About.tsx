
import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { 
  Award, 
  FileCheck, 
  BookOpen, 
  Globe, 
  Users, 
  TrendingUp, 
  Check,
  Calendar,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const statItems = [
    { icon: FileText, value: "600+", label: "Published Papers" },
    { icon: Users, value: "2,500+", label: "Authors" },
    { icon: Globe, value: "150+", label: "Countries" },
    { icon: TrendingUp, value: "3M+", label: "Annual Citations" },
  ];

  const valueItems = [
    { 
      title: "Academic Excellence", 
      description: "We uphold the highest standards of research quality and scientific rigor.",
      icon: Award
    },
    { 
      title: "Peer Review Integrity", 
      description: "Our double-blind peer review process ensures fair and unbiased evaluation.",
      icon: FileCheck
    },
    { 
      title: "Global Reach", 
      description: "We connect researchers worldwide, fostering international collaboration.",
      icon: Globe
    },
    { 
      title: "Interdisciplinary Approach", 
      description: "We promote cross-disciplinary research to tackle complex global challenges.",
      icon: BookOpen
    },
  ];

  const timelineItems = [
    { year: 1995, event: "Journal founded by Dr. James Anderson" },
    { year: 2005, event: "Expanded to include digital publications" },
    { year: 2010, event: "Achieved highest impact factor in field" },
    { year: 2015, event: "Launched global research initiative" },
    { year: 2020, event: "Celebrated 25th anniversary with special edition" },
    { year: 2023, event: "Introduced enhanced digital platform" },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-card py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight">
              About Our Journal
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Dedicated to advancing scientific knowledge through rigorous research and scholarly discourse since 1995.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="/placeholder.svg" 
                  alt="Our mission" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 mb-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                Advancing Knowledge Through Rigorous Research
              </h2>
              <p className="text-lg text-muted-foreground">
                Research Journal is dedicated to the dissemination of high-quality research across various scientific disciplines. We aim to provide a platform for researchers to share groundbreaking work that advances our understanding of the world and addresses critical challenges facing humanity.
              </p>
              <p className="text-lg text-muted-foreground">
                Our journal maintains rigorous peer-review standards while embracing innovation in both research methodologies and publishing practices. We are committed to fostering an inclusive scholarly community that values diversity of thought and perspective.
              </p>
              <div className="pt-4">
                <Button asChild>
                  <Link to="/editorial">Meet Our Editorial Team</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statItems.map((item, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold mb-2">{item.value}</h3>
                <p className="text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles guide our editorial decisions and publishing practices.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueItems.map((item, index) => (
              <motion.div 
                key={index}
                className="content-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{item.title}</h3>
                <p className="text-muted-foreground text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Historical Timeline
            </h2>
            <p className="text-lg text-muted-foreground">
              Tracing our evolution from founding to the present day.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border -translate-x-1/2"></div>
            
            {/* Timeline Items */}
            {timelineItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-end' : ''}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-lg font-medium">{item.event}</p>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Peer Review Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">
              Our Peer Review Process
            </h2>
            <p className="text-lg text-muted-foreground">
              We maintain a rigorous double-blind peer review system to ensure quality and fairness.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Initial Screening",
                  description: "Submissions are first reviewed by our editorial team for scope and basic quality standards."
                },
                {
                  step: "2",
                  title: "Peer Review",
                  description: "Selected papers undergo double-blind review by at least two subject matter experts."
                },
                {
                  step: "3",
                  title: "Editorial Decision",
                  description: "Based on reviews, editors decide to accept, request revisions, or decline."
                },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="content-card relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Button asChild size="lg">
                <Link to="/submit">Submit Your Research</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publication Details */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold tracking-tight">
                Publication Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Publication Frequency</h3>
                    <p className="text-muted-foreground">Monthly issues with special editions quarterly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Impact Factor</h3>
                    <p className="text-muted-foreground">5.8 (2023) - among the highest in our field</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Publication Format</h3>
                    <p className="text-muted-foreground">Digital open access with print subscriptions available</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Indexing</h3>
                    <p className="text-muted-foreground">Included in all major academic databases and citation indices</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-display font-bold tracking-tight">
                Upcoming Deadlines
              </h2>
              <div className="space-y-4">
                {[
                  { date: "June 15, 2023", event: "Deadline for July 2023 Issue" },
                  { date: "August 1, 2023", event: "Special Edition on Quantum Computing" },
                  { date: "September 30, 2023", event: "Annual Research Symposium Submissions" },
                  { date: "November 15, 2023", event: "Deadline for December 2023 Issue" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium">{item.date}</h3>
                      <p className="text-muted-foreground">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
