import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { deleteToCart } from './cartSlice';
import DeleteButton from '../../ui/DeleteButton';
import UpdateQunitity from './UpdateQunitity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(
    (state) =>
      state.cart.cart.find((item) => item.pizzaId === pizzaId)?.quantity ?? 0,
  );

  return (
    <li className="items-center justify-between px-4 py-2 md:flex">
      <p className="font-semibold">
        {quantity}&times; <span>{name}</span>
      </p>
      <div className="flex items-center justify-between gap-7">
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateQunitity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteButton pizaaId={pizzaId}></DeleteButton>
      </div>
    </li>
  );
}

export default CartItem;
