import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../Checkout-Page/CartContext";

const CheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-image: url("https://images.unsplash.com/photo-1730780883153-b3c046b001c1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

const CartItemsBox = styled.div`
  width: 60%;
  height: 400px;
  background-color: #f1f1f1;
  padding: 10px;
  overflow-y: scroll;
`;

const CartItem = styled.div`
  background: white;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
`;

const QtyControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
`;

const QtyButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: #800080;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: rgb(83, 0, 83);
  }
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`;

const TotalBox = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  height: 150px;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CheckoutButton = styled.button`
  padding: 10px;
  background-color: #800080;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgb(83, 0, 83);
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, incrementItem, decrementItem, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert('Order placed successfully!');
    clearCart();
    navigate('/home');
  };

  return (
    <CheckoutContainer>
      <CartItemsBox>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <CartItem key={index}>
              <strong>{item.name}</strong> - ${item.price.toFixed(2)} each
              <QtyControls>
                <QtyButton onClick={() => decrementItem(item.name)}>-</QtyButton>
                <span>{item.quantity}</span>
                <QtyButton onClick={() => incrementItem(item.name)}>+</QtyButton>
              </QtyControls>
              <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </CartItem>
          ))
        )}
      </CartItemsBox>

      <RightSide>
        <TotalBox>
          <h3>Total</h3>
          <p>${total.toFixed(2)}</p>
        </TotalBox>

        <ButtonBox>
          <CheckoutButton onClick={handleCheckout}>Confirm Order</CheckoutButton>
          <CheckoutButton onClick={() => navigate('/menu')}>Back to Menu</CheckoutButton>
        </ButtonBox>
      </RightSide>
    </CheckoutContainer>
  );
};

export default Checkout;

