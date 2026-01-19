import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

// 合并类名并解决 Tailwind 冲突，确保外部传入的 className 可以覆盖默认样式
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

