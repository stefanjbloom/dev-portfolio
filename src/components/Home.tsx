import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "motion/react";
import Social from "./Social";

function Home() {
  const [data, setData] = useState<{ name: String; roles: string[] } | null>(
    null
  );
  const typedElement = useRef<HTMLSpanElement>(null);
  const currentElement = useRef<Typed | null>(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Error Fetching Home Data: ", err));
  }, []);

  useEffect(() => {
    if (data && typedElement.current) {
      currentElement.current = new Typed(typedElement.current, {
        strings: data.roles,
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 700,
        loop: true,
      });
    }
    return () => {
      if (currentElement.current) {
        currentElement.current.destroy();
      }
    };
  }, [data]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-300 via-white to-gray-600"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.7, ease: "easeInOut" }}
    >
      {" "}
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen px-6 text-center space-y-6">
        {data && (
          <>
            <h1 className="text-4xl sm:text-5x1 lg:text-6xl font-bold font-serif text-gray-900">
              {data.name}
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light">
              I am{" "}
              <span
                ref={typedElement}
                className="text-blue-500 font-semibold"
              />
            </h2>
          </>
        )}
        <div className="mt-8">
          <Social />
        </div>
      </div>
    </motion.div>
  );
}
export default Home;
