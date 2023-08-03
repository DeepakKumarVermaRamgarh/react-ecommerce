import { Grid, Spinner } from '@chakra-ui/react';

export const Loader = () => {
  return (
    <Grid placeItems={'center'} w={'100%'} minH={'calc(100vh - 70px)'}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Grid>
  );
};
