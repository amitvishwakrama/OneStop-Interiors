import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Match 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10);
}

export function createWhatsAppUrl(phone: string, text: string): string {
  const cleaned = phone.replace(/\D/g, '');
  const target = cleaned.startsWith('91') ? cleaned : `91${cleaned.slice(-10)}`;
  return `https://wa.me/${target}?text=${encodeURIComponent(text)}`;
}

export function formatDate(dateString: string | Date): string {
  const d = new Date(dateString);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

