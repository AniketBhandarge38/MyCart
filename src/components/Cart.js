import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { store } from "../store";
export default function Cart() {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const cartItemsElement = (
    <div className="cart">
      <h2>Cart</h2>
      <span></span>
      {cartItems.map((item) => {
        return (
          <div className="cart-item">
            <img src={item.thumbnail} />
            <p>{item.title}</p>
            <button>+</button>
            <span>1</span>
            <button>-</button>
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
  console.log(cartItems + " Size: " + cartSize);
  return <>{cartSize > 0 ? cartItemsElement : emptyCartElement}</>;
}
