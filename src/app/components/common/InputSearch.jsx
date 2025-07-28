'use client'
import { useState } from "react";

export default function InputSearch({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleClick = () => {
    onSearch(term);
  };

  return (
    <div className="flex justify-center items-center mt-20 w-full space-x-4">
      <input
        type="text"
        className="p-2 border border-black w-50 rounded-xl h-10"
        placeholder="Search Your Name..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-xl hover:bg-[#383737] cursor-pointer"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}
