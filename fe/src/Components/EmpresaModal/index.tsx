import { HeaderContainer, ModalBody, Overlay, Tab, ButtonGroup, ContainerEmpresa, Line } from './styles';
import closeIcon from '../../../public/close.png';
import { Empresa } from '../../types/Empresa';
import { api, baseURL } from '../../utils/api';
import { useState, useEffect } from 'react';
import { Menu } from '../../types/Menu';
import { Produto } from '../../types/Produto';
import { TabItem } from '../TabItem';

interface EmpresaModalProps {
  visible: boolean;
  empresa: Empresa | null;
  menuItems: Menu[];
  produtos: Produto[];
}

export function EmpresaModal({ visible, empresa, menuItems, produtos }: EmpresaModalProps) {

  const [active, setActive] = useState(0);

  if (!visible || !empresa)
    return null;

  function handleSelectTab(menu: Menu, index: number){
    setActive(index);
  }

  return (
    <Overlay>
      <ModalBody>
        <HeaderContainer style={{ backgroundImage: `url(${baseURL}uploads/${empresa.emp_image})` }}>
          <button type='button'>
            <img src={closeIcon} alt='icone fechar' />
          </button>
        </HeaderContainer>

        <ContainerEmpresa>
          <h2>{empresa.emp_name}</h2>
          <p>{empresa.emp_desc}</p>
        </ContainerEmpresa>
        <Line />

        <ButtonGroup>
          {menuItems.map((menu, index) => (
            <Tab
              key={menu.menu_id}
              onClick={() => { handleSelectTab(menu, index); }}
              style={active === index ? { background: '#FFF2E0', color: '#ff9f3e' } : { background: '#fff', color: '#ff9f3e' }}
            >
              <h5>{menu.menu_name}</h5>
            </Tab>
          ))}


        </ButtonGroup>

        <TabItem />
      </ModalBody>
    </Overlay>
  );
}


