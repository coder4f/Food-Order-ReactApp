import { useEffect, useState } from 'react';
import Card from '../UI/Card.js';
import MealItem from './MealItem/MealItem.js';

import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          'https://food-order-d6c84-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
        );

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => <MealItem key={meal.id} meal={meal} />);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (meals.length === 0) {
    return (
      <p style={{ textAlign: 'center' }}>
        {error} Couldn't load any meals... Please reload page again or try again
        later!
      </p>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
