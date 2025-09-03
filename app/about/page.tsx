'use client';

import MinimalNavbar from '../../components/navbar/MinimalNavbar';

const photoPairs = [
  ['/about/noah-shop.jpg', '/about/sam-shop.jpg'],
  ['/about/noah-sam-dark.jpg', '/about/sam-dark.jpg'],
  ['/about/sam-osu.jpg', '/about/benny.jpg'],
  ['/about/foz.jpg', '/about/bims.jpg'],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MinimalNavbar />

      <div className="pt-32 flex flex-col items-center">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">About Stitched</h1>

        {/* Paragraph */}
        <div className="mt-2 max-w-2xl px-6 text-center">
          <p className="mb-6 text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            blandit felis eget tellus dictum, ut aliquam nibh gravida. Duis sed
            orci ut sapien viverra ultrices. Suspendisse potenti. Cras ac arcu
            in magna iaculis porttitor. Donec sagittis, eros ac malesuada
            elementum, ligula sem egestas velit, sed hendrerit sapien ligula nec
            justo. Ut in urna vitae leo feugiat ultricies.
          </p>
          <p className="font-semibold">- from Sam and Noah</p>
        </div>

        {/* Image Grid */}
        <div
          className="
            mt-10
            grid grid-cols-2 gap-2
            w-[90%] lg:w-[50%]
            h-[40vh]
          "
        >
          {photoPairs.map((pair, i) => (
            pair.map((src, j) => (
              <img
                key={`${i}-${j}`}
                src={src}
                alt={`Stitched About Image ${i}-${j}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
}
