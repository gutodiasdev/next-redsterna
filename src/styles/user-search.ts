import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;

  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  padding: 0 40px 0 40px;
  background-color: #ffffff;
`;

export const Divider = styled.div`
  width: auto;
  height: 1px;
  margin: 30px 0 30px 0;
  background-color: #a9a9a9;
`;

export const Title = styled.h1`
  font-size: 30px;
  margin: 20px 0 0 0;
  font-weight: normal;
`;

export const TitleContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

export const AncorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const RowContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const CollumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  width: 50%;
  height: 100%;
`;

export const BackButton = styled.div`
  width: 100px;
  text-align: center;
  height: 40px;
  color: #ff0000;
  margin: 0 0 20px;
  border: 1px solid red;
  padding: 12px 6px 12px 6px;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ff0000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

export const UserWrapper = styled.div`
  display: flex;
  width: 100%;
  overflow-y: auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
`;

export const UserContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: 150px;
  flex-direction: column;
  justify-content: center;
  width: 48%;
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0 15px 0;
`;

export const UserTitle = styled.div`
  display: flex;
  cursor: pointer;
  font-weight: normal;
  margin: 0;

  &:hover {
    color: red;
  }
`;

export const UserSummary = styled.div`
  display: flex;
  height: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  margin: 15px 0 15px 0;
`;

export const ProfileImageContainer = styled.div`
  border: 3px solid red;
  height: 100px;
  border-radius: 100%;
  width: 100px;
  display: block;
`;

export const ProfileIcon = styled.div<{ src: string; }>`
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  height: 30px;
  width: 100px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  background-color: #dcdcdc;
  margin-left: 10px;
  font-size: 14px;
  &:hover {
    background-color: #ff0000;
    color: #fff;
    border: 1px solid #fff;
  }
`;

export const Description = styled.h2`
  font-size: 18px;
  font-weight: normal;
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
  width: 300px;
  height: 30px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  outline-color: #b22222;
  &::placeholder {
    font-size: 16px;
    padding: 5px;
    color: #a9a9a9;
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
  align-items: center;
  flex-direction: column;
  justify-content: center;
  span {
    color: #ff0000;
    font-size: 10px;
  }
`;
