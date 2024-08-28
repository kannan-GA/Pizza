import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  console.log(isLoadingIngredients);
  console.log(ingredients);
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-2 py-3">
      <div className="flex items-center justify-between">
        <p className="space-y-4">
          <span className="font-bold">{quantity}&times;</span> {name}
          <p className="text-xs">
            {isLoadingIngredients ? 'Loading....' : ingredients.join(', ')}{' '}
          </p>
        </p>
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
