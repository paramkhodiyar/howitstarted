'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import HeartBackground from '../components/HeartBackground';
import Letter from '../components/Letter';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for a premium feel
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="main-container min-h-screen flex flex-col items-center justify-center relative bg-[#fffafb] py-20">
      <HeartBackground />

      <AnimatePresence>
        {isLoading ? (
          <motion.div
            key="loader"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Heart className="w-16 h-16 text-pink-400 fill-pink-400" />
            </motion.div>
            <p className="text-pink-400 font-light tracking-[0.4em] uppercase text-sm">Crafting Magic</p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col items-center mb-24">
              <h1 className="title">
                How it Started ?
              </h1>
              {/* <motion.h2
                className="subtitle"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                How it started ?
              </motion.h2> */}
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

            <motion.div
              className="mt-32 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity duration-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-pink-300 text-pink-400/80 text-sm tracking-[0.3em] uppercase">Tap an envelope to reveal</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-8 text-pink-400/80 text-xs tracking-[0.3em] uppercase font-medium pointer-events-none">
        With Love From Babbu & Chotu
      </footer>
    </main>
  );
}
