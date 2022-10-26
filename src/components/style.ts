import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  padding: 0 60px 0 60px;
  background-color: #ffffff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EditForm = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;

  padding: 0 60px 0 60px;
  background-color: #ffffff;

  transition-property: height;
  transition-duration: 2s;

  &:hover {
    height: 100%;
  }
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
  font-size: 16px;
  margin-right: 5px;
`;

export const Divider = styled.hr`
  width: 100%;
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
  display: flex;
  justify-content: center;
  width: 50%;
  height: 40px;
  margin: 0 0 20px;
  border: 1px solid #dcdcdc;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

export const Button = styled.button`
  width: 300px;
  height: 40px;
  margin: 0 0 20px;
  border: 1px solid #dcdcdc;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
`;

export const BackButton = styled.div`
  width: 20%;
  height: 40px;
  margin: 0 0 20px;
  border: 1px solid #dcdcdc;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
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

export const SaveButton = styled.button`
  width: 20%;
  height: 40px;
  margin: 0 0 20px;
  border: 1px solid #dcdcdc;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
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
  height: 100%;
  padding-bottom: 10px;
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

export const Description = styled.div`
  font-size: 14px;
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

export const ButtonFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextArea = styled.textarea`
  margin-bottom: 10px;
  width: 300px;
  height: 100px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
`;

export const Input = styled.input`
  width: auto;
  height: 40px;
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
