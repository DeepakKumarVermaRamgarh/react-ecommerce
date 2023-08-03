// Import required dependencies and components
import {
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import {
  MdAddCircle,
  MdAddShoppingCart,
  MdArrowBack,
  MdRemoveCircle,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  STATUS,
  getSingleProduct,
  productSelector,
} from '../redux/productSlice';
import { addIntoCart, cartSelector, removeFromCart } from '../redux/cartSlice';
import { Loader } from '../components/Loader';

// Define the ProductDetails component
export const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [isInCart, setIsInCart] = useState(false);

  // Get product details and status from the Redux store using selectors
  const { product, status } = useSelector(productSelector);
  // Get cart items from the Redux store using a selector
  const cartItems = useSelector(cartSelector);

  // Function to handle adding a product to the cart
  const addCartHandler = productId => {
    dispatch(addIntoCart(productId));
    setIsInCart(true);
  };

  // Function to handle removing a product from the cart
  const removeCartHandler = productId => {
    dispatch(removeFromCart(productId));
    setIsInCart(false);
  };

  // Effect to check if the product is already in the cart and fetch product details
  useEffect(() => {
    const hasCart = cartItems.includes(productId);
    if (hasCart) setIsInCart(true);
    dispatch(getSingleProduct(productId));
  }, []);

  return status === STATUS.LOADING ? (
    <Loader />
  ) : (
    <Stack
      direction={['column', 'column', 'row']}
      spacing={8}
      bg={'white'}
      overflow={'hidden'}
      p={[2, 4, 8]}
      position={'relative'}
    >
      {/* IconButton to go back */}
      <IconButton
        icon={<MdArrowBack />}
        position={'absolute'}
        borderRadius={'50%'}
        onClick={() => navigate(-1)}
      />
      {/* Display the product image */}
      <Image boxSize={['sm', 'md', 'lg']} src={product?.image} />
      <VStack alignItems={'flex-start'} spacing={6}>
        <Heading as="h1" size={['sm', 'md', 'lg']}>
          {' '}
          {product?.title}{' '}
        </Heading>
        <Heading as="h3" size={['sm', 'sm', 'md']}>
          {' '}
          {product?.price}{' '}
        </Heading>
        <ReactStars count={5} value={product?.rating?.rate} size={24} />

        <HStack fontSize={26}>
          <Center gap={4}>
            <MdRemoveCircle cursor={'pointer'} />
            <Text as={'span'}>1</Text>
            <MdAddCircle cursor={'pointer'} />
          </Center>
        </HStack>

        {isInCart ? (
          <Button
            leftIcon={<MdRemoveShoppingCart />}
            colorScheme="red"
            onClick={() => removeCartHandler(productId)}
          >
            Remove From Cart
          </Button>
        ) : (
          <Button
            rightIcon={<MdAddShoppingCart />}
            colorScheme="yellow"
            onClick={() => addCartHandler(productId)}
          >
            Add To Cart
          </Button>
        )}

        <Text textAlign={'justify'}> {product?.desc} </Text>
      </VStack>
    </Stack>
  );
};
