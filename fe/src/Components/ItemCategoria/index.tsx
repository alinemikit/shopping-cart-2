import { Item } from './style';
// import image from '../../assets/images/bbq.png';

interface ItemCategoriaProps {
  name: string,
  image: string,
}

export function ItemCategoria({ name, image }: ItemCategoriaProps) {
  return (
    <Item>
      <img src={image} />
      <h5>{name}</h5>

    </Item>
  );
}
