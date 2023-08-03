import { VStack } from '@chakra-ui/react';

export const ProductList = ({ children }) => {
  return (
    <VStack p={8} bg={'gray.200'} minH={'100vh'}>
      {children}
    </VStack>
  );
};
