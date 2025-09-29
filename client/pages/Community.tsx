import React from "react";
import { Phone, UserRound } from "lucide-react";

const farmers = [
  { name: "Suresh K", village: "Kottayam", verified: true, distance: "2.1 km" },
  { name: "Mini R", village: "Thrissur", verified: true, distance: "3.4 km" },
  { name: "Rajan P", village: "Aluva", verified: false, distance: "5.0 km" },
];

const Community: React.FC = () => {
  return (
    <div className="space-y-3">
      {farmers.map((f, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border bg-white p-3">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700"><UserRound className="w-6 h-6"/></div>
          <div className="flex-1">
            <div className="font-semibold">{f.name} {f.verified && <span className="text-xs text-emerald-700">• verified</span>}</div>
            <div className="text-xs text-gray-600">{f.village} • {f.distance} away</div>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-sm flex items-center gap-1"><Phone className="w-4 h-4"/> Call</button>
        </div>
      ))}

      <div className="rounded-xl border p-3 text-sm bg-amber-50 border-amber-200">
        Join group discussion: Organic vegetable growers (daily 7 PM)
      </div>
    </div>
  );
};

export default Community;
