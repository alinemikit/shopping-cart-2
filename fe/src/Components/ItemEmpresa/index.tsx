import { text } from '@fortawesome/fontawesome-svg-core';
import { Container, ContainerImage, Item, ItemNotFound } from './style';
// import image from '../../assets/images/bbq.png';

interface ItemEmpresaProps {
  image: string,
  name: string,
  desc: string,
  type: number
}

export function ItemEmpresa({ image, name, desc, type }: ItemEmpresaProps) {

  if (type == 1){
    return (
      <Item>
        <ContainerImage>
          <img src={image} />
        </ContainerImage>

        <Container>
          <h4>{name}</h4>
          <p>{desc}</p>
        </Container>

      </Item>
    );
  } else {
    return (
      <ItemNotFound>
        <img src={image} />
        <h4>{name}</h4>
        <p>{desc}</p>
      </ItemNotFound>
    );
  }

}
