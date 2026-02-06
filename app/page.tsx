'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import HeartBackground from '../components/HeartBackground';
import Letter from '../components/Letter';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for premium feel
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main-container relative">
      <HeartBackground />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#fffafb]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            >
              <Heart className="w-16 h-16 text-pink-400 fill-pink-400 opacity-80" />
            </motion.div>
            <p className="mt-6 text-pink-400 font-light tracking-[0.4em] uppercase text-xs">Crafting Magic</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full flex flex-col items-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center mb-16 sm:mb-20">
              <h1 className="title">For You</h1>
              <motion.h2
                className="subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                How it started ?
              </motion.h2>
            </div>

            <div className="letters-grid">
              <Letter
                name="Bbhavesh"
                imagePlaceholder="/2.jpg"
              />
              <Letter
                name="Gunjan"
                imagePlaceholder="/3.jpg"
              />
            </div>

            {/* Hint text with generous spacing */}
            <motion.div
              className="mt-48 sm:mt-56 flex flex-col items-center pb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="text-pink-400 text-xs tracking-[0.4em] uppercase font-light">Tap an envelope to reveal</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-8 left-0 w-full text-center z-40 pointer-events-none">
        <p className="text-pink-400/70 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
          With Love From Babbu & Chotu
        </p>
      </footer>
    </main>
  );
}
