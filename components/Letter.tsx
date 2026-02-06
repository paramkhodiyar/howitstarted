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
                particleCount: 150,
                spread: 100,
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
            <div className="flex flex-col items-center justify-center w-full">
                <motion.div
                    className="relative cursor-pointer group"
                    onClick={handleOpen}
                    whileHover={{ scale: isOpen ? 1 : 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {/* Envelope Body */}
                    <div className="relative w-72 h-48 sm:w-96 sm:h-64 bg-white border border-pink-100 rounded-lg shadow-2xl shadow-pink-200/30 overflow-visible flex items-center justify-center">

                        {/* Top Flap */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-full origin-top z-20"
                            animate={{
                                rotateX: isOpen ? 180 : 0,
                                zIndex: isOpen ? 0 : 20
                            }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            <div className="w-full h-0 border-l-[144px] border-l-transparent border-r-[144px] border-r-transparent border-t-[96px] border-t-pink-50 sm:border-l-[192px] sm:border-r-[192px] sm:border-t-[128px] group-hover:border-t-pink-100 transition-colors" />
                        </motion.div>

                        {/* Recipient Name Tag */}
                        {!isOpen && (
                            <motion.div
                                className="z-30 px-6 py-3 bg-white/90 backdrop-blur-sm border border-pink-100 rounded-full shadow-md"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <p className="text-pink-500 font-light tracking-[0.2em] text-base uppercase">{name}</p>
                            </motion.div>
                        )}

                        {/* Letter Content (Image) */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    className="absolute left-4 right-4 z-10 bg-white shadow-2xl rounded-sm p-4 text-center border border-pink-50"
                                    initial={{ bottom: '10%', scale: 0.8, opacity: 0 }}
                                    animate={{ bottom: '35%', scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: 0.4,
                                        duration: 0.7,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                >
                                    <div className="relative group/img w-full aspect-[4/5] bg-pink-50 rounded flex items-center justify-center overflow-hidden">
                                        <img
                                            src={imagePlaceholder || "/2.jpg"}
                                            alt={`For ${name}`}
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Fullscreen Trigger Overlay */}
                                        <motion.div
                                            className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                            onClick={toggleFullscreen}
                                        >
                                            <div className="bg-white/90 p-3 rounded-full shadow-lg animate-blink">
                                                <Maximize2 className="w-6 h-6 text-pink-500" />
                                            </div>
                                        </motion.div>
                                    </div>
                                    <div className="mt-4 flex flex-col items-center">
                                        <Heart className="text-pink-400 w-6 h-6 animate-pulse mb-2 fill-pink-400" />
                                        <p className="text-pink-600 font-serif italic text-xl">With love, for {name}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Side Flaps (Visual only) */}
                        <div className="absolute inset-0 z-0 overflow-hidden rounded-lg">
                            <div className="absolute bottom-0 left-0 w-full h-0 border-l-[144px] border-l-white border-r-[144px] border-r-white border-b-[96px] border-b-transparent/5 sm:border-l-[192px] sm:border-r-[192px] sm:border-b-[128px]" />
                            <div className="absolute top-0 left-0 h-full w-0 border-t-[96px] border-t-transparent border-b-[96px] border-b-transparent border-l-[144px] border-l-white/50 sm:border-t-[128px] sm:border-b-[128px] sm:border-l-[192px]" />
                            <div className="absolute top-0 right-0 h-full w-0 border-t-[96px] border-t-transparent border-b-[96px] border-b-transparent border-r-[144px] border-r-white/50 sm:border-t-[128px] sm:border-b-[128px] sm:border-r-[192px]" />
                        </div>
                    </div>

                    {/* Shadow under envelope */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-6 bg-pink-200/20 blur-2xl rounded-full -z-10" />
                </motion.div>

                {isOpen && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-64 text-pink-400 hover:text-pink-600 text-sm font-light underline underline-offset-4"
                        onClick={() => setIsOpen(false)}
                    >
                        Close Letter
                    </motion.button>
                )}
            </div>

            {/* Fullscreen Overlay */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
                        onClick={toggleFullscreen}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={imagePlaceholder || "/2.jpg"}
                                alt={`For ${name} Fullscreen`}
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                            <button
                                className="absolute top-0 right-0 m-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                                onClick={toggleFullscreen}
                            >
                                <X className="w-8 h-8 text-white" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Letter;
