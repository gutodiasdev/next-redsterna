import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  padding: 0 60px 0 60px;
  background-color: #ffffff;
`;
export const Title = styled.span`
  font-size: 24px;
  margin-top: 10px;
`;

export const InformationText = styled.span`
  font-size: 10px;
  width: 50%;
  margin-bottom: 10px;
  color: #a9a9a9;
`;

export const Text = styled.span`
  font-size: 14px;
  width: 50%;
  margin-bottom: 10px;
  font-weight: 300;
`;

export const FileInput = styled.input`
  font-size: 0;
  ::-webkit-file-upload-button {
    visibility: hidden;
  }
  ::after {
    visibility: hidden;
  }
  ::before {
    content: "Escolha a capa da sua viagem";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
  }
  :hover::before {
    border-color: black;
  }
  :active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

export const Divider = styled.hr`
  width: 360px;
  height: 1px;
  color: #a9a9a9;
  margin: 10px 0 20px;
`;

export const TitleContainer = styled.span`
  flex-direction: column;
  display: flex;
  align-items: flex-start;
`;
export const Link = styled.span`
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #337ab7;
`;
export const Button = styled.button`
  margin-top: 21;
  width: 100px;
  height: 50px;
  padding: 10px 0 10px 0;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #b22222;
  align-self: center;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const Description = styled.div`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #4f4f4f;
`;
export const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  padding-top: 10px;

  color: #4f4f4f;
  font-weight: 600;
`;

export const TextArea = styled.textarea`
  margin-bottom: 10px;
  width: 300px;
  height: 100px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
`;

export const Input = styled.input`
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #dcdcdc;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
`;

export const Select = styled.select`
  width: 300px;
  height: 30px;
  color: #000;
  margin-bottom: 10px;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  border-radius: 5px;
`;

export const Upload = styled.input`
  width: 300px;
  border-radius: 5px;
  height: 30px;
  margin-bottom: 10px;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 20px;
`;

export const CheckboxWrapper = styled.div`
  width: 50%;
  display: flex;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  padding-top: 20px;
  align-items: center;
`;

export const Checkbox = styled.input`
  width: 15px;
  height: 15px;
  margin-right: 10px;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    color: red;
    font-size: 10px;
    margin-bottom: 2.5px;
  }
`;
