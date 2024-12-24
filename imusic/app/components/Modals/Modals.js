"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useOutsideClick } from "@/app/components/Cards/hooks/useoutsidehooks";
import MusicPlayer from '../Modals/Audio-Player/Music-Player';

const  Modals = () => {
  const [active, setActive] = useState(null);
  const [animating, setAnimating] = useState(false);
  const id = useId();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const cardRefs = useRef({});

  const closeModal = () => {
    setAnimating(true);
    const timeline = gsap.timeline({
      onComplete: () => {
        setActive(null);
        setAnimating(false);
      }
    });

    timeline
      .to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3
      })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      }, "-=0.3");
  };

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
      
      // Animate modal opening
      gsap.from(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5
      });
      
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      });
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(modalRef, closeModal);

  const handleCardClick = (card) => {
    setActive(card);
  };

  return (<>
    {active && typeof active === "object" && (
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/20 h-full w-full z-10" />
    )}
    
    {active && typeof active === "object" ? (
      <div className="fixed inset-0 grid place-items-center z-[100]">
        <button
          className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
          onClick={closeModal}>
          <CloseIcon />
        </button>
        <div
          ref={modalRef}
          className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden">
          <div>
            <Image
              priority
              width={200}
              height={200}
              src={active.src}
              alt={active.title}
              className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
          </div>

          <div className="flex justify-between items-start p-4">
            <div>
              <h3 className="font-medium text-neutral-700 dark:text-neutral-200 text-base">
                {active.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-base">
                {active.description}
              </p>
            </div>

            <a
              href={active.ctaLink}
              target="_blank"
              className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white">
              {active.ctaText}
            </a>
          </div>

          <div className="pt-4 relative px-4">
            <div className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400">
              {typeof active.content === "function" ? active.content() : active.content}
            </div>
          </div>

          <MusicPlayer soundSrc={active.soundSrc} />
        </div>
      </div>
    ) : null}

    <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          ref={el => cardRefs.current[card.title] = el}
          onClick={() => handleCardClick(card)}
          className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
          <div className="flex gap-4 flex-col w-full">
            <div>
              <Image
                width={100}
                height={100}
                src={card.src}
                alt={card.title}
                className="h-60 w-full rounded-lg object-cover object-top" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <h3 className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base">
                {card.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </ul>
  </>);
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

const cards = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    soundSrc: "/path/to/summertime-sadness.mp3",
    content: () => (
      <p>
        Lana Del Rey, an iconic American singer-songwriter, is celebrated for
        her melancholic and cinematic music style. Born Elizabeth Woolridge
        Grant in New York City, she has captivated audiences worldwide with
        her haunting voice and introspective lyrics. <br /> <br />
        Her songs often explore themes of tragic romance, glamour, and melancholia,
        drawing inspiration from both contemporary and vintage pop culture.
        With a career that has seen numerous critically acclaimed albums, Lana
        Del Rey has established herself as a unique and influential figure in
        the music industry, earning a dedicated fan base and numerous accolades.
      </p>
    ),
  },
  // ... rest of the cards array remains the same
];
export default  Modals;