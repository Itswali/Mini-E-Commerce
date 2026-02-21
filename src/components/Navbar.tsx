import { useCartStore } from '@/store/useCounterStore';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const setItems = useCartStore((state) => state.setItems);
  const cart = useCartStore((state) => state.cart);
  const user = useCartStore((state) => state.user);
  const logout = useCartStore((state) => state.logout);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/items");
        const data = await response.json();
        const formattedData = data.map((item: any) => ({ ...item, id: item._id }));
        setItems(formattedData);
      } catch (err) {
        console.error("Failed to fetch items", err);
      }
    };
    loadData();
  }, [setItems]);

  const navItems = [
    { name: 'View Items', path: '/view' },
    ...(user ? [{ name: 'Create Item', path: '/create' }] : []),
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          InventoryApp
        </Link>

        <div className="flex items-center gap-6">
          {/* Main Navigation */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 hover:text-blue-400 ${
                    isActive ? 'text-blue-400 border-b-2 border-blue-400 pb-1' : 'text-slate-400'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          {/* Auth and Cart Section */}
          <div className="flex items-center gap-5 border-l border-slate-700 pl-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Authenticated</span>
                  <span className="text-sm font-medium text-slate-200">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-4 py-2 rounded-md shadow-md shadow-blue-900/20 transition-all active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-slate-800 transition-colors group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
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
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-blue-500 text-[10px] font-black text-white w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 animate-in zoom-in">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
