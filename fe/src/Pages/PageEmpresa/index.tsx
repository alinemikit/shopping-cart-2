import { useLocation } from 'react-router-dom';
import { EmpresaModal } from '../../Components/EmpresaModal';

export function PageEmpresa() {

  const location = useLocation();
  const visible = location.state.visible;
  const empresa = location.state.empresa;
  const menuItems = location.state.menuItems;
  const produtos = location.state.produtos;

  return (
    <>
      <EmpresaModal
        visible={visible}
        empresa={empresa}
        menuItems={menuItems}
        produtos={produtos}
      />
    </>
  );
}
