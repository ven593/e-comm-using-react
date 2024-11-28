import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = (token) => {
    console.log("Stripe Token:", token);
    alert("Payment Successful!");
    clearCart();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);       

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
      {cart.length > 0 && (
        <>
          <h2>Total: ${total.toFixed(2)}</h2>
          <StripeCheckout
            stripeKey="rk_test_51QPdM8KXqsv7csGwMxG3NFShSture2Cs6gVCocFioBKFS72OJFUgQNrxQGe1GCxtnHmIQ3DD3IvVEpehc1dPKjQV00A1xvP3XL"
            token={handleCheckout}
            amount={total * 100}
            name="E-Commerce Checkout"
            currency="USD"
          >
            <button>Checkout</button>
          </StripeCheckout>
        </>
      )}
    </div>
  );
};

export default Cart;