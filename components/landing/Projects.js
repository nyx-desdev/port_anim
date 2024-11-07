"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CustomButton from "../ui/CustomButton";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution.",
    technologies: [
      { name: "Next.js", percentage: 45 },
      { name: "React", percentage: 25 },
    ],
    image: "amazon.png",
    link: "https://amazon-clone-sooty-two.vercel.app/",
  },
  {
    id: 2,
    title: "AI-powered ColorPicker",
    description: "An intelligent chatbot to pick colors",
    technologies: [
      { name: "React.js", percentage: 45 },
      { name: "Express", percentage: 25 },
    ],
    image: "colorpicker.jpeg",
    link: "https://nimble-halva-ce515d.netlify.app/",
  },
  {
    id: 3,
    title: "MovieDB",
    description: "A list of curated latest movies",
    technologies: [
      { name: "React.js", percentage: 45 },
      { name: "Express", percentage: 25 },
    ],
    image: "moviedb.jpeg",
    link: "https://cozy-dodol-5c0f6a.netlify.app/",
  },
];

const TechnologyChart = ({ technologies }) => {
  return (
    <div className="mt-4">
      {technologies.map((tech) => (
        <div key={tech.name} className="mb-2">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">
              {tech.name}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {tech.percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-yellow-400 to-red-500 h-2.5 rounded-full"
              style={{ width: `${tech.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className="w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <Image
            src={`/images/${project.image}`} // Adjust the path as necessary
            alt={project.title}
            width={500} // Set appropriate width
            height={300} // Set appropriate height
            className="rounded-lg mb-4" // Optional styling
          />
          <h3 className="text-2xl font-semibold mb-2 text-yellow-200">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          <TechnologyChart technologies={project.technologies} />
        </div>
        <div className="mt-4">
          <CustomButton
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </CustomButton>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-200">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1.5, delay: index * 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
