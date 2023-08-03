import { Avatar, Badge, HStack, Text } from '@chakra-ui/react';
import { FaPlusSquare, FaProductHunt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LinkButton } from './LinkButton';
import { useSelector } from 'react-redux';
import { cartSelector } from '../redux/cartSlice';
import { Logo } from './Logo';

export const Navbar = () => {
  const cartItems = useSelector(cartSelector);

  return (
    <HStack
      width={'full'}
      alignItems={'center'}
      paddingInline={[4, 4, 20]}
      bg={'blue.400'}
      color="white"
      paddingBlock={2}
      justifyContent={'space-between'}
      position={'sticky'}
      top={'0'}
      zIndex={10}
    >
      <HStack spacing={8} alignItems={'center'}>
        <Link to="/">
          <Logo />
        </Link>

        {/* LinkButtons for Products and Add Product */}
        <LinkButton
          url={'/products'}
          text={'Products'}
          icon={<FaProductHunt />}
        />
        <LinkButton
          url={'/add_product'}
          text={'Add Product'}
          icon={<FaPlusSquare />}
        />
      </HStack>
      <HStack spacing={8}>
        {/* LinkButton for Cart */}
        <LinkButton url={'/cart'} text={'Cart'} icon={<FaShoppingCart />} />
        {/* Display the number of items in the cart as a Badge */}
        <Badge>{cartItems.length}</Badge>
        {/* Display the user's name */}
        <Text children="Deepak" />
        {/* Display the user's avatar */}
        <Avatar cursor={'pointer'} src="https://bit.ly/broken-link" />
      </HStack>
    </HStack>
  );
};
