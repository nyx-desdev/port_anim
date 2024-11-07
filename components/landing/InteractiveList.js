"use client";

import React, { useLayoutEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InteractiveList = () => {
  const component = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      console.log("GSAP animation context initialized");
      const tl = gsap.timeline({
        repeat: -1,
        ease: "none",
      });

      tl.to(".tech-row", {
        x: (index) => {
          return index % 2 === 0
            ? gsap.utils.random(-600, -400)
            : gsap.utils.random(600, 400);
        },
        duration: 10,
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="wrapper overflow-hidden min-h-full bg-black"
      ref={component}
    >
      {true > 0 ? (
        [
          {
            tech_color: "#00D1F7",
            tech_name: "react",
          },
          {
            tech_color: "#FFFFFF",
            tech_name: "Next.js",
          },
          {
            tech_color: "#0AE448",
            tech_name: "GSAP",
          },
          {
            tech_color: "#4c1d95",
            tech_name: "Tailwind",
          },
        ].map(({ tech_color, tech_name }, index) => (
          <div
            key={index}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={tech_name || ""}
          >
            {Array.from({ length: 15 }, (_, index) => (
              <React.Fragment key={index}>
                <span
                  className={
                    "tech-item text-8xl font-extrabold uppercase tracking-tighter"
                  }
                  style={{
                    color: index === 7 && tech_color ? tech_color : "inherit",
                    textShadow:
                      "2px 2px 0 rgba(0, 0, 0, 0.5), 4px 4px 0 rgba(0, 0, 0, 0.3)",
                    transform: "translateZ(0)",
                  }}
                >
                  {tech_name}
                </span>
                <span className="text-3xl">
                  <MdCircle />
                </span>
              </React.Fragment>
            ))}
          </div>
        ))
      ) : (
        <div>No technologies available</div>
      )}
    </section>
  );
};

export default InteractiveList;
