"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import backfoto from "../../../public/assets/images/backfoto.jpg";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAutoFlipped, setHasAutoFlipped] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipeGesture();
  };

  const handleSwipeGesture = () => {
    const deltaX = touchEndX.current - touchStartX.current;

    if (Math.abs(deltaX) > 50) {
      setIsFlipped((prev) => !prev);
    }
  };

  // Auto flip
  useEffect(() => {
    if (!hasAutoFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        setTimeout(() => {
          setIsFlipped(false);
        }, 1500);
        setHasAutoFlipped(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoFlipped]);

  return (
    <section className="flex justify-center pt-10 pb-20 min-h-screen">
      <div className="max-w-80 text-center">
        <h1 className="text-3xl font-bold">Song4u</h1>
        <p className="mt-5">
          Song4u adalah platform yang memungkinkan kamu berbagi lagu favorit
          hanya dengan sekali klik. Dengarkan, pilih, dan kirim—mudah, cepat,
          bermakna.
        </p>
        <br />
        <p>
          Platform dibuat oleh Gue Sendiri <br /> Dennis Abizar
        </p>
        <br />
        <div className="flex justify-center">
          <motion.div
            className="w-40 h-40 relative"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Front Side */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                src={backfoto}
                alt="Back Foto"
                fill
                className="object-cover"
                draggable={false}
              />
            </motion.div>

            {/* Back Side */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center text-white bg-black select-none"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              Halo!!
            </motion.div>
          </motion.div>
        </div>

        <p className="mt-5">
          "Project yang gue kembangin untuk saling mengirim pesan dengan musik favoritnya, semoga dengan aplikasi ini teman-teman di sekitar gue bisa mengungkapkan perasaannya melalui platform web SONG4U."
        </p>
      </div>
    </section>
  );
}
