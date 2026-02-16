import { useCartStore } from "@/store/useCounterStore";

export default function CartItem() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addCartItem = useCartStore((state) => state.addToCart);


  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-500">
        <p className="text-xl font-medium">Your cart is empty</p>
        <p className="text-sm">Add some items from the inventory to see them here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Items List */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold mb-6 text-slate-900">Your Cart ({cart.length})</h1>
        {cart.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-4 p-4 border rounded-xl bg-white shadow-sm border-slate-200">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-md bg-slate-50" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{item.name}</h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider">{item.type}</p>
              <p className="text-blue-600 font-bold mt-1">${item.price}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">quantity * {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Remove from cart"
            >
              <span className="text-lg">-</span>
            </button>
            <button
              onClick={() => addCartItem(item)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Remove from cart"
            >
              <span className="text-lg">+</span>
            </button>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-80 h-fit p-6 bg-slate-900 rounded-2xl text-white shadow-xl">
        <h2 className="text-lg font-bold mb-4 border-b border-slate-700 pb-4">Order Summary</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Subtotal ({cart.length} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 text-sm">
            <span>Shipping</span>
            <span className="text-green-400 font-medium">Free</span>
          </div>
          <div className="border-t border-slate-700 pt-3 flex justify-between font-bold text-xl">
            <span>Total</span>
            <span className="text-blue-400">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all active:scale-95">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
