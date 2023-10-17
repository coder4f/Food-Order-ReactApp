import { Fragment } from 'react';
import { cartActions } from '../../store/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCartButton from './HeaderCartButton';
import Notification from '../UI/Notification';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.notification);

  const showCartHandler = () => {
    dispatch(cartActions.showCart());
  };

  return (
    <Fragment>
      {status && <Notification {...status} />}
      <header className={`${styles.header} ${status && styles.status}`}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={showCartHandler} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food' />
      </div>
    </Fragment>
  );
};

export default Header;
