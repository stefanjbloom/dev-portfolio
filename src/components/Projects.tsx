import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface AllProjects {
  projects: ProjectData[];
}

interface ProjectData {
  image: string;
  title: string;
  bodyText: string;
  links: LinkData[];
  tags: string[];
}

interface LinkData {
  text: string;
  href: string;
}

function Projects() {
  const [data, setData] = useState<AllProjects | null>(null);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: AllProjects) => {
        setData(res);
      })
      .catch((err) => console.error("Error Fetching Project Data: ", err));
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-300 via-white to-gray-600"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.7, ease: "easeInOut" }}
    >
      <Navbar />
      {data && (
        <>
          <div className="flex flex-row flex-wrap justify-center gap-8 mt-10 px-4 lg:px-20">
            {data.projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-gray shadow-md rounded-lg p-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4 text-center">
                  {project.title}
                </h2>
                <div className="flex justify-center">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="mt-2 max-w-screen-md h-auto"
                  />
                </div>
                <ul className="text-xl font-serif font-semibold text-gray-800 mx-4 my-4 text-center list-disc list-inside">
                  {project.bodyText.split("\n").map((text, index) => (
                    <li key={index} className="mb-2">
                      {text}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  {project.links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {project.tags.map((tag, index) => (
                    <p
                      className="font-serif text-blue-500 hover:bold"
                      key={index}
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
export default Projects;
