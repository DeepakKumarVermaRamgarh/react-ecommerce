// Import required dependencies and components
import {
  Image,
  VStack,
  Text,
  Heading,
  HStack,
  Button,
  Center,
  Box,
} from '@chakra-ui/react';
import {
  MdAddCircle,
  MdRemoveCircle,
  MdRemoveShoppingCart,
} from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

// Define the CartProduct component
export const CartProduct = ({ product }) => {
  // Destructure product details
  const { image, title, price, description, id } = product;

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Function to handle removing a product from the cart
  const removeCartHandler = productId => {
    dispatch(removeFromCart(productId));
  };

  return (
    <VStack
      p={4}
      bg={'white'}
      borderRadius={6}
      maxW={['full', 'full', '250px']}
      h={'500px'}
      justifyContent={'space-between'}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="cetner"
        maxH={'250px'}
        overflow={'hidden'}
      >
        <Image
          boxSize={'250px'}
          objectFit={'contain'}
          objectPosition={'center'}
          mixBlendMode={'darken'}
          src={image}
        />
      </Box>
      <VStack alignItems={'flex-start'}>
        <Heading as="h1" size={'md'}>
          {' '}
          {title}{' '}
        </Heading>
        <Heading as="h3" size={'sm'}>
          {' '}
          {price}{' '}
        </Heading>

        <HStack fontSize={16}>
          <Center gap={4}>
            <MdRemoveCircle cursor={'pointer'} />
            <Text as={'span'}>1</Text>
            <MdAddCircle cursor={'pointer'} />
          </Center>
        </HStack>

        <Text noOfLines={2}>{description}</Text>

        <Button
          size={['sm', 'md']}
          leftIcon={<MdRemoveShoppingCart />}
          colorScheme="red"
          w="full"
          onClick={() => removeCartHandler(id)}
        >
          Remove From Cart
        </Button>
      </VStack>
    </VStack>
  );
};
