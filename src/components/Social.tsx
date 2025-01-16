import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";

interface SocialData {
  social: NetworkData[];
}

interface NetworkData {
  network: string;
  href: string;
}

function Social() {
  const [data, setData] = useState<SocialData | null>(null);
  const iconMap: { [key: string]: string } = {
    linkedin: "/images/skills/linkedin.png",
    github: "/images/skills/github-original.svg",
    email: "/images/skills/email.png",
  };

  useEffect(() => {
    fetch(endpoints.social, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Failed to Fetch Social Life lol: ", err));
  }, []);

  return (
    <div className="flex flex-row justify-center items-center space-x-6 mt-6">
      {data
        ? data.social.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-blue-500 text-xl font-medium transition-colors duration-300"
            >
              <img
                src={iconMap[social.network]}
                alt={`${social.network}`}
                className="w-10 h-10"
              />
            </a>
          ))
        : null}
    </div>
  );
}
export default Social;
