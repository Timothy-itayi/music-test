"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useOutsideClick } from "@/app/components/Cards/hooks/useoutsidehooks";
import MusicPlayer from '../Modals/Audio-Player/Music-Player';

const Modals = () => {
  const [active, setActive] = useState(null);
  const [animating, setAnimating] = useState(false);
  const id = useId();
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const closeModal = () => {
    setAnimating(true);
    const timeline = gsap.timeline({
      onComplete: () => {
        setActive(null);
        setAnimating(false);
      },
    });

    timeline
      .to(modalRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.3"
      );
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
        duration: 0.5,
      });

      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
      });
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(modalRef, closeModal);

  return (
    <>
      {active && typeof active === "object" && (
        <div
          ref={overlayRef}
          className="fixed inset-0   h-full w-full z-10"
        />
      )}

      {active && typeof active === "object" ? (
        <div className="fixed inset-0 grid place-items-center z-[100]">
          <button
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center  rounded-full h-6 w-6"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
          <div
            ref={modalRef}
            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#F4F4F3] sm:rounded-3xl overflow-hidden"
          >
            <div>
              <Image
                priority
                width={200}
                height={200}
                src={active.src}
                alt={active.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
              />
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
                className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
              >
                {active.ctaText}
              </a>
            </div>

            <div className="pt-4 px-4">
              <div className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400">
                {typeof active.content === "function" ? active.content() : active.content}
              </div>
            </div>

            {/* Centered Music Player */}
            <div>
              <MusicPlayer soundSrc={active.soundSrc} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

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
  
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

export default Modals;
