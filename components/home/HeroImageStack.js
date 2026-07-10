"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { heroImages } from "@/data/mockData";

const ROTATE_MS = 6000;

export default function HeroImageStack() {
  const [order, setOrder] = useState(heroImages.map((c) => c.id));
  const [failed, setFailed] = useState({}); // ids that failed to load

  useEffect(() => {
    const timer = setInterval(() => {
      setOrder((prev) => {
        const [front, ...rest] = prev;
        return [...rest, front];
      });
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:flex justify-center">
      <div className="relative w-full max-w-xs aspect-square">
        {order.map((id, position) => {
          const image = heroImages.find((c) => c.id === id);
          const offset = position * 16;
          const rotate = position === 0 ? 0 : -10 + position * 5;
          const scale = 1 - position * 0.06;
          const opacity = 1 - position * 0.15;

          return (
            <div
              key={id}
              className="absolute inset-0 rounded-card border border-white/10 overflow-hidden
                shadow-[0_12px_30px_rgba(0,22,65,0.35)] transition-all duration-700 ease-in-out"
              style={{
                transform: `translate(${offset}px, ${offset}px) rotate(${rotate}deg) scale(${scale})`,
                zIndex: heroImages.length - position,
                opacity,
              }}
            >
              {failed[id] ? (
                <div className={`w-full h-full flex items-center justify-center ${image.tint}`}>
                  <p className="text-white/60 text-sm text-center px-8">{image.alt}</p>
                </div>
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 384px, 0px"
                  className="object-cover"
                  priority={position === 0}
                  onError={() => setFailed((prev) => ({ ...prev, [id]: true }))}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}