import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";

interface NavBarData {
  logo: {
    source: string;
    height: number;
    width: number;
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

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white px-6 py-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {data?.logo && (
          <div className="flex items-center">
            <img
              src={data.logo.source}
              alt="Logo"
              height={data.logo.height}
              width={data.logo.width}
              className="rounded-full shadow-lg"
            />
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
                  className="hover:text-blue-400 transition-colors duration-300"
                >
                  {section.title}
                </a>
              ) : (
                <a href={section.href} className="hover:text-blue-400">
                  {section.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
export default NavBar;
