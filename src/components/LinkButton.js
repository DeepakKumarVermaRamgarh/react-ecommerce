import { Center, WrapItem } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const LinkButton = ({ icon, text, url }) => {
  return (
    <NavLink
      to={url}
      style={({ isActive }) => ({ color: isActive ? 'yellow' : 'white' })}
    >
      <WrapItem>
        <Center gap={2}>
          {icon}
          {text}
        </Center>
      </WrapItem>
    </NavLink>
  );
};
