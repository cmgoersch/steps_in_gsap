import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import './HeroScrollSpin.css';

gsap.registerPlugin(MotionPathPlugin);

export default function HeroScrollSpin() {
  const headlineRef = useRef(null);
  const birdRef = useRef(null);
  let timeout;

  useEffect(() => {
    const headline = headlineRef.current;
    const bird = birdRef.current;
    let currentRotation = 0;
    let lastScrollY = window.scrollY;

    // 🐦 Chaotisch-runde Flugbahn beim Scrollen
    const flyInLoop = () => {
      gsap.to(bird, {
        duration: 6,
        ease: "power2.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 50, y: -90 },
            { x: -30, y: -100 },
            { x: -60, y: -50 },
            { x: 0, y: 20 }
          ],
          autoRotate: false
        }
      });
    };

    // 🕊️ Rückflug zur Ursprungsposition
    const land = () => {
      gsap.to(bird, {
        duration: 0.8,
        x: 0,
        y: 0,
        scale: 1,
        ease: "bounce.out",
      });
    };

    const updateRotation = (delta) => {
      const rotationAmount = delta * 4;
      currentRotation += rotationAmount;

      gsap.to(headline, {
        rotationY: currentRotation,
        duration: 0.2,
        ease: "power1.out",
      });

      flyInLoop();

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentRotation = 0;
        gsap.to(headline, {
          rotationY: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.3)",
        });

        land();
      }, 150);
    };

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      if (delta !== 0) {
        updateRotation(delta);
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="bird" ref={birdRef}>
        <img src="/vogel.svg" alt="Vogel" />
      </div>
      <h1 ref={headlineRef} className="hero-headline">
        <span>Animate</span>
        <span>anyth!ng</span>
      </h1>
    </section>
  );
}