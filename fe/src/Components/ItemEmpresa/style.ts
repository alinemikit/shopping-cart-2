import styled from 'styled-components';

export const Item = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  border-radius: 16px;
  width: 100%;
  height: 100%;
`;

export const ContainerImage = styled.div`
 height: 200px;
 width: 100%;

 img {
    background-repeat: no-repeat;
    border-radius: 16px 16px 0 0;
    width: 100%;
    height: 200px;
    max-height: 100%;
    object-fit: cover;
  }
`;

export const Container = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 0 0 16px 16px;
  display:flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;

  p{
    /* width: 300px; */
    /* text-overflow: ellipsis; */
    /* white-space: nowrap; */
    overflow: hidden;
    color: #969696;
    font-size: 12px;
  }
`;

export const ItemNotFound = styled.div`
  grid-column-start:1;
  grid-column-end:5;
  background: transparent;
  border-radius: 16px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;

  img {
    background-repeat: no-repeat;
    border-radius: 16px 16px 0 0;
    object-fit: cover;
    height: 150px;
  }
`;
