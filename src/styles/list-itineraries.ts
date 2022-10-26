import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

export const Image = styled.div<{ cover?: string; }>`
  background-image: url(${(props) => props.cover});
  width: 50px;
  height: 50px;
  background-size: contain;
  border-radius: 50%;
  margin-right: 20px;
  margin-left: 20px;
`;

export const List = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 500px;
  overflow-y: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

export const Line = styled.div<{ fullWidth?: boolean; }>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Title = styled.h4`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  padding-top: 20px;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  margin-top: 10px;
  color: #4f4f4f;
  font-weight: 600;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 10px;
`;

export const Input = styled.input`
  width: 300px;
  height: 30px;
  border: 1px solid #dcdcdc;
  margin-top: 50px;
  border: 1px solid #b22222;
  border-radius: 5px;
  outline-color: #b22222;
  &::placeholder {
    font-size: 16px;
    padding: 5px;
    color: #a9a9a9;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-left: 5px solid red;
  background-color: #f5f5f5;
  justify-content: space-between;
  padding: 0px 30px 0px 0px;
  margin-bottom: 10px;
`;

export const Header = styled.div`
  background-image: url("/images/desktop/itinerary/list.jpg");
  background-size: cover;
  width: 100%;
  height: 400px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
