import { useEffect, useState } from 'react';
import {
  Form,
  json,
  redirect,
  redirectDocument,
  useActionData,
  useFetcher,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';
import { clearCart } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalCartPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0),
  );
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isAddressLoading = addressStatus === 'loading';

  const formDataError = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="px-4 py-3">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST" action="">
        <div className="mb-5 flex flex-col gap-3 sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formDataError?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {' '}
                {formDataError.phone}{' '}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-3 sm:flex sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isAddressLoading}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-600">
                {' '}
                {errorAddress}{' '}
              </p>
            )}

            {!position.latitude && !position.longtitude && (
              <span className="absolute right-0 top-0">
                <Button
                  type="base"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={isAddressLoading}
                >
                  Get Position
                </Button>
              </span>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longtitude
                ? `${position.latitude},${position.longtitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? 'Placing a order'
              : `Order now From ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  console.log(request, params);

  const formDate = await request.formData();

  const data = Object.fromEntries(formDate);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log(order);

  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone = 'Please gives us valid phone number';

  console.log(Object.keys(errors));

  if (Object.keys(errors).length > 0) return errors;

  const orderID = await createOrder(order);

  store.dispatch(clearCart());

  console.log(order);

  return redirect(`/order/${orderID.id}`);
}

export default CreateOrder;
