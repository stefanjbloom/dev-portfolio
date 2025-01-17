import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "motion/react";

interface NavBarData {
  logo: {
    source: string;
    height: number;
    width: number;
    title: string;
    href: string;
  };
  sections: {
    title: string;
    href: string;
    type?: string;
  }[];
}

function NavBar() {
  const [data, setData] = useState<NavBarData | null>(null);

  useEffect(() => {
    fetch(endpoints.navbar, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to fetch NavBar: ", err));
  }, []);

  const gradientAnimation = useAnimation();

  useEffect(() => {
    gradientAnimation.start({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [gradientAnimation]);

  return (
    <motion.nav
      animate={gradientAnimation}
      className="px-6 py-4 shadow-md sticky top-0 z-50 rounded-md"
      style={{
        background:
          "linear-gradient(270deg,rgb(59, 130, 246),rgb(97, 67, 232),rgb(193,218,215),rgb(54, 127, 245))",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="flex items-center justify-between">
        {data?.logo && (
          <div className="flex items-center">
            <a
              href={data.logo.href}
              className="flex items-center"
              title={data.logo.title}
            >
              <img
                src={data.logo.source}
                alt="Go Home"
                height={data.logo.height}
                width={data.logo.width}
                className="rounded-full shadow-lg"
              />
            </a>
          </div>
        )}
        <ul className="flex space-x-6 text-lg">
          {data?.sections.map((section, index) => (
            <li key={index}>
              {section.type === "link" ? (
                <a
                  href={section.href}
                  target={section.type === "link" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-black font-serif font-bold hover:text-blue-400 transition-colors duration-300"
                >
                  {section.title}
                </a>
              ) : (
                <a href={section.href} className="text-black font-serif font-bold hover:text-blue-400">
                  {section.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
export default NavBar;
