import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProjectProps {
  title: string;
  children: React.ReactNode;
}

const Project: React.FC<ProjectProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container my-5 mx-auto mt-3 border-2 border-black rounded-lg bg-white shadow-md transition-all duration-300">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
          isOpen ? "border-b border-black bg-gray-50" : ""
        }`}
      >
        <h2 className="text-lg font-semibold text-center w-full">
          {title}{" "}
          {isOpen ? (
            <ChevronUp className="w-6 h-6 fill-black" />
          ) : (
            <ChevronDown className="w-6 h-6 fill-black" />
          )}
        </h2>
      </div>

      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 text-center">{children}</div>
      )}
    </div>
  );
};

export default Project;
