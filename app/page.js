"use client";
import AnimatedHero from "@/components/landing/AnimateHero";
import { useState, useEffect } from "react";
import { gsap, Expo } from "gsap";
import About from "@/components/landing/About";
import ProjectsSection from "@/components/landing/Projects";
import InteractiveList from "@/components/landing/InteractiveList";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";
// import TechStackCube from "@/components/landing/TechStackCube";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Scroll to the top on component mount
    window.scrollTo(0, 0);

    const count = setInterval(() => {
      setCounter((prevCounter) =>
        prevCounter < 100
          ? prevCounter + 1
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 0);
  }, []);

  const reveal = () => {
    // Disable scrolling
    document.body.classList.add("overflow-hidden");

    const t1 = gsap.timeline({
      onComplete: () => {
        console.log("Animation completed");
        // Enable scrolling after animations
        document.body.classList.remove("overflow-hidden");
        // Remove the 'absolute' class after animation
        document.querySelector(".content").classList.remove("absolute");
        setIsAnimationComplete(true);
      },
    });
    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.7,
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.5,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0.7 })
      .to(".follow", { opacity: 0, duration: 0.3 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.9,
        ease: Expo.easeInOut,
        duration: 0.6,
      });
  };
  return (
    <div className="w-screen h-screen relative bg-black text-white">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute bg-gradient-to-r from-peenk to-purplee  h-[2px] left-0 follow"></div>

        <div
          className="absolute bg-white h-[2px] left-0 transition-all duration-400 hide"
          style={{ width: `${counter}%` }}
        ></div>
        <p className="absolute text-[130px] font-medium text-white transform -translate-y-[15px] hide">
          {counter}%
        </p>
      </div>

      <div className="absolute inset-0 bg-black content w-0  text-white">
        {isAnimationComplete && (
          <div className="absolute inset-0  w-full h-full blur-2xl">
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 md:left-24 md:transform-none w-56 h-56 bg-violet-600 rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-3xl"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:bottom-2 md:left-auto md:right-1/4 md:transform-none w-56 h-56 bg-sky-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-1000 filter blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 md:bottom-1/4 md:left-1/3 md:transform-none w-56 h-56 bg-pink-600 rounded-full mix-blend-multiply opacity-70 animate-blob delay-500 filter blur-3xl"></div>
          </div>
        )}
        <div className="title-lines">
          <AnimatedHero />
        </div>
      </div>
      {isAnimationComplete && (
        <>
          <div>
            <About />
          </div>
          <div>
            <ProjectsSection />
          </div>
          <div>
            {/* <TechStackCube /> */}
            <InteractiveList />
          </div>
          <div>
            <ContactForm />
          </div>
          <div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
