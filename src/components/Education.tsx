import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface EducationData {
  education: string;
  info: SchoolData;
}

interface SchoolData {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  icon: SrcData;
}

interface SrcData {
  src: string;
}

function Education() {
  const [data, setData] = useState<EducationData | null>(null);

  useEffect(() => {
    fetch(endpoints.education, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => setData(res))
    .catch((err) => console.error('Failed to Fetch Education lol: ', err))
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-300 via-white to-gray-600"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <Navbar />
      {data && (
        <>
          <div>
            
          </div>
        </>
      )}
    </motion.div>

  );
}
export default Education;
