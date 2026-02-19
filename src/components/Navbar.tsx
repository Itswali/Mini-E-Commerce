import { useCartStore } from '@/store/useCounterStore';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const setItems = useCartStore((state) => state.setItems);

useEffect(() => {
  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items");
      const data = await response.json();
      // Map _id to id so your deleteItem function still works!
      const formattedData = data.map((item) => ({ ...item, id: item._id }));
      setItems(formattedData);
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };
  loadData();
}, [setItems]);
  const cart = useCartStore((state) => state.cart);
  const navItems = [
    { name: 'View Items', path: '/view' },
    { name: 'Create Item', path: '/create' },
  ];

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight">
          InventoryApp
        </Link>

        <div className="flex items-center gap-8">
          {/* Navigation Links */}
          <div className="flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors duration-200 hover:text-blue-400 ${
                    isActive ? 'text-blue-500 font-semibold' : 'text-slate-300'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <Link to="/cart" className="relative group transition-transform active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-300 group-hover:text-blue-400 transition-colors"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>

            <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-slate-900">
              {cart.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
