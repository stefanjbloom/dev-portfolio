import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface EducationData {
  education: SchoolData[];
}

interface SchoolData {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string;
  icon?: SrcData;
}

interface SrcData {
  src: string;
}

function Education() {
  const [data, setData] = useState<EducationData | null>(null);
  const iconMap: { [key: string]: string } = {
    turing: "images/education/turingicon.png",
    gulliver: "images/education/gulliver.png",
  };

  useEffect(() => {
    fetch(endpoints.education, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to Fetch Education lol: ", err));
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
          <div className="flex flex-wrap justify-center gap-8 mt-28 px-4 lg:px-20">
            {data.education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-gray shadow-md rounded-lg p-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1.5 }}
              >
                <h2 className="text-xl font-serif font-semibold text-gray-800 mb-4 text-center">
                  {edu.title}
                </h2>
                <h2 className="text-xl font-bold font-serif text-gray-800 mb-4 text-center">
                  {edu.cardTitle}
                </h2>
                <h3 className="text-lg font-semibold font-serif text-gray-800 mb-4 text-center">
                  {edu.cardSubtitle}
                </h3>
                <p className="space-y-2">{edu.cardDetailedText}</p>
                <div className="flex justify-center">
                  <img
                    src={edu.icon?.src || iconMap[edu.cardTitle]}
                    alt={edu.cardTitle}
                    className="mt-2 w-15 h-10"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
export default Education;
