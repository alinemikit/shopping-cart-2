
import { FaShoppingBag } from 'react-icons/fa';
import {
  Container, SearchIcon, Logo, SearchBar, InputForm, Content, Buttons,
  ShoppingBagButton, UserButton, Line
} from './styles';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { MdVisibility } from 'react-icons/md';
import { Produto } from '../../types/Produto';
import { OrderModal } from '../OrderModal';
import { Order } from '../../types/Order';


interface HeaderProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchOnChange: (event: any) => void;
  orders: Order[];
  setListOrders: Dispatch<SetStateAction<Order[]>>
  onAdd: (produto: Produto, quantidade: number) => void;
}

export function Header({ search, setSearch, searchOnChange, orders, setListOrders,
  onAdd }: HeaderProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [qtdeItems, setQtdeItems] = useState(0);

  const contador = orders.reduce((acc, orders) => {
    return acc + orders.quantidade;
  }, 0);

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        orders={orders}
        setListOrders={setListOrders}
        onAdd={onAdd}
      />
      <Container style={isModalVisible ? { overflow: 'hidden' } : { overflow: 'auto' }}>

        <Content>
          <Logo>Hungry</Logo>
          <InputForm className='form-input'>
            <SearchIcon size={30} />
            <SearchBar type="text" placeholder="Search..." onChange={(event) => searchOnChange(event)} />
          </InputForm>
          <Buttons>
            {/* <ShoppingBagButton size={20} className='badge'/> */}
            <ShoppingBagButton onClick={handleOpenModal}>
              <FaShoppingBag size={25} />
              <span style={orders.length ? { visibility: 'visible' } : { visibility: 'hidden' }} className='badge badge-warning' id='lblCartCount'>{contador}</span>
            </ShoppingBagButton>
            <UserButton size={30} />
          </Buttons>
        </Content>
      </Container>
      {/* <Line /> */}
    </>
  );
}
