import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addToCart, deleteToCart } from '../cart/cartSlice';
import DeleteButton from '../../ui/DeleteButton';
import UpdateQunitity from '../cart/UpdateQunitity';

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleCart(e) {
    e.preventDefault();

    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };

    dispatch(addToCart(newItem));
  }

  const currentQuantity = useSelector(
    (state) =>
      state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );

  const count = currentQuantity > 0;
  return (
    <li className="flex gap-4 py-4">
      <img
        className={`h-24 ${soldOut ? 'opacity-75 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="font-sm capitalize italic text-stone-800">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase opacity-75 grayscale">
              Sold out
            </p>
          )}
          {count && (
            <div className="flex items-center gap-3">
              <UpdateQunitity pizzaId={id} currentQuantity={currentQuantity} />
              <DeleteButton pizzaId={id} />
            </div>
          )}
          {!soldOut && !count && (
            <Button type="base" onClick={handleCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
