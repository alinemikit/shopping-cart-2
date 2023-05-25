import { ItemCategoria } from '../ItemCategoria';
import { BoardCategoria, BoardProduto, Container } from './styles';
import { useEffect, useState, Dispatch, SetStateAction, useRef } from 'react';
import { api, baseURL } from '../../utils/api';
import { Categoria } from '../../types/Categoria';
import { Produto } from '../../types/Produto';
import { ItemProduto } from '../ItemProduto';
import { ProdutoModal } from '../ProdutoModal';
import { OrderModal } from '../OrderModal';
import { Order } from '../../types/Order';
import { ProdCateg } from '../../types/ProdCateg';

interface DashboardProps {
  produtos: Produto[];
  listProdutos: Produto[];
  setListProdutos: Dispatch<SetStateAction<Produto[]>>
  orders: Order[];
  setListOrders: Dispatch<SetStateAction<Order[]>>
  onAdd: (produto: Produto, quantidade: number) => void;
  prodCateg: ProdCateg[];
}

export function Dashboard({ produtos, listProdutos, setListProdutos, orders,
  setListOrders, onAdd, prodCateg }: DashboardProps) {

  //cria um array de Categorias inicializado como vazio
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<null | Produto>(null);

  useEffect(() => {
    api.get('/categoria').then(({ data }) => {
      setCategorias(data);
    });

  }, []);

  async function handleSelectCategoria(categoriaId: string) {
    const categoria = selectedCategoria === categoriaId ? '' : categoriaId;
    const { data } = await api.get(`/itemProdCat/${categoriaId}`);
    // const selectedCategoriaItems = produtos.filter((row) => row.cat_id.toString().includes(categoriaId));
    if (categoria == '') {
      selectAll();
    } else {
      setListProdutos(data);
      setSelectedCategoria(categoria);
    }
  }

  async function selectAll() {
    // const { data } = await api.get('/empresa');
    // const { data } = await api.get('/produto');
    setListProdutos(produtos);
    setSelectedCategoria('');
  }

  function handleOpenModal(produto: Produto) {

    if (produto) {
      setIsModalVisible(true);
      setSelectedProduto(produto);
    }
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedProduto(null);
  }

  return (
    <Container>
      <ProdutoModal
        visible={isModalVisible}
        produto={selectedProduto}
        onClose={handleCloseModal}
        orders={orders}
        setListOrders={setListOrders}
        onAdd={onAdd}
      />

      <BoardCategoria>

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
              style={isSelected ? { background: '#ff9f3e' } : { background: '#FFF2E0' }}
              onClick={() => { handleSelectCategoria(categoria.cat_id); }}>

              <ItemCategoria
                name={categoria.cat_name}
                image={baseURL + `uploads/${categoria.cat_image}`}
              />

            </button>
          );
        })}
      </BoardCategoria>

      <div>
        <BoardProduto>
          {listProdutos.length > 0 ? (
            listProdutos.map((produto) => {
              return (
                <button type='button' key={produto.prod_id} onClick={() => handleOpenModal(produto)}>
                  <ItemProduto
                    produto={produto}
                    type={1}
                  />
                </button>
              );
            })

          ) : (
            <ItemProduto
              produto={null}
              type={0}
            />
          )}

        </BoardProduto>
      </div>
    </Container>
  );
}
