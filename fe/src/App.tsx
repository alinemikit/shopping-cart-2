import React from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { Router } from './Router';
import { useState, useEffect } from 'react';
import { api } from './utils/api';
import { Produto } from './types/Produto';
import { Order } from './types/Order';
import { ProdCateg } from './types/ProdCateg';


export function App() {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [listProdutos, setListProdutos] = useState<Produto[]>([]);
  const [prodCateg, setProdCateg] = useState<ProdCateg[]>([]);
  const [search, setSearch] = useState('');
  const [orders, setListOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/produto').then(({ data }) => {
      // console.log(data);
      setProdutos(data);
      setListProdutos(data);
    });

    api.get('/itemProdCat').then(({ data }) => {
      // console.log(data);
      setProdCateg(data);
    });
  }, []);

  function searchOnChange(event: any) {
    const filter = event.target.value.toLowerCase();
    console.log(filter);

    if (filter === '') {
      // console.log('filter vazio');
      setListProdutos(produtos);
    }
    else {
      const searchResult = produtos.filter((row) => row.prod_name.toString().toLowerCase().includes(filter));
      setListProdutos(searchResult);
      // console.log(searchResult);
    }
  }

  function addToOrder(produto: Produto, quantidade: number) {
    setListOrders((prevState) => {
      const itemIndex = prevState.findIndex(
        orders => orders.produto.prod_id === produto.prod_id
      );

      console.log(itemIndex);

      if (itemIndex < 0) {
        return prevState.concat({
          produto: produto,
          quantidade: quantidade
        });
      }

      const newOrders = [...prevState];
      const item = newOrders[itemIndex];
      newOrders[itemIndex] = {
        ...item,
        quantidade: newOrders[itemIndex].quantidade + quantidade
      };
      return newOrders;
    });

  }

  return (
    <React.Fragment>
      <GlobalStyles />
      <Router
        search={search}
        setSearch={setSearch}
        searchOnChange={searchOnChange}
        produtos={produtos}
        listProdutos={listProdutos}
        setListProdutos={setListProdutos}
        orders={orders}
        setListOrders={setListOrders}
        onAdd={addToOrder}
        prodCateg={prodCateg}
      />
    </React.Fragment>
  );
}
