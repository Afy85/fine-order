/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import React from 'react';
import { cn } from '@/utils/cn';

// Using a slightly more specific interface than standard HTML attributes
// to enforce handling of src possibly being null/undefined
interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string | null;
  className?: string;
  alt?: string;
  fill?: boolean; // For compatibility with next/image usage in styles if needed, though we use native img
  priority?: boolean; // For compatibility props
}

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400';

export default function SafeImage({ 
  src, 
  alt = '', 
  className = '', 
  fill, // Destructure to avoid passing to img tag if not supported directly, or handle style mapping
  priority: _priority, // Destructure to avoid passing non-DOM prop
  style,
  ...props 
}: SafeImageProps) {
  
  // Strict check for valid src
  const isValidSrc = src && typeof src === 'string' && src.trim().length > 0;
  const finalSrc = isValidSrc ? src : PLACEHOLDER_IMAGE;
  const finalAlt = isValidSrc ? alt : (alt || 'placeholder');

  // 去除内部硬编码的 object-cover，仅保留定位与尺寸，展示模式交由 className 控制
  const fillStyle: React.CSSProperties = fill ? {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    color: 'transparent',
  } : {};

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={finalSrc || PLACEHOLDER_IMAGE}
      alt={finalAlt}
      className={cn('w-full h-full object-cover', className)}
      style={{ ...fillStyle, ...style }}
      {...props}
    />
  );
}
