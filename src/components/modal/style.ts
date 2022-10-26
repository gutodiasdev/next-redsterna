import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px;
`;

export const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

export const TitleContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AncorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Ancor = styled.div`
  font-size: 14px;
  cursor: pointer;
  color: #922b21;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
`;

export const Button = styled.button`
  height: 55px;
  width: 100%;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  background-color: #b22222;
  border-radius: 15px;

  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const RowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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
  font-size: 14px;
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
  padding-left: 10px;
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
