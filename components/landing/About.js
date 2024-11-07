import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import StarGrid from "../ui/Stargrid";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 95 },
  { name: "ReactJS", level: 90 },
  { name: "Tailwind CSS", level: 80 },
];

const About = () => {
  const bioRef = useRef(null);
  const aboutRef = useRef(null);
  const skillRefs = useRef([]);
  const imageRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  useEffect(() => {
    gsap.fromTo(
      ".about-section",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    if (bioRef.current) {
      gsap.from(bioRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bioRef.current,
          start: "top 85%",
        },
      });
    }

    if (imageRef.current) {
      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        ease: "elastic.out(1, 0.75)",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });
    }

    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(
          ref,
          { width: 0, opacity: 0 },
          {
            width: `${skills[index].level}%`,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <section id="about" className="about-section p-8 bg-black text-white">
      <StarGrid />
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-10 text-center text-yellow-200">
          About Me
        </h2>
        <div className="flex flex-col md:flex-row items-center" ref={aboutRef}>
          <motion.div className="md:w-1/3 mb-6 md:mb-0">
            <Image
              src="https://nyx-desdev.netlify.app/img/SVG/boy.svg"
              alt="Profile"
              className="rounded-full w-48 h-48 mx-auto transform transition-all duration-500 hover:scale-105 shadow-lg border-4 border-white"
              width={192}
              height={192}
              style={{ border: "2px solid red" }}
            />
          </motion.div>
          <motion.div
            className="md:w-2/3 text-center md:text-left space-y-4 text-lg leading-relaxed"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p>
              Hello! I'm a passionate web developer with experience in front-end
              technologies and a knack for creating interactive, responsive web
              applications.
            </p>
            <p>
              I enjoy working with modern frameworks and libraries, especially
              ReactJS and Next.js, to create seamless user experiences.
            </p>
          </motion.div>
        </div>
        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-center mb-6 text-yellow-200">
            Skills
          </h3>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <span className="w-1/5 text-lg font-medium">{skill.name}</span>
                <div className="w-4/5 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    ref={(el) => (skillRefs.current[index] = el)}
                    className="bg-gradient-to-r from-yellow-400 to-red-500 h-4 rounded-full transition-all shadow-lg"
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
