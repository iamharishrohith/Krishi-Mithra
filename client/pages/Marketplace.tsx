import React from "react";

const items = [
  { title: "Tomato", price: 22, unit: "kg", seller: "Anand", img: "https://images.unsplash.com/photo-1546470427-495c8e6c1f4a?w=400&q=60" },
  { title: "Banana (Nendra)", price: 38, unit: "kg", seller: "Mini", img: "https://images.unsplash.com/photo-1603833665858-e61d17a8b1a4?w=400&q=60" },
  { title: "Coconut", price: 32, unit: "pc", seller: "Rajan", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400&q=60" },
];

const Marketplace: React.FC = () => {
  return (
    <div className="space-y-3">
      <button className="w-full rounded-xl bg-emerald-600 text-white py-2 font-semibold">Sell Now</button>
      {items.map((it, i) => (
        <div key={i} className="flex gap-3 rounded-xl border bg-white p-3">
          <img src={it.img} alt={it.title} className="h-16 w-16 rounded-lg object-cover" />
          <div className="flex-1">
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-gray-600">by {it.seller}</div>
          </div>
          <div className="text-right">
            <div className="font-bold">₹{it.price}/{it.unit}</div>
            <button className="mt-1 text-emerald-700 text-sm">Contact</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;
