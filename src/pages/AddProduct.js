// Import required dependencies and components
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Container } from '../components/Container';
import { MdAdd } from 'react-icons/md';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../redux/productSlice';

// Define the AddProduct component
export const AddProduct = () => {
  // Use useRef to create references to input elements for data retrieval
  const nameRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const ratingsRef = useRef();
  const countRef = useRef();
  const imageRef = useRef();

  // Get the useToast function to show notifications
  const toast = useToast();

  // Get the dispatch function from Redux to dispatch actions
  const dispatch = useDispatch();

  // Function to clear all input fields
  const clearInputs = () => {
    nameRef.current.value = '';
    descRef.current.value = '';
    priceRef.current.value = '';
    ratingsRef.current.value = '';
    countRef.current.value = '';
    imageRef.current.value = '';
  };

  // Function to handle form submission
  const handleSubmit = e => {
    e.preventDefault();

    // Prepare product data from the input values
    const productData = {
      title: nameRef.current.value.trim(),
      description: descRef.current.value.trim(),
      price: priceRef.current.value.trim(),
      rating: {
        role: ratingsRef.current.value.trim(),
        count: countRef.current.value.trim(),
      },
      url: imageRef.current.value.trim(),
    };

    // Dispatch the addNewProduct action with the product data
    dispatch(addNewProduct(productData));
    // Clear input fields after successful submission
    clearInputs();
    // Show a toast notification for successful product addition
    toast({
      title: 'Product',
      description: 'Product Added Succesfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  // Return the JSX for the AddProduct component
  return (
    <Container>
      <form onSubmit={e => handleSubmit(e)}>
        {/* Use VStack to arrange form elements vertically */}
        <VStack
          w={['full', 'full', '60%']}
          alignItems={'left'}
          mx={'auto'}
          bg="white"
          p={8}
          borderRadius={8}
          spacing={4}
        >
          {/* Display the form heading */}
          <Center>
            <Heading
              as={'h1'}
              size={['md', 'md', 'lg']}
              children="Add Product"
            />
          </Center>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" w={'full'} ref={nameRef} required />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea w={'full'} resize={'none'} ref={descRef} required />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              w={'full'}
              ref={priceRef}
              inputMode="number"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Image Url</FormLabel>
            <Input
              type="url"
              w={'full'}
              ref={imageRef}
              inputMode="url"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rating</FormLabel>
            <Input
              type="number"
              ref={ratingsRef}
              inputMode="number"
              w={'full'}
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Count</FormLabel>
            <Input
              type="number"
              ref={countRef}
              w={'full'}
              inputMode="number"
              required
            />
          </FormControl>

          {/* Submit button for adding the product */}
          <Button
            type="submit"
            children="Add"
            colorScheme="blue"
            leftIcon={<MdAdd />}
          />
        </VStack>
      </form>
    </Container>
  );
};
