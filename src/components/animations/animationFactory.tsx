"use client";

import dynamic from "next/dynamic";
import React from "react";
import { AnimationOptions, AnimationType } from "./animationTypes";
import { animationRegistry } from "./animationRegistry";

const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false },
);

interface LottieFactoryProps extends AnimationOptions {
  animationType: AnimationType;
}

export function LottieFactory({
  animationType,
  ...options
}: LottieFactoryProps): React.ReactElement | null {
  const src = animationRegistry[animationType];

  if (!src) {
    console.warn(`Lottie animation not found for type: ${animationType}`);
    return null;
  }

  return (
    <LottiePlayer
      src={src}
      loop={options?.loop ?? true}
      autoplay={options?.autoplay ?? true}
      style={{
        width: options?.width ?? 200,
        height: options?.height ?? 200,
      }}
      className={options?.className}
    />
  );
}
