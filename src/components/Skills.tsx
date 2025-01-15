import Navbar from "./NavBar";
import endpoints from "../endpoints/endpoints";
import { useState, useEffect } from "react";

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
    <div className="min-h-screen min-w-screen bg-gradient-to-b from-gray-100 via-white to-gray-350">
      <Navbar />
      <div className="flex flex-row items-center justify-center gap-5 pxx-4 lg:px-20">
        {data && (
          <>
            <header className="font-serif text-lg text-gray-900 mt-5 leading-relaxed text-center font-bold">
              {data.intro}
            </header>
            <div className="font-serif text-lg text-gray-900 mt-5 leading-relaxed text-center font-bold max-w-3xl">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4">
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
                        <span className="text-gray-700">{item.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Skills;
