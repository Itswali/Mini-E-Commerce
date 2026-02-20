import { useCartStore } from "@/store/useCounterStore";
import { useState } from "react";

interface EditItemProps {
  item: any;
  onClose: () => void;
}

export default function EditItem({ item, onClose }: EditItemProps) {
  const EditItem = useCartStore((state) => state.editItem);
  const [formData, setFormData] = useState({
    name: item?.name || "",
    type: item?.type || "",
    image: item?.image || "",
    price: item?.price || 0,
    details: item?.details || "",
  });

  const handleEditItem = async (e) => {
    e.preventDefault();
    await EditItem(item.id, formData);
    onClose();
  };
  const inputStyles =
    "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelStyles =
    "flex flex-col gap-1 text-sm font-semibold text-slate-700 mb-4";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Edit {item.name}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleEditItem}>
          <label className={labelStyles}>
            Name
            <input
              type="text"
              className={inputStyles}
              name="name"
              placeholder="e.g. Vintage Camera"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
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
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </label>

          <label className={labelStyles}>
            Price
            <input
              type="number"
              className={inputStyles}
              name="price"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </label>

          <label className={labelStyles}>
            Details
            <textarea
              className={`${inputStyles} min-h-25 resize-none`}
              name="details"
              placeholder="Tell us more about this item..."
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </label>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2 border rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
