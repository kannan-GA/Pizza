import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseQuantity, increaseQuantity } from './cartSlice';

function UpdateQunitity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleIncrease() {
    dispatch(increaseQuantity(pizzaId));
  }

  function handleDecrease() {
    dispatch(decreaseQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={handleIncrease}>
        +
      </Button>
      <span className="text-xs font-semibold">{currentQuantity}</span>
      <Button type="round" onClick={handleDecrease}>
        -
      </Button>
    </div>
  );
}

export default UpdateQunitity;
