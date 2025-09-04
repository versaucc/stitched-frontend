'use client';

import { useEffect, useState } from 'react';
import MinimalNavbar from "../../components/navbar/MinimalNavbar"

export default function LocalPage() {
  const [images, setImages] = useState<string[]>([]);

  // Example: populate images from public/local folder
  useEffect(() => {
    // In practice, Next.js cannot read file system on the client.
    // If you have a fixed list of images, hardcode them here.
    const imgArray = [
      'local/img1.jpeg',
      'local/img2.jpeg',
      '/local/img3.jpeg',
      'local/img4.jpeg',
    ];
    setImages(imgArray);
  }, []);

  const storeHours = [
    '10am - 10pm', // Weekdays
    '10am - 10pm', // Weekends
  ];

  const days = ['Weekends','Weekdays'];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 flex justify-center"> 
    <MinimalNavbar></MinimalNavbar>
      <div className="flex flex-col lg:flex-row lg:w-[60%] gap-8 mt-16">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-4">Stitched x Wonderful World Salem</h1>
          <p className="text-lg">285 Liberty St. Suite 145, Salem, OR 97301</p>
          <p className="text-lg">Phone: (503) 302-7777</p>

        {/* Store Hours */}
        <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Hours</h2>
        <div className="flex flex-col gap-1">
            {days.map((day, i) => (
            <div key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{storeHours[i]}</span>
            </div>
            ))}
        </div>
        </div>


          <p className="mt-6">
            Grand opening September 6. Fashion for everyone. Bring the whole family! 
          </p>
        </div>

        {/* Right Column - Picture Grid */}
        <div className="flex-1 grid grid-cols-2 gap-2">
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Local store ${idx + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
