import { notificationActions } from './notification-slice';
import { cartActions } from './cart-slice';

export const sendCartOrder = (cartItems, userData) => {
  return async (dispatch) => {
    dispatch(notificationActions.loading());

    try {
      await fetch(
        'https://food-order-d6c84-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartItems,
          }),
        }
      );

      dispatch(
        notificationActions.success({ message: 'Successfully sent order!' })
      );
    } catch (error) {
      dispatch(notificationActions.error({ message: error.message }));
    }
    dispatch(cartActions.clearCart());
    setTimeout(() => {
      dispatch(notificationActions.clear());
    }, 3000);
  };
};

export const updateCart = (items, totalAmount) => {
  return async (dispatch) => {
    dispatch(notificationActions.loading());

    try {
      await fetch(
        'https://food-order-d6c84-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({ items, totalAmount }),
        }
      );

      dispatch(
        notificationActions.success({ message: 'Successfully updated cart!' })
      );
    } catch (error) {
      dispatch(notificationActions.error({ message: error.message }));
    }

    setTimeout(() => {
      dispatch(notificationActions.clear());
    }, 3000);
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    dispatch(notificationActions.loading());

    try {
      const response = await fetch(
        'https://food-order-d6c84-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );

      const responseData = await response.json();

      dispatch(cartActions.updateCart(responseData));
      dispatch(
        notificationActions.success({ message: 'Successfully fetch cart!' })
      );
    } catch (error) {
      dispatch(notificationActions.error({ message: error.message }));
    }

    setTimeout(() => {
      dispatch(notificationActions.clear());
    }, 3000);
  };
};
