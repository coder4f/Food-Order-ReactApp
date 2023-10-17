import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';

const MealItem = ({ meal }) => {
  const dispatch = useDispatch();

  const mealPrice = `$${meal.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    dispatch(
      cartActions.addItem({
        id: meal.id,
        name: meal.name,
        amount: amount,
        price: meal.price,
      })
    );
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{mealPrice}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
