import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartOverview() {
  const totalCartQunatity = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0),
  );
  const totalPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0),
  );

  if (!totalCartQunatity) return;

  return (
    <div className="flex items-center justify-between bg-stone-900 px-4 py-4 text-sm uppercase text-stone-200">
      <p className="space-x-4 font-bold text-stone-300">
        <span>{totalCartQunatity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
