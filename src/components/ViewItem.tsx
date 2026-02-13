
export default function ViewItem({ items }: { items: any[] }) {

  if (items.length === 0) {
    return <p className="text-slate-400 mt-4">No items created yet...</p>;
  }
  return (
    <div className="space-y-4">
      {items.map((item, key) => ( // Added parentheses and arrow
        <div key={key} className="mt-8 p-4 border rounded-lg bg-slate-50">
          <h2 className="text-xl font-bold">{item.name}</h2>
          <p className="text-sm text-blue-600 font-medium">{item.type}</p>

          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md my-2"
            />
          )}

          <p className="text-lg font-semibold">${item.price}</p>
          <p className="text-gray-600 text-sm mt-2">{item.details}</p>
        </div>
      ))}
    </div>

  );
}
