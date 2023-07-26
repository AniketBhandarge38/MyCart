import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { removeFromCart } from "../features/cartSlice";
import { store } from "../store";
export default function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  function handleDecrement(item) {
    dispatch(removeFromCart(item));
  }

  function handleIncrement() {}

  const cartItemsElement = (
    <div className="cart">
      <h2>Cart</h2>
      <span></span>
      {cartItems.map((item) => {
        return (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail} />
            <p>{item.title}</p>
            <button onClick={handleIncrement}>+</button>
            <span>1</span>
            <button onClick={() => handleDecrement(item)}>-</button>
          </div>
        );
      })}

      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
    </div>
  );

  const emptyCartElement = (
    <h3>Your cart is empty. Please add items to cart...</h3>
  );

  const cartSize = cartItems.length;

  return <>{cartSize > 0 ? cartItemsElement : emptyCartElement}</>;
}
