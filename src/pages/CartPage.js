// Import required dependencies and components
import { Button, HStack, Heading } from '@chakra-ui/react';
import { ProductList } from '../components/ProductList';
import { CartProduct } from '../components/CartProduct';
import { product } from '../components/data';
import { MdPayment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector } from '../redux/cartSlice';
import { productSelector } from '../redux/productSlice';
import { useEffect, useState } from 'react';

// Define the CartPage component
export const CartPage = () => {
  // Get the cart items from the Redux store using a selector
  const cartItems = useSelector(cartSelector);
  // Get the products from the Redux store using a selector
  const { products } = useSelector(productSelector);

  // Filter the products based on the cart items to get the cartProducts
  const cartProducts = products.filter(product =>
    cartItems.includes(product.id)
  );

  // Calculate the total value of all products in the cart
  const totalCartValue = cartProducts.reduce(
    (totalPrice, product) => totalPrice + product.price,
    0
  );

  return (
    <ProductList>
      <HStack justifyContent={'space-between'} w={'full'} alignItems={'center'}>
        <Heading as="h3" size={'md'} color={'green.500'} mb="4">
          Total Cart Price : $ {totalCartValue}/-
        </Heading>
        <Button rightIcon={<MdPayment />} colorScheme="yellow">
          Checkout
        </Button>
      </HStack>
      <HStack flexWrap={'wrap'} spacing={8} justifyContent={'center'}>
        {/* Check if there are cart items and map through the cartProducts */}
        {cartItems?.length > 0 &&
          cartProducts?.map(product => (
            <CartProduct key={product.id} product={product} />
          ))}
      </HStack>
    </ProductList>
  );
};
