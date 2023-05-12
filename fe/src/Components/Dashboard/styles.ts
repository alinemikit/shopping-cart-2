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
    background: #FFDEAD;
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
  /* display: flex;
  justify-content: center; */

  button {
    background: #FFDEAD;
    border: none;
    border-radius: 8px;
    width: 120px;
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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  justify-content: center;


  button {
    background: #f6f7f9;
    border: none;
    border-radius: 16px;
    margin: 5px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    /* transition: 1s ease; */
  }

  /* button:hover{
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
    transition: 1s ease;
  } */

`;

