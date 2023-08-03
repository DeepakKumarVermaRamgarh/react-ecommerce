// Import required dependencies and components
import {
  Box,
  Image,
  Stack,
  VStack,
  Text,
  Heading,
  HStack,
  IconButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import ReactStars from 'react-stars';
import {
  MdAddShoppingCart,
  MdDelete,
  MdEdit,
  MdRemoveShoppingCart,
  MdSave,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addIntoCart, removeFromCart } from '../redux/cartSlice';
import { useRef, useState } from 'react';
import { deleteProduct, updateProduct } from '../redux/productSlice';

export const Product = ({ product, inCart }) => {
  // Destructure product details
  const { image, title, price, rating, description, id } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [edit, setEdit] = useState(false);

  // refs to store the edited values
  const titleRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const ratingRef = useRef();
  const countRef = useRef();

  // Function to handle adding the product to the cart
  const addCartHandler = id => {
    dispatch(addIntoCart(id));
  };

  // Function to handle removing the product from the cart
  const removeCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  // Function to handle updating the product
  const productDeleteHandler = productId => {
    dispatch(deleteProduct(productId));
    toast({
      title: 'Product',
      description: 'Product Deleted',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const productUpdateHandler = productId => {
    setEdit(false);
    const newData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
      rating: ratingRef.current.value,
      count: countRef.current.value,
    };

    dispatch(updateProduct(productId, newData));
    toast({
      title: 'Product',
      description: 'Product Updated',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    // Stack to display the product information
    <Stack
      direction={['column', 'column', 'row']}
      spacing={[4, 4, 8]}
      w={['98%', '98%', '98%', '80%']}
      mx={'auto'}
      my={4}
      boxShadow={'base'}
      p={4}
      h={['auto', 'auto', 60]}
      bg={'white'}
    >
      <Box
        w={['full', 'full', '150px']}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        overflow={'hidden'}
      >
        <Image
          src={image}
          boxSize={['200px', '150px']}
          objectFit="contain"
          cursor={'pointer'}
          mixBlendMode={'multiply'}
          onClick={() => navigate(`/product/${id}`)}
        />
      </Box>

      <VStack alignItems={'flex-start'} justifyContent={'space-between'}>
        <Box>
          <Heading
            as="h4"
            size={'md'}
            children={title}
            contentEditable={edit}
            ref={titleRef}
            maxW={['full', 'full', '250px']}
          />
          <Heading
            as="h4"
            size={['sm', 'md']}
            children={`$ ${price}`}
            contentEditable={edit}
            ref={priceRef}
          />
        </Box>
        <HStack verticalAlign={'center'}>
          <ReactStars
            count={5}
            edit={edit}
            half={true}
            size={24}
            value={rating.rate}
            ref={ratingRef}
          />
          <Text
            as={'span'}
            children={rating.count}
            contentEditable={edit}
            ref={countRef}
          />
        </HStack>
      </VStack>

      <VStack
        flex={1}
        alignItems={['center', 'center', 'flex-end']}
        textAlign={'justify'}
        justifyContent={'space-between'}
      >
        <Text noOfLines={'6'} contentEditable={edit} ref={descRef}>
          {description}
        </Text>
        <HStack>
          {inCart ? (
            <Button
              leftIcon={<MdRemoveShoppingCart />}
              colorScheme="red"
              onClick={() => removeCartHandler(id)}
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              rightIcon={<MdAddShoppingCart />}
              colorScheme="yellow"
              onClick={() => addCartHandler(id)}
            >
              Add To Cart
            </Button>
          )}

          {edit ? (
            <IconButton
              icon={<MdSave />}
              colorScheme="green"
              variant={'outline'}
              onClick={() => productUpdateHandler(id)}
            />
          ) : (
            <IconButton
              icon={<MdEdit />}
              colorScheme="blue"
              variant={'outline'}
              onClick={() => setEdit(true)}
            />
          )}

          <IconButton
            icon={<MdDelete />}
            colorScheme="red"
            variant={'outline'}
            onClick={() => productDeleteHandler(id)}
          />
        </HStack>
      </VStack>
    </Stack>
  );
};
