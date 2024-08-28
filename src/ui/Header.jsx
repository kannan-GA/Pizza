import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import User from '../features/user/User';
import { useSelector } from 'react-redux';

function Header() {
  return (
    <header className="flex items-center justify-between border-b-4 border-yellow-500 bg-yellow-400 px-4 py-4 uppercase">
      <Link className="text-xs uppercase tracking-widest" to="/">
        Fast React Pizza.co
      </Link>
      <SearchOrder />
      <User />
    </header>
  );
}

export default Header;
