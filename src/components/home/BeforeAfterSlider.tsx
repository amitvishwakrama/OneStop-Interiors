'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeftRight, Sparkles } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
  location: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Renovation',
  afterLabel = 'After OneStop Transformation',
  title,
  location,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-cream-300 shadow-warm-lg">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-gold-600" />
            Before vs After Transformation
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-charcoal-900">
            {title}
          </h3>
          <p className="text-xs text-charcoal-500 font-medium">{location}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-charcoal-600 bg-cream-100 px-3 py-1.5 rounded-xl border border-cream-200">
          <ArrowLeftRight className="w-4 h-4 text-gold-600" />
          <span>Drag slider to compare</span>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden select-none border border-cream-300 before-after-slider">
        {/* After Image (Full width background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="After Renovation - OneStop Interiors"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4 bg-wood-900/85 backdrop-blur-sm text-gold-300 text-xs font-bold px-3 py-1.5 rounded-lg shadow-warm-sm border border-gold-500/30">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: '100vw', maxWidth: '100%' }}>
            <Image
              src={beforeImage}
              alt="Before Renovation"
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>
          <div className="absolute top-4 left-4 bg-charcoal-950/85 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-warm-sm">
            {beforeLabel}
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Thumb button icon */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold-600 border-2 border-white text-white flex items-center justify-center shadow-warm-md">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
        </div>

        {/* Invisible Range Input Slider for touch & mouse */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          aria-label="Before and after comparison slider"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        />
      </div>
    </div>
  );
}

