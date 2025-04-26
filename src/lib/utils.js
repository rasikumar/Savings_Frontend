import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Clock, CheckCircle } from "lucide-react";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const statusOptions = [
  {
    label: "Pending",
    value: "pending",
    icon: Clock,
  },
  {
    label: "Paid",
    value: "paid",
    icon: CheckCircle,
  },
];
