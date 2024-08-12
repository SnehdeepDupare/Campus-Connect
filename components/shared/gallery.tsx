"use client";

import Image from "next/image";
import Link from "next/link";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

type GalleryProps = {
  authorName: string;
  image: string;
};

export const Gallery = ({ authorName, image }: GalleryProps) => {
  return (
    <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
      <Link href={image}>
        <div className="relative min-h-60 w-full max-w-sm mt-5">
          <Image
            src={image}
            alt={`${authorName}'s Post`}
            fill
            priority
            className="object-contain rounded-lg cursor-zoom-in"
          />
        </div>
      </Link>
    </LightGallery>
  );
};
