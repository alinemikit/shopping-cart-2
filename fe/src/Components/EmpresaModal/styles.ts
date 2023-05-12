import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0px;
  top: 0px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 60%;
  border-radius: 8px;
  margin: 20px;
`;

export const HeaderContainer = styled.div`
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: end;
  align-items: start;
  padding: 20px;

  div {
    width: 100%;
    height: 300px;
    max-height: 100%;

  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.5);;
    width: 30px;
    height: 30px;

    img {
      width: 13px;
    }
  }
`;

export const ContainerEmpresa = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  text-align: left;

  p{
    overflow: hidden;
    color: #969696;
    font-size: 12px;
  }
`;

export const Line = styled.hr`
  height: 1px;
  background-color: #FFF2E0;
  border: none;
`;

export const Tab = styled.button`
  font-size: 20px;
  padding: 10px;
  margin: 20px 5px;
  cursor: pointer;
  border: none;
  outline: 0;
  border-radius: 26px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-left: 40px;
`;

