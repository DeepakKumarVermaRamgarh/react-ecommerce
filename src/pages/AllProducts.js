// Import required dependencies and components
import { Button, HStack, IconButton } from '@chakra-ui/react';
import { Product } from '../components/Product';
import { ProductList } from '../components/ProductList';
import { MdArrowDropDownCircle, MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS, productSelector } from '../redux/productSlice';
import { cartSelector } from '../redux/cartSlice';
import { Loader } from '../components/Loader';
import { useState } from 'react';

// Define the AllProducts component
export const AllProducts = () => {
  const dispatch = useDispatch();

  // Get products and status from the Redux store using selectors
  const { products, status } = useSelector(productSelector);

  // Get cart items from the Redux store using a selector
  const cartItems = useSelector(cartSelector);

  // Use state to handle filtered and sorted products
  const [filterProducts, setFilterProducts] = useState(products);
  const [isSorted, setIsSorted] = useState(false);

  // Function to sort products by price in ascending order
  const sortByPriceHancler = () => {
    const newProductsArr = [...filterProducts];
    newProductsArr.sort((a, b) => a.price - b.price);
    setIsSorted(true);
    setFilterProducts(newProductsArr);
  };

  // Function to cancel the sorting by price and revert to the original order

  const cancelSortByPriceHandler = () => {
    setIsSorted(false);
    setFilterProducts(products);
  };

  // Render the product list or a loader depending on the status
  return status === STATUS.LOADING ? (
    <Loader />
  ) : (
    <ProductList>
      <HStack justifyContent={'flex-end'} w="full">
        {/* Button to sort products by price */}
        <Button
          colorScheme="blue"
          rightIcon={<MdArrowDropDownCircle />}
          onClick={sortByPriceHancler}
        >
          Sort By Price
        </Button>

        {/* Render the cancel sort button when products are sorted */}
        {isSorted && (
          <IconButton
            icon={<MdCancel />}
            colorScheme="red"
            onClick={cancelSortByPriceHandler}
          />
        )}
      </HStack>

      {/* Render products if there are any */}
      {filterProducts.length > 0 &&
        filterProducts.map(product => {
          const isInCart = cartItems.includes(product.id);
          return (
            <Product key={product.id} product={product} inCart={isInCart} />
          );
        })}
    </ProductList>
  );
};
