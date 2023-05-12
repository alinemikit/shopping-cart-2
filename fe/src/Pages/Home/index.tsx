import React from 'react';
import { Dashboard } from '../../Components/Dashboard';
import { Header } from '../../Components/Header';

interface HomeProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchOnChange: (event: any) => void;
  empresas: Empresa[];
  listEmpresas: Empresa[];
  setListEmpresas: Dispatch<SetStateAction<Empresa[]>>
}

export function Home({ search, setSearch, searchOnChange, empresas, listEmpresas, setListEmpresas }: HeaderProps) {

  return (
    <>
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
    </>
  );
}
