import styled from 'styled-components';

export const Item = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;

  img {
    background-repeat: no-repeat;
    transition: 1s ease;
  }

  img:hover {
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition: 1s ease;
  }
`;
