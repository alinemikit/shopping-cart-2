import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Home } from '../src/Pages/Home';
import { Dispatch, SetStateAction } from 'react';
import { Produto } from './types/Produto';
import { Order } from './types/Order';
import { ProdCateg } from './types/ProdCateg';

interface RouterProps {
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


export function Router({ search, setSearch, searchOnChange, produtos, listProdutos,
  setListProdutos, orders, setListOrders, onAdd, prodCateg }: RouterProps) {
  // console.log(empresas);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={
          <Home
            search={search}
            setSearch={setSearch}
            searchOnChange={searchOnChange}
            produtos={produtos}
            listProdutos={listProdutos}
            setListProdutos={setListProdutos}
            orders={orders}
            setListOrders={setListOrders}
            onAdd={onAdd}
            prodCateg={prodCateg}
          />} path='/'
        />

      </Routes>
    </BrowserRouter>
  );
}
