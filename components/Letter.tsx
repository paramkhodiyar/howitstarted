'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Maximize2, X } from 'lucide-react';

interface LetterProps {
    name: string;
    imagePlaceholder?: string;
}

const Letter: React.FC<LetterProps> = ({ name, imagePlaceholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff4d6d', '#ff8fa3', '#ffccd5']
            });
        }
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFullscreen(!isFullscreen);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full min-h-[500px] py-10">
                <motion.div
                    className="relative cursor-pointer group"
                    onClick={handleOpen}
                    whileHover={isOpen ? {} : { scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Envelope Body */}
                    <div className="relative w-64 h-44 sm:w-80 sm:h-56 bg-white border border-pink-100 rounded-lg shadow-xl shadow-pink-100/10 overflow-visible flex items-center justify-center">

                        {/* Top Flap (The Triangle) */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full origin-top z-20"
                            animate={{
                                rotateX: isOpen ? 180 : 0,
                                zIndex: isOpen ? 0 : 20
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                            style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                        >
                            <div className="w-full h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[88px] border-t-pink-50 sm:border-l-[160px] sm:border-r-[160px] sm:border-t-[112px] group-hover:border-t-pink-100 transition-colors" />

                            {/* Seal on the flap */}
                            {!isOpen && (
                                <div className="absolute top-[40px] sm:top-[60px] left-1/2 -translate-x-1/2">
                                    <Heart className="w-6 h-6 text-pink-300 fill-pink-200 opacity-60" />
                                </div>
                            )}
                        </motion.div>

                        {/* Recipient Name Tag - Centered and visible initially */}
                        {!isOpen && (
                            <motion.div
                                className="z-30 px-5 py-2 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-full shadow-sm"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-pink-500 font-light tracking-[0.2em] text-xs uppercase">{name}</p>
                            </motion.div>
                        )}

                        {/* Letter Content (Paper and Image) */}
                        <AnimatePresence mode="wait">
                            {isOpen && (
                                <motion.div
                                    className="absolute left-4 right-4 z-10 bg-white shadow-2xl rounded p-4 text-center border border-pink-50"
                                    initial={{ bottom: '10%', scale: 0.8, opacity: 0 }}
                                    animate={{ bottom: '45%', scale: 1, opacity: 1 }}
                                    exit={{ bottom: '10%', scale: 0.8, opacity: 0 }}
                                    transition={{
                                        delay: 0.3,
                                        duration: 0.7,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    <div className="relative group/img w-full aspect-[4/5] bg-pink-50/50 rounded overflow-hidden cursor-zoom-in" onClick={toggleFullscreen}>
                                        <img
                                            src={imagePlaceholder || "/2.jpg"}
                                            alt={`For ${name}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="bg-white/80 p-2 rounded-full animate-blink">
                                                <Maximize2 className="w-5 h-5 text-pink-500" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex flex-col items-center">
                                        <Heart className="text-pink-400 w-5 h-5 animate-pulse mb-1 fill-pink-400" />
                                        <p className="text-pink-600 font-serif italic text-lg">{name}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Side and Bottom Flaps (Visual) */}
                        <div className="absolute inset-0 z-0 overflow-hidden rounded-lg pointer-events-none">
                            <div className="absolute bottom-0 left-0 w-full h-0 border-l-[128px] border-l-white border-r-[128px] border-r-white border-b-[88px] border-b-transparent/5 sm:border-l-[160px] sm:border-r-[160px] sm:border-b-[112px]" />
                            <div className="absolute top-0 left-0 h-full w-0 border-t-[88px] border-t-transparent border-b-[88px] border-b-transparent border-l-[128px] border-l-white sm:border-t-[112px] sm:border-b-[112px] sm:border-l-[160px] opacity-80" />
                            <div className="absolute top-0 right-0 h-full w-0 border-t-[88px] border-t-transparent border-b-[88px] border-b-transparent border-r-[128px] border-r-white sm:border-t-[112px] sm:border-b-[112px] sm:border-r-[160px] opacity-80" />
                        </div>
                    </div>

                    {/* Shadow */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-4 bg-pink-200/10 blur-xl rounded-full -z-10" />
                </motion.div>

                {/* Action Button - Far enough from the letter */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-60 sm:mt-52 text-pink-400 hover:text-pink-600 text-xs font-medium tracking-widest uppercase py-3 px-6 border border-pink-100 rounded-full hover:bg-pink-50 transition-all z-40"
                            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        >
                            Close Letter
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Fullscreen Modal - Dark and Focused */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
                        onClick={toggleFullscreen}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={imagePlaceholder || "/2.jpg"}
                                alt="Fullscreen"
                                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm border-2 border-white/5"
                            />
                            <button
                                className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                                onClick={toggleFullscreen}
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Letter;
