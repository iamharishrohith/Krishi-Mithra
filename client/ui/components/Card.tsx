import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  tone?: "green" | "yellow" | "brown" | "neutral";
  onClick?: () => void;
}

const toneClasses: Record<NonNullable<CardProps["tone"]>, string> = {
  green:
    "bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900 border-emerald-200",
  yellow:
    "bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900 border-amber-200",
  brown:
    "bg-gradient-to-br from-stone-50 to-stone-100 text-stone-900 border-stone-200",
  neutral:
    "bg-gradient-to-br from-white to-gray-50 text-gray-900 border-gray-200",
};

const Card: React.FC<CardProps> = ({ title, subtitle, icon, onClick, tone = "neutral" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-xl border p-4 shadow-sm active:scale-[0.99] transition ${toneClasses[tone]}`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="shrink-0 p-2 rounded-lg bg-white/70 text-inherit">{icon}</div>}
        <div>
          <div className="font-semibold text-base leading-tight">{title}</div>
          {subtitle && <div className="text-sm opacity-80 mt-0.5">{subtitle}</div>}
        </div>
      </div>
    </button>
  );
};

export default Card;
