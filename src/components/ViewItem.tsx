import { useCartStore } from "@/store/useCounterStore";
import { Icon } from "lucide-react";
import { useState } from "react";
import EditItem from "./EditItem";

export default function ViewItem() {
  const items = useCartStore((state) => state.items);
  const deleteItem = useCartStore((state) => state.deleteItem);
  const addToCart = useCartStore((state) => state.addToCart);

  const [editingItem, setEditingItem] = useState(null);
  if (items.length === 0) {
    return (
      <p className="text-slate-400 mt-4 text-center">No items created yet...</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-slate-50 p-4">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No Image
              </div>
            )}

            <button
              onClick={() => deleteItem(item.id)}
              className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              title="Delete Item"
            >
              <span className="text-xs font-bold">✕</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                {item.type}
              </p>
              <p className="text-lg font-bold text-slate-900">${item.price}</p>
            </div>

            <h2 className="mb-2 text-xl font-bold text-slate-800 line-clamp-1">
              {item.name}
            </h2>

            <p className="mb-4 text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {item.details}
            </p>
            <div className="mt-auto flex gap-2">
              <button
                onClick={() => addToCart(item)}
                className="flex-2 rounded-lg bg-[#0f172a] py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.95] flex items-center justify-center gap-2"
              >
                <span>Add to Cart</span>
              </button>

              <button
                  onClick={() => setEditingItem(item)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.95]"
                >
                  Edit
                </button>
            </div>
          </div>
        </div>
      ))}
      {editingItem && (
        <EditItem
          item={editingItem}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  );
}
