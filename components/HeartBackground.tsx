'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeartBackground = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 40 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-[#fffafb]/50 backdrop-blur-[2px]" />
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0.4, 0],
            x: [0, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: heart.left,
            fontSize: `${heart.size}px`,
            color: '#ff4d6d',
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default HeartBackground;
