"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label";
import { useInView } from "framer-motion";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    class Particle {
      x;
      y;
      size;
      speedX;
      speedY;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        if (ctx) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function handleParticles() {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (particles.length < 100) {
        particles.push(new Particle());
      }
      handleParticles();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(0);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white p-4">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />
      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 w-full max-w-md relative z-10"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {["name", "email", "message"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-2"
            >
              <Label htmlFor={field} className="text-white">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                id={field}
                type={field === "email" ? "email" : "text"}
                className="bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                placeholder={`Your ${field}`}
                {...register(field, { required: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` })}
              />
              <AnimatePresence>
                {errors[field] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-300 text-sm"
                  >
                    {errors[field].message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <CustomButton
              type="submit"
              className="w-full"
            >
              Send Message
            </CustomButton>
          </motion.div>
        </form>
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-lg"
            >
              <p className="text-white text-xl font-bold">Message Sent!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
