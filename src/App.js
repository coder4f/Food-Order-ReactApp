import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';

const App = () => {
  const cartIsShown = useSelector((state) => state.cart.showCart);
  return (
    <Fragment>
      {cartIsShown && <Cart />}
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default App;
