import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 40px auto;
`;

export const Subcontainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  button {
    background: #ff9f3e;
    border: none;
    margin: 5px;
    width: 40px;
    height: 40px;
    border-radius: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:hover {
    background: #FFF2E0;
  }
`;

export const BoardCategoria = styled.div`
  margin: 10px;
  margin-bottom: 50px;
  height: auto;
  overflow-x: scroll;
  overflow-y: hidden;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: center;

  button {
    background: #FFF2E0;
    border: none;
    border-radius: 45px;
    width: 100px;
    padding: 16px;
    margin: 5px;
  }

  /* button:hover{
    background: #ff9f3e;
  } */
`;

export const BoardProduto = styled.div`
  margin: 10px;
  background: transparent;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  justify-content: center;

  button {
    background: #fff;
    border: none;
    /* background: #f6f7f9; */
    border-radius: 16px;
    margin: 5px;
    /* box-shadow: 0 3px 10px rgb(0 0 0 / 0.2); */
  }

  button:hover{
    filter:alpha(opacity=70);
    opacity:0.7;
  }

`;


