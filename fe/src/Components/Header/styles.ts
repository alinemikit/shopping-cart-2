import styled from 'styled-components';
import { Search } from '@styled-icons/material/Search';
import { ShoppingBag } from '@styled-icons/material/ShoppingBag';
import { Person } from '@styled-icons/material/Person';


export const Container = styled.header`
  background: #fff;
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  color: #ff9f3e;
  font-family: DynaPuff, sans-serif;
`;

export const InputForm = styled.form`
  position: relative;
  width: 20%;
  border: 2px solid #ff9f3e;
  border-radius: 9999em;
  height: 45px;
  display: flex;
  align-items: center;
  background: #fff;
  transition: outline-width ease-out 1s;

  :focus-within {
    outline: 5px solid #FFDEAD;
    opacity: 1.0;
  }

`;

export const SearchBar = styled.input`
  font-size: 16px;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 9999em;
  background: transparent;
  :focus {
    outline:none;
  }
`;

export const SearchIcon = styled(Search)`
  color: #ff9f3e;
  font-size: 50px;
  margin: 10px;
`;

export const Buttons = styled.div`
  position: relative;
  align-items: center;
  width: 100%;
  max-width: 80px;
  display: flex;
  justify-content: space-between;
`;

export const ShoppingBagButton = styled(ShoppingBag)`
  font-size: 50px;
`;

export const UserButton = styled(Person)`
  font-size: 50px;
`;

export const Line = styled.hr`
  height: 1px;
  background-color: #FFDEAD;
  border: none;
`;




