import { useCartStore } from "@/store/useCounterStore";

export default function ViewItem() {
  const items = useCartStore((state) => state.items);
  const deleteItem = useCartStore((state) => state.deleteItem);

  if (items.length === 0) {
    return <p className="text-slate-400 mt-4 text-center">No items created yet...</p>;
  }

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
            /* object-contain ensures the whole pic is visible, not zoomed */
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

        <button className="mt-auto w-full rounded-lg bg-[#0f172a] py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98]">
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>
  );
}
