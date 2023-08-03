import { Stack } from '@chakra-ui/react';

export const Container = ({ children }) => {
  return (
    <Stack bg={'gray.300'} p={[2, 8]} minH={'calc(100vh - 64px)'}>
      {children}
    </Stack>
  );
};
