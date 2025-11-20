import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Loader = () => {
  // Create refs for each bar
  const barRefs = Array.from({ length: 7 }, () => useRef<HTMLDivElement>(null));

  useEffect(() => {
    console.log("Loader effect running");
    barRefs.forEach((ref, i) => {
      gsap.set(ref.current, {
        height: "10px",
        width: "20px",
        margin: "0 5px",
        transformOrigin: "center",
      });
      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { scaleY: 1 },
          {
            scaleY: 10,
            duration: 0.3,
            ease: "sine.InOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2,
          }
        );
      }
    });
  }, [barRefs]);

  return (
    <div className="mx-auto flex-center">
      <section>
        <div className="w-full h-[500px] flex items-center justify-center">
          <div className="flex items-center justify-center">
            {barRefs.map((ref, i) => (
              <div key={i} ref={ref} className="bg-slate-900 round-lg"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

Loader.displayName = "Loader";
export { Loader };
