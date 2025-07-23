"use client";

import { useState } from "react";
import Image from "next/image";

interface Collection {
  id: number;
  images: string[];
}

interface LookbookProps {
  collections: Collection[];
}

export default function Lookbook({ collections }: LookbookProps) {
  // which collection (0,1,2…)
  const [collectionIndex, setCollectionIndex] = useState(0);
  const current = collections[collectionIndex];

  return (
    <div
      className="
        flex flex-col               /* mobile: stack cart→content vertically */
        lg:flex-row                 /* desktop: cart + content side-by-side */
        mx-[8%]                     /* 8% side margins */
        min-h-screen bg-black text-white mb-[20%vh]
      "
    >

      {/* ─── LOOKBOOK CONTENT ─────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Hero image */}
            <section
            className="
                relative
                mx-auto                 /* center horizontally */
                w-[35%]                  /* 55% width on lg+ (you can scope with lg:) */
                lg:pr-[5%] /* padding-inline: clamp(min, preferred %, max) */
                h-[calc(75vh-4rem)]                 /* or whatever height you need */
                
            "
            >
        <Image
            src={`/lookbook/collection-${current.id}/${current.images[0]}`}
            alt={`Collection ${current.id} hero`}
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* Thumbnails: flex-row scrollable on mobile, grid on desktop */}
        <nav
          className="
            w-[45%]
            /* MOBILE: 1-row scroll */
            flex flex-row overflow-x-auto overflow-y-hidden gap-0
            /* DESKTOP: grid 4-cols, scroll vertically */
            lg:grid lg:grid-cols-4 lg:gap-0 lg:overflow-y-auto lg:overflow-x-hidden
            lg:px-[2%] /* padding-inline: clamp(min, preferred %, max) */
            /* height matches hero */
            h-[calc(75vh-4rem)]
            
          "
        >
          {current.images.map((img, idx) => (
            <div
              key={idx}
              className="
                /* MOBILE: fixed thumb size so you scroll through them */
                flex-shrink-0 w-32 h-32
                /* DESKTOP: let the grid set aspect ratio */
                lg:aspect-[4/5] lg:relative
                overflow-hidden
              "
            >
              <Image
                src={`/lookbook/collection-${current.id}/${img}`}
                alt={`Collection ${current.id} image ${idx}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
