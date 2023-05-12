import { ItemCategoria } from '../ItemCategoria';
import { ItemEmpresa } from '../ItemEmpresa';
import { BoardCategoria, BoardProduto, Container, Subcontainer } from './styles';
import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';
import { api, baseURL } from '../../utils/api';
import { Categoria } from '../../types/Categoria';
import { Empresa } from '../../types/Empresa';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { EmpresaModal } from '../EmpresaModal';
import { Menu } from '../../types/Menu';
import { Produto } from '../../types/Produto';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  empresas: Empresa[];
  listEmpresas: Empresa[];
  setListEmpresas: Dispatch<SetStateAction<Empresa[]>>
}

export function Dashboard({ empresas, listEmpresas, setListEmpresas }: DashboardProps) {

  //cria um array de Categorias inicializado como vazio
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<null | Empresa>(null);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    api.get('/categoria').then(({ data }) => {
      setCategorias(data);
    });
  }, []);

  async function handleSelectCategoria(categoriaId: string) {
    const categoria = selectedCategoria === categoriaId ? '' : categoriaId;
    const { data } = await api.get(`/itemEmpCat/${categoriaId}`);
    if (categoria == '') {
      selectAll();
    } else {
      setListEmpresas(data);
      setSelectedCategoria(categoria);
    }
  }

  async function selectAll() {
    // const { data } = await api.get('/empresa');
    setListEmpresas(empresas);
    setSelectedCategoria('');
  }

  //button erro?
  const listRef = useRef<Button>(null);
  const handleScrollRight = () => {
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollLeft = () => {
    listRef.current?.firstElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  function handleOpenModal(empresa: Empresa) {
    //menu by empresa
    api.get('/menuemp/' + empresa.emp_id).then(({ data }) => {
      // console.log('menu: ', data);
      setMenuItems(data);
    }).catch((error) => {
      if (error.response.status == 404) {
        console.log(error.response.data);
      }
    });

    //produtos by empresa
    api.get('/prodemp/' + empresa.emp_id).then(({ data }) => {
      // console.log('menu: ', data);
      setProdutos(data);
    }).catch((error) => {
      if (error.response.status == 404) {
        console.log(error.response.data);
      }
    });

    setIsModalVisible(true);
    setSelectedEmpresa(empresa);

    // navigate('/empresa', {
    //   state: {
    //     visible: true,
    //     empresa: empresa,
    //     menuItems: menuItems,
    //     produtos: produtos
    //   }
    // });

  }

  return (
    <Container>
      <EmpresaModal
        visible={isModalVisible}
        empresa={selectedEmpresa}
        menuItems={menuItems}
        produtos={produtos}
      />
      <Subcontainer>
        <h2>Category</h2>
        <div style={{ display: 'flex' }}>
          <button onClick={handleScrollLeft} ><FaArrowLeft color='#fff' /></button>
          <button onClick={handleScrollRight} ><FaArrowRight color='#fff' /></button>
        </div>
      </Subcontainer>


      <BoardCategoria ref={listRef}>

        <button onClick={() => { selectAll(); }}>
          <ItemCategoria
            name="All"
            image={'/all.png'}
          />
        </button>

        {categorias.map((categoria) => {
          const isSelected = selectedCategoria === categoria.cat_id;

          return (
            <button
              id="item"
              type='button'
              key={categoria.cat_id}
              style={isSelected ? { background: '#ff9f3e' } : { background: '#FFDEAD' }}
              onClick={() => { handleSelectCategoria(categoria.cat_id); }}>

              <ItemCategoria
                name={categoria.cat_name}
                image={baseURL + `uploads/${categoria.cat_image}`}
              />

            </button>
          );
        })}
      </BoardCategoria>

      <h2>Restaurants</h2>
      <div>
        <BoardProduto>
          {listEmpresas.length > 0 ? (
            listEmpresas.map((empresa) => {
              return (
                <button type='button' key={empresa.emp_id} onClick={() => handleOpenModal(empresa)}>
                  <ItemEmpresa
                    image={baseURL + `uploads/${empresa.emp_image}`}
                    name={empresa.emp_name}
                    desc={empresa.emp_desc}
                    type={1}
                  />
                </button>
              );
            })

          ) : (
            <ItemEmpresa
              image={'/shop.png'}
              name={'No results found'}
              desc={''}
              type={0}
            />
          )}

        </BoardProduto>
      </div>
    </Container>
  );
}
