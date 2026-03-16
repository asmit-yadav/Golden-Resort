import React, { useState } from "react";
import confetti from "canvas-confetti";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      setIsBouncing(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#f472b6", "#fbbf24", "#34d399", "#60a5fa"],
      });
      setTimeout(() => setIsBouncing(false), 500);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/80 hover:bg-pink-100 active:scale-95 ${
        isLiked ? "text-pink-600 bg-pink-50 border-pink-300" : "text-gray-700"
      }`}
      aria-pressed={isLiked}
    >
      <span
        className={`text-2xl transition-transform duration-200 ${
          isLiked ? "scale-125" : ""
        } ${isBouncing ? "animate-bounce" : ""}`}
      >
        👍
      </span>
      <span className="font-semibold text-lg">{likes}</span>
      <span className="sr-only">Like</span>
    </button>
  );
} 