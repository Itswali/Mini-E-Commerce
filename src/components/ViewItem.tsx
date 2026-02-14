import { useCartStore } from "@/store/useCounterStore";


export default function ViewItem() {
  const items = useCartStore((state) => state.items)
  const deleteItem = useCartStore((state) => state.deleteItem)
  if (items.length === 0) {
    return <p className="text-slate-400 mt-4">No items created yet...</p>;
  }
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {items.map((item) => (
    <div
      key={item.id}
      className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {item.type}
          </p>
          <p className="text-lg font-bold text-slate-900">${item.price}</p>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-slate-800 line-clamp-1">
          {item.name}
        </h2>

        <p className="text-sm text-slate-600 line-clamp-2">
          {item.details}
        </p>

        <button onClick={() => deleteItem(item.id)} className="mt-4 w-1/6 rounded-lg bg-slate-900 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors">X        </button>
      </div>
    </div>
  ))}
</div>

  );
}
