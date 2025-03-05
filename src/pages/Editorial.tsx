
import MainLayout from "@/layouts/MainLayout";
import { motion } from "framer-motion";

const Editorial = () => {
  const editors = [
    {
      name: "Dr. Elizabeth Chen",
      title: "Editor-in-Chief",
      specialty: "Quantum Computing",
      affiliation: "Harvard University",
      bio: "Dr. Chen has over 20 years of experience in quantum computing research and has published more than 100 papers in top journals.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. Marcus Reynolds",
      title: "Managing Editor",
      specialty: "Artificial Intelligence",
      affiliation: "Stanford University",
      bio: "Prof. Reynolds focuses on ethical applications of AI in healthcare and has led numerous research initiatives in the field.",
      image: "/placeholder.svg"
    },
    {
      name: "Dr. Sophia Patel",
      title: "Senior Editor",
      specialty: "Renewable Energy",
      affiliation: "MIT",
      bio: "Dr. Patel specializes in sustainable energy solutions and grid optimization technologies.",
      image: "/placeholder.svg"
    },
    {
      name: "Prof. James Wilson",
      title: "Review Editor",
      specialty: "Data Science",
      affiliation: "Berkeley",
      bio: "Prof. Wilson has pioneered several techniques in big data analysis and predictive modeling.",
      image: "/placeholder.svg"
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Editorial Board</h1>
          <p className="text-lg mb-12 max-w-3xl mx-auto text-center">
            Our editorial board consists of leading researchers and academics who ensure the highest standards of peer review and academic integrity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {editors.map((editor, index) => (
              <motion.div 
                key={index}
                className="bg-card rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-square bg-muted">
                  <img 
                    src={editor.image} 
                    alt={editor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{editor.name}</h3>
                  <p className="text-primary font-medium mb-2">{editor.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {editor.specialty} | {editor.affiliation}
                  </p>
                  <p className="text-sm">{editor.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-card rounded-lg p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Peer Review Process</h2>
            <p className="mb-4">
              Our journal employs a rigorous double-blind peer review process to ensure the quality and integrity of published research. 
              Each submission is evaluated by at least two experts in the relevant field.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Initial Screening</h3>
                <p>Submissions are first screened for relevance, originality, and adherence to formatting guidelines.</p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Expert Review</h3>
                <p>Selected papers undergo detailed evaluation by field experts who provide comprehensive feedback.</p>
              </div>
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Final Decision</h3>
                <p>Editorial board makes final publication decisions based on reviewer recommendations and author revisions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Editorial;
