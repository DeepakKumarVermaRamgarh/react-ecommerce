// Import required dependencies and components
import { Box, Image } from '@chakra-ui/react';

export const HomePage = () => {
  return (
    // Box component to create a container for the background image
    <Box w="100%" h={'100vh'} overflow={'hidden'}>
      {/* Image component to display the background image */}
      <Image
        objectFit="cover"
        objectPosition="center"
        height="-webkit-fill-available"
        src="./assets/ecommerce.jpg"
        w={'full'}
      />
    </Box>
  );
};
