import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 sm:px-20 xl:px-32 my-24">
      <div className="text-center">
        <h2 className="text-slate-700 dark:text-white text-[42px] font-semibold transition-colors">
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">Powerful AI Tools</span>
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto transition-colors">
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology
        </p>
      </div>

      <div className="flex flex-wrap mt-10 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] dark:bg-indigo-900/50 dark:border-indigo-700 shadow-lg border border-gray-100 hover:-translate-y-1 dark:hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold dark:text-white transition-colors">{tool.title}</h3>
            <p className="text-gray-400 dark:text-gray-300 text-sm max-w-[95%] transition-colors">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
