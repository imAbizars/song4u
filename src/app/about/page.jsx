"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import backfoto from "../../../public/assets/images/backfoto.jpg";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAutoFlipped, setHasAutoFlipped] = useState(false);

  const handleSwipe = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > 50 || Math.abs(velocity) > 500) {
      setIsFlipped((prev) => !prev);
    }
  };

  // Flip otomatis satu kali setelah 3 detik tanpa interaksi
  useEffect(() => {
    if (!hasAutoFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);

        // Flip balik ke depan setelah 2 detik
        setTimeout(() => {
          setIsFlipped(false);
        }, 1500);

        setHasAutoFlipped(true); // Supaya tidak diulang lagi
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoFlipped]);

  return (
    <section className="flex justify-center pt-20 min-h-screen">
      <div className="max-w-80 text-center">
        <h1 className="text-3xl">Song4u</h1>
        <p className="mt-10">
          Song4u adalah platform yang memungkinkan kamu berbagi lagu favorit
          hanya dengan sekali klik. Dengarkan, pilih, dan kirim—mudah, cepat,
          bermakna.
        </p>
        <br />
        <p>
          Platform dibuat oleh Saya Sendiri <br /> Dennis Abizar
        </p>
        <br />
        <div className="flex justify-center">
          <motion.div
            className="w-40 h-40 relative"
            onPanEnd={handleSwipe}
            drag="x" 
            dragConstraints={{ left: 0, right: 0 }}
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{
              perspective: 1000,
              transformStyle: "preserve-3d",
            }}
          >

            {/* Front Side */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
              }}
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

        <p className="mt-4 text-sm italic">
          Project iseng yang kubuat. Awalnya ini ditujukan untuk temanku yang
          ingin mengungkapkan isi hatinya. Walaupun masih kurang, aku harap ini
          bisa jadi sesuatu yang bermanfaat.
        </p>
      </div>
    </section>
  );
}
