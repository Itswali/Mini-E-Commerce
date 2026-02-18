import { useState } from "react";
import ViewItem from "./ViewItem";
import { useCartStore } from "@/store/useCounterStore";


export default function CreateItem() {
  const addItem = useCartStore((state) => state.addItem);

  const [item, setItem] = useState({
    name: "",
    type: "",
    image: "",
    price: 0,
    details: "",
  });

  const inputStyles =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelStyles =
    "flex flex-col gap-1 text-sm font-semibold text-slate-700 mb-4";

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked!");

    try {
      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const savedItem = await response.json();

        // Now update your local Zustand store with the actual DB object
        addItem(savedItem);

        // Clear the form
        setItem({ name: "", type: "", image: "", price: 0, details: "" });
        alert("Item saved to database!");
      } else {
        alert("Failed to save item.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <label className={labelStyles}>
          Name
          <input
            type="text"
            className={inputStyles}
            name="name"
            placeholder="e.g. Vintage Camera"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            required
          />
        </label>

        <label className={labelStyles}>
          Type
          <input
            type="text"
            className={inputStyles}
            name="type"
            placeholder="e.g. Electronics"
            value={item.type}
            onChange={(e) => setItem({ ...item, type: e.target.value })}
            required
          />
        </label>

        <label className={labelStyles}>
          Image URL
          <input
            type="text"
            className={inputStyles}
            name="image"
            placeholder="https://example.com/image.jpg"
            value={item.image}
            onChange={(e) => setItem({ ...item, image: e.target.value })}
          />
        </label>

        <label className={labelStyles}>
          Price
          <input
            type="number"
            className={inputStyles}
            name="price"
            placeholder="0.00"
            value={item.price}
            onChange={(e) =>
              setItem({ ...item, price: parseFloat(e.target.value) || 0 })
            }
          />
        </label>

        <label className={labelStyles}>
          Details
          <textarea
            className={`${inputStyles} min-h-25 resize-none`}
            name="details"
            placeholder="Tell us more about this item..."
            value={item.details}
            onChange={(e) => setItem({ ...item, details: e.target.value })}
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}
