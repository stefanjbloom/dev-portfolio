import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface SkillItems {
  title: string;
  items: SkillCategory[];
}

interface SkillCategory {
  icon: string;
  title: string;
}

interface SkillsData {
  intro: string;
  skills: SkillItems[];
}

function Skills() {
  const [data, setData] = useState<SkillsData | null>(null);

  useEffect(() => {
    fetch(endpoints.skills, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to fetch SkillsData: ", err));
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
          <header className="text-center mt-8 px-4">
            <h1 className="font-serif text-lg text-gray-900 leading-relaxed font-bold max-w-3xl mx-auto">
              {data.intro}
            </h1>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 px-4 lg:px-20">
            {data.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-lg p-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                  {skill.title}
                </h2>
                <ul className="space-y-2">
                  {skill.items.map((item, id) => (
                    <li key={id} className="flex items-center gap-3">
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-gray-700 font-serif">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
export default Skills;
