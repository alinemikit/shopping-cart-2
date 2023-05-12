import React from 'react';
import { Header } from './Components/Header';
import { GlobalStyles } from './styles/GlobalStyles';
import { Router } from './Router';
import { useState, useEffect, useMemo } from 'react';
import { api } from './utils/api';
import { Empresa } from './types/Empresa';
import { Dashboard } from './Components/Dashboard';


export function App() {

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [listEmpresas, setListEmpresas] = useState<Empresa[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/empresa').then(({ data }) => {
      // console.log(data);
      setEmpresas(data);
      setListEmpresas(data);
    });



  }, []);

  function searchOnChange(event: any) {
    const filter = event.target.value.toLowerCase();
    console.log(filter);

    if (filter === '') {
      // console.log('filter vazio');
      setListEmpresas(empresas);
    }
    else {
      const searchResult = empresas.filter((row) => row.emp_name.toString().toLowerCase().includes(filter));
      setListEmpresas(searchResult);
      // console.log(searchResult);
    }
  }

  return (
    <React.Fragment>
      <GlobalStyles />
      <Header
        search={search}
        setSearch={setSearch}
        searchOnChange={searchOnChange}
      />
      <Dashboard
        empresas={empresas}
        listEmpresas={listEmpresas}
        setListEmpresas={setListEmpresas}
      />
      {/* <Router
        search={search}
        setSearch={setSearch}
        searchOnChange={searchOnChange}
        empresas={empresas}
        listEmpresas={listEmpresas}
        setListEmpresas={setListEmpresas}
      /> */}
    </React.Fragment>
  );
}
