// Import required dependencies and components
import { ChakraProvider, theme, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AllProducts } from './pages/AllProducts';
import { AddProduct } from './pages/AddProduct';
import { ProductDetails } from './pages/ProductDetails';
import { CartPage } from './pages/CartPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './redux/productSlice';
import {
  clearNotification,
  notificationSelector,
} from './redux/notificationSlice';
import { HomePage } from './pages/HomePage';

function App() {
  const dispatch = useDispatch();
  const toast = useToast();

  // Get notification details from the Redux store using the selector
  const { messageBody, messageTitle, type } = useSelector(notificationSelector);

  // Show a toast notification when there's a new message in the Redux store
  if (messageBody) {
    toast({
      title: messageTitle,
      description: messageBody,
      status: type,
      isClosable: true,
    });

    // Clear the notification after 2 seconds (2000 milliseconds)
    setTimeout(() => {
      dispatch(clearNotification());
    }, 2000);
  }

  // Fetch products data when the component mounts using the Redux action
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    // Wrap the entire application with ChakraProvider and provide the theme
    <ChakraProvider theme={theme}>
      {/* Set up routing with BrowserRouter and nested routes with Routes */}
      <BrowserRouter>
        {/* Render the Navbar component at the top of the application */}
        <Navbar />
        <Routes>
          {/* Define different routes and their corresponding components */}
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/add_product" element={<AddProduct />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route
            exact
            path="/product/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
