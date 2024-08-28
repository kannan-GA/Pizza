import { useDispatch } from 'react-redux';
import Button from './Button';
import { deleteToCart } from '../features/cart/cartSlice';

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteToCart(pizzaId));
  }

  return (
    <Button type="base" onClick={handleDelete}>
      Delete Item
    </Button>
  );
}

export default DeleteButton;
