
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePapers } from "@/context/PapersContext";
import VolumeCard from "@/components/VolumeCard";
import { useState } from "react";

const Archives = () => {
  const { volumes, getPapersByVolume } = usePapers();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const years = [...new Set(volumes.map(volume => volume.year))].sort((a, b) => b - a);
  
  // Get filtered volumes based on selected year
  const filteredVolumes = selectedYear 
    ? volumes.filter(volume => volume.year === selectedYear)
    : volumes;

  // Sort volumes by year and month (descending)
  const sortedVolumes = [...filteredVolumes].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Research Archives</h1>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-center">
            Browse our complete collection of research volumes organized by publication date.
          </p>
          
          {/* Year filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            <Button 
              variant={selectedYear === null ? "default" : "outline"}
              onClick={() => setSelectedYear(null)}
            >
              All Years
            </Button>
            {years.map(year => (
              <Button 
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>

          {sortedVolumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedVolumes.map((volume) => (
                <motion.div
                  key={volume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/volume/${volume.id}`}>
                    <VolumeCard 
                      volume={volume} 
                      paperCount={getPapersByVolume(volume.id).length}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-4">No volumes found for the selected filters</h3>
              <Button onClick={() => setSelectedYear(null)}>Show All Volumes</Button>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Archives;
