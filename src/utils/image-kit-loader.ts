"use client";

// Docs: https://imagekit.io/docs/image-transformation
export default function imageKitLoader(src: string) {
  return `${import.meta.env.VITE_IMAGE_KIT_ENDPOINT}/${src}`;
}
