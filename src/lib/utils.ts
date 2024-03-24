import { env } from "@/env"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAbsoluteUrl(url: string) {
  return new URL(url, env.NEXT_PUBLIC_SITE_URL).toString()
}
