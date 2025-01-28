import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface AboutData {
  about: string;
  imageSource: string;
}

function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to fetch AboutData: ", err));
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
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 px-4 lg:px-20 py-10">
        {data && (
          <>
            <div className="flex-1 text-left">
              <h1 className="text-base sm:text-lg lg:text-xl indent-8 font-serif text-gray-900 leading-relaxed">
                {data.about.split("\n").map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                  </p>
                ))}
              </h1>
              <div className="flex-1 flex justify-center">
                <img
                  className="object-cover w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 rounded-full shadow-lg"
                  src={data.imageSource}
                  alt="SJShepPic"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
export default About;
