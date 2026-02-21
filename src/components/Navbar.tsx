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
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tight">
          InventoryApp
        </Link>

        <div className="flex items-center gap-8">
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

          <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
            {user ? (
              <>
                <span className="text-sm text-slate-400">Hi, {user.username}</span>
                <button
                  onClick={logout}
                  className="bg-red-500/10 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-all text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white text-sm">Login</Link>
                <Link to="/register" className="bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                  Register
                </Link>
              </>
            )}

            <Link to="/cart" className="relative group transition-transform active:scale-95 ml-2">
              <svg /* ... SVG paths remain same ... */ />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-slate-900">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
