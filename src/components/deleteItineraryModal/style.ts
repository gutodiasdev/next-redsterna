import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

export const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const TitleContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CloseContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const RowLabel = styled.div`
  display: flex;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  width: 100%;
`;

export const SummaryContainer = styled.div`
  display: flex;
  text-align: center;
  margin-bottom: 5px;
  overflow-y: scroll;
  flex-direction: column;
  height: 100px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CancelButton = styled.button`
  height: 54px;
  width: 200px;

  border: none;
  margin-top: 20px;
  cursor: pointer;
  background-color: #4f4f4f;
  border-radius: 15px;

  color: #ffffff;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #363636;
  }
`;

export const DeleteButton = styled.button`
  height: 55px;
  width: 200px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  background-color: #b22222;
  border-radius: 15px;

  color: #ffffff;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #8b0000;
  }
`;

export const CloseButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    border-radius: 50%;
  }
`;

export const FacebookButton = styled.button`
  width: 200px;
  height: 35px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #3a5a97;
  color: #ffffff;
`;
export const Description = styled.div`
  display: flex;
  text-align: center;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #4f4f4f;
`;
export const Label = styled.label`
  font-size: 16px;
  color: #4f4f4f;
  margin-bottom: 10px;
  margin-top: 20px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 2px solid #dcdcdc;
  border-radius: 15px;
  outline-color: #b22222;

  &::placeholder {
    font-size: 16px;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  span {
    color: red;
    font-size: 10px;
  }
`;
