interface EditItemProps {
  item: any;
  onClose: () => void;
}

export default function EditItem({ item, onClose }: EditItemProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">Edit {item.name}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {/* <p className="text-slate-600 mb-6">Updating item ID: {item.id}</p> */}

        <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2 border rounded-md">Cancel</button>
            <button className="flex-1 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
