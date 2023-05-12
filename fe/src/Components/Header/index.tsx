import React from 'react';
import { Empresa } from '../../types/Empresa';
import {
  Container, SearchIcon, Logo, SearchBar, InputForm, Content, Buttons,
  ShoppingBagButton, UserButton, Line
} from './styles';
import { Dispatch, SetStateAction, useState, useMemo } from 'react';
import { api } from '../../utils/api';

interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchOnChange: (event: any) => void;
}

export function Header({ search, setSearch, searchOnChange }: HeaderProps) {

  return (
    <>
      <Container>
        <Content>
          <Logo>Hungry</Logo>
          <InputForm className='form-input'>
            <SearchIcon size={30} />
            <SearchBar type="text" placeholder="Search..." onChange={(event) => searchOnChange(event)} />
          </InputForm>
          <Buttons>
            <ShoppingBagButton size={30} />
            <UserButton size={30} />
          </Buttons>
        </Content>
      </Container>
      <Line />
    </>
  );
}
