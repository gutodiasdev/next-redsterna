import { AiFillStar } from "react-icons/ai";
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

export const Image = styled.div<{ cover?: string }>`
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
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Line = styled.div<{ fullWidth?: boolean }>`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
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

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  background-color: white;
  justify-content: flex-start;
  flex-direction: column;
  min-height: 300px;
  flex-grow: 1;
  padding: 0px 30px 0px 0px;
  margin-bottom: 10px;
`;

export const Star = styled(AiFillStar)`
  cursor: pointer;
  transition: color 200ms;
`;

export const Header = styled.div<{ cover: string }>`
  background-image: url(${(props) => props.cover});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 500px;
  color: white;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
