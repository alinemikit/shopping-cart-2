import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { Home } from '../src/Pages/Home';
import { Dashboard } from './Components/Dashboard';
import { Empresa } from './types/Empresa';
import { Dispatch, SetStateAction } from 'react';
import { EmpresaModal } from './Components/EmpresaModal';
import { PageEmpresa } from '../src/Pages/PageEmpresa';

interface RouterProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchOnChange: (event: any) => void;
  empresas: Empresa[];
  listEmpresas: Empresa[];
  setListEmpresas: Dispatch<SetStateAction<Empresa[]>>
}


export function Router({ search, setSearch, searchOnChange, empresas, listEmpresas, setListEmpresas }: RouterProps) {
  // console.log(empresas);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={
          <Home
            search={search}
            setSearch={setSearch}
            searchOnChange={searchOnChange}
            empresas={empresas}
            listEmpresas={listEmpresas}
            setListEmpresas={setListEmpresas}
          />} path='/'
        /> */}

        <Route element={<PageEmpresa/>} path='/empresa'/>
      </Routes>
    </BrowserRouter>
  );
}
