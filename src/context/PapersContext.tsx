
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Author {
  id: string;
  name: string;
  affiliation: string;
  bio: string;
  photo: string;
}

export interface Paper {
  id: string;
  title: string;
  abstract: string;
  authors: Author[];
  keywords: string[];
  publicationDate: string;
  volumeId: string;
  references: string[];
  fullText?: string;
  doi?: string;
  image?: string;
}

export interface Volume {
  id: string;
  title: string;
  issueNumber: number;
  year: number;
  month: number;
  description: string;
  image?: string;
}

interface PapersContextType {
  papers: Paper[];
  volumes: Volume[];
  addPaper: (paper: Paper) => void;
  updatePaper: (id: string, paper: Partial<Paper>) => void;
  deletePaper: (id: string) => void;
  addVolume: (volume: Volume) => void;
  updateVolume: (id: string, volume: Partial<Volume>) => void;
  deleteVolume: (id: string) => void;
  getPapersByVolume: (volumeId: string) => Paper[];
  searchPapers: (query: string) => Paper[];
}

// Sample data
const sampleVolumes: Volume[] = [
  {
    id: "v1",
    title: "Advances in Quantum Computing",
    issueNumber: 1,
    year: 2023,
    month: 10,
    description: "This volume explores recent advancements in quantum computing algorithms and hardware implementations."
  },
  {
    id: "v2",
    title: "Artificial Intelligence Applications",
    issueNumber: 2,
    year: 2023,
    month: 11,
    description: "A collection of papers on practical applications of AI in healthcare, finance, and education."
  },
  {
    id: "v3",
    title: "Sustainable Energy Technologies",
    issueNumber: 3,
    year: 2023,
    month: 12,
    description: "Research on renewable energy sources and sustainable technology implementations."
  },
];

const sampleAuthors: Author[] = [
  {
    id: "a1",
    name: "Dr. Jane Smith",
    affiliation: "MIT",
    bio: "Quantum computing researcher with focus on error correction.",
    photo: "/placeholder.svg"
  },
  {
    id: "a2",
    name: "Prof. John Davis",
    affiliation: "Stanford University",
    bio: "AI ethics and implementation specialist.",
    photo: "/placeholder.svg"
  },
  {
    id: "a3",
    name: "Dr. Sarah Johnson",
    affiliation: "Oxford University",
    bio: "Specialist in renewable energy systems and grid optimization.",
    photo: "/placeholder.svg"
  },
];

const samplePapers: Paper[] = [
  {
    id: "p1",
    title: "Quantum Error Correction in NISQ Devices",
    abstract: "This paper presents a novel approach to quantum error correction suitable for Noisy Intermediate-Scale Quantum (NISQ) devices that requires fewer physical qubits than traditional methods.",
    authors: [sampleAuthors[0]],
    keywords: ["quantum computing", "error correction", "NISQ"],
    publicationDate: "2023-10-15",
    volumeId: "v1",
    references: ["Nielsen, M. A., & Chuang, I. L. (2010). Quantum Computation and Quantum Information."],
    image: "/placeholder.svg"
  },
  {
    id: "p2",
    title: "Ethical Considerations in Healthcare AI Implementation",
    abstract: "We examine the ethical challenges that arise when implementing AI systems in healthcare settings, proposing a framework for responsible deployment.",
    authors: [sampleAuthors[1]],
    keywords: ["artificial intelligence", "healthcare", "ethics"],
    publicationDate: "2023-11-10",
    volumeId: "v2",
    references: ["Beauchamp, T. L., & Childress, J. F. (2001). Principles of Biomedical Ethics."],
    image: "/placeholder.svg"
  },
  {
    id: "p3",
    title: "Grid-Scale Energy Storage Technologies: A Comparative Analysis",
    abstract: "This paper compares various grid-scale energy storage technologies, evaluating their efficiency, cost, and environmental impact in different deployment scenarios.",
    authors: [sampleAuthors[2]],
    keywords: ["energy storage", "renewable energy", "grid optimization"],
    publicationDate: "2023-12-05",
    volumeId: "v3",
    references: ["Ibrahim, H., Ilinca, A., & Perron, J. (2008). Energy storage systems—Characteristics and comparisons."],
    image: "/placeholder.svg"
  },
];

const PapersContext = createContext<PapersContextType | undefined>(undefined);

export function PapersProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>(() => {
    if (typeof window !== "undefined") {
      const savedPapers = localStorage.getItem("papers");
      return savedPapers ? JSON.parse(savedPapers) : samplePapers;
    }
    return samplePapers;
  });

  const [volumes, setVolumes] = useState<Volume[]>(() => {
    if (typeof window !== "undefined") {
      const savedVolumes = localStorage.getItem("volumes");
      return savedVolumes ? JSON.parse(savedVolumes) : sampleVolumes;
    }
    return sampleVolumes;
  });

  useEffect(() => {
    localStorage.setItem("papers", JSON.stringify(papers));
  }, [papers]);

  useEffect(() => {
    localStorage.setItem("volumes", JSON.stringify(volumes));
  }, [volumes]);

  const addPaper = (paper: Paper) => {
    setPapers([...papers, paper]);
  };

  const updatePaper = (id: string, updatedFields: Partial<Paper>) => {
    setPapers(
      papers.map((paper) =>
        paper.id === id ? { ...paper, ...updatedFields } : paper
      )
    );
  };

  const deletePaper = (id: string) => {
    setPapers(papers.filter((paper) => paper.id !== id));
  };

  const addVolume = (volume: Volume) => {
    setVolumes([...volumes, volume]);
  };

  const updateVolume = (id: string, updatedFields: Partial<Volume>) => {
    setVolumes(
      volumes.map((volume) =>
        volume.id === id ? { ...volume, ...updatedFields } : volume
      )
    );
  };

  const deleteVolume = (id: string) => {
    // Delete associated papers first
    setPapers(papers.filter((paper) => paper.volumeId !== id));
    // Then delete the volume
    setVolumes(volumes.filter((volume) => volume.id !== id));
  };

  const getPapersByVolume = (volumeId: string) => {
    return papers.filter((paper) => paper.volumeId === volumeId);
  };

  const searchPapers = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return papers.filter(
      (paper) =>
        paper.title.toLowerCase().includes(lowercaseQuery) ||
        paper.abstract.toLowerCase().includes(lowercaseQuery) ||
        paper.authors.some((author) =>
          author.name.toLowerCase().includes(lowercaseQuery)
        ) ||
        paper.keywords.some((keyword) =>
          keyword.toLowerCase().includes(lowercaseQuery)
        )
    );
  };

  return (
    <PapersContext.Provider
      value={{
        papers,
        volumes,
        addPaper,
        updatePaper,
        deletePaper,
        addVolume,
        updateVolume,
        deleteVolume,
        getPapersByVolume,
        searchPapers,
      }}
    >
      {children}
    </PapersContext.Provider>
  );
}

export function usePapers() {
  const context = useContext(PapersContext);
  if (context === undefined) {
    throw new Error("usePapers must be used within a PapersProvider");
  }
  return context;
}
