import React, { Dispatch, SetStateAction } from 'react';
import { Dashboard } from '../../Components/Dashboard';
import { Header } from '../../Components/Header';
import { Produto } from '../../types/Produto';
import { Order } from '../../types/Order';
import { ProdCateg } from '../../types/ProdCateg';

interface HomeProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchOnChange: (event: any) => void;
  produtos: Produto[];
  listProdutos: Produto[];
  setListProdutos: Dispatch<SetStateAction<Produto[]>>
  orders: Order[];
  setListOrders: Dispatch<SetStateAction<Order[]>>
  onAdd: (produto: Produto, quantidade: number) => void;
  prodCateg: ProdCateg[];
}

export function Home({ search, setSearch, searchOnChange, produtos, listProdutos,
  setListProdutos, orders, setListOrders, onAdd, prodCateg }: HomeProps) {

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        searchOnChange={searchOnChange}
        orders={orders}
        setListOrders={setListOrders}
        onAdd={onAdd}
      />
      <Dashboard
        produtos={produtos}
        listProdutos={listProdutos}
        setListProdutos={setListProdutos}
        orders={orders}
        setListOrders={setListOrders}
        onAdd={onAdd}
        prodCateg={prodCateg}
      />
    </>
  );
}
