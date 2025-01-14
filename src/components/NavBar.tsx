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
    <nav className="bg-black-100 text-white px-4 flex items-center justify-between">
      {data?.logo && (
        <div className="flex items-center">
          <img
            src={data.logo.source}
            alt="Logo"
            height={data.logo.height}
            width={data.logo.width}
            className="rounded-full"
          />
        </div>
      )}
      <ul className="flex space-x-4">
        {data?.sections.map((section, index) => (
          <li key={index}>
            {section.type === "link" ? (
              <a
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
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
    </nav>
  );
}
export default NavBar;
