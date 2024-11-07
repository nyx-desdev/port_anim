"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function AnimatedHero() {
  const introRef = useRef(null);
  const bgShapesRef = useRef(null);
  const component = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Animate introduction text
    gsap.from(introRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Animate background shapes based on mouse position
    gsap.to(".bg-shape", {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        return (mousePosition.x - centerX) / 20;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        return (mousePosition.y - centerY) / 20;
      },
      duration: 0.5,
      ease: "power2.out",
    });
  }, [mousePosition]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 5 })
        .fromTo(
          ".name-animation",
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: "elastic.out(1,0.3)",
            duration: 1,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          }
        )
        .fromTo(
          ".job-title",
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: "elastic.out(1,0.3)",
          }
        );
    }, component);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name, key) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0 `}
      >
        {letter}
      </span>
    ));
  };
  useEffect(() => {
    // Animate background shapes based on mouse position
    gsap.to(".bg-shape", {
      x: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        return (mousePosition.x - centerX) / 20;
      },
      y: (i, el) => {
        const rect = el.getBoundingClientRect();
        const centerY = rect.top + rect.height / 2;
        return (mousePosition.y - centerY) / 20;
      },
      duration: 0.5,
      ease: "power2.out",
    });
  }, [mousePosition]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      {/* Background shapes */}
      <div ref={bgShapesRef} className="absolute inset-0 z-0">
        <div className="bg-shape absolute top-1/4 left-1/4 w-20 h-20 bg-red-300 rounded-full"></div>
        <div className="bg-shape absolute top-1/2 right-1/3 w-32 h-32 bg-green-300 rounded-full"></div>
        <div className="bg-shape absolute bottom-1/4 right-1/4 w-24 h-24 bg-blue-400 rounded-full"></div>
        <div className="bg-shape absolute bottom-1/4 left-1/4 w-20 h-20 bg-yellow-300 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 z-10" ref={component}>
        <div ref={introRef} className="text-center">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter">
            <span className="block text-slate-300 ">
              {renderLetters("Nikhil", "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500  ">
              {renderLetters("Arya", "last")}
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
              React Developer
            </span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4"></div>
        </div>
      </div>
    </section>
  );
}
