import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { sendCartOrder } from '../../store/cart-actions';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import styles from './Cart.module.css';

const Cart = () => {
  const [isCheckout, setIsCheckout] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const totalAmount = `$${cart.totalAmount.toFixed(2)}`;
  const hasItems = cart.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItem({ id }));
  };

  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItem({ ...item, amount: 1 }));
  };

  const hideCartHandler = () => {
    dispatch(cartActions.hideCart());
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    dispatch(sendCartOrder(cart.items, userData));
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cart.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={hideCartHandler}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={hideCartHandler}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={hideCartHandler} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
