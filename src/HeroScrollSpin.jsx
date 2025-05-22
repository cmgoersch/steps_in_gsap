import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import './HeroScrollSpin.css';

export default function HeroScrollSpin() {
  const headlineRef = useRef(null);
  let timeout;

  useEffect(() => {
    const el = headlineRef.current;
    let currentRotation = 0;

    const updateRotation = (delta) => {
      const rotationAmount = delta * 4; // du kannst hier mit dem Wert spielen
      currentRotation += rotationAmount;

      gsap.to(el, {
        rotationY: currentRotation,
        duration: 0.2,
        ease: "power1.out",
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentRotation = 0;
        gsap.to(el, {
          rotationY: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        });
      }, 150);
    };

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      updateRotation(delta);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="hero-section">
  <h1 ref={headlineRef} className="hero-headline">
    <span>Animate</span>
    <span>anyth!ng</span>
  </h1>
</section>
  );
}