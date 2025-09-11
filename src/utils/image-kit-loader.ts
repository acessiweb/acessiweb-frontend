"use client";

// Docs: https://imagekit.io/docs/image-transformation
export default function imageKitLoader(src: string) {
  return `${process.env.NEXT_PUBLIC_IMAGE_KIT_ENDPOINT}/${src}`;
}
