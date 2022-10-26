import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
`;

export const Image = styled.div<{ src: string }>`
  background: url(${(props) => props.src}) no-repeat;
  background-size: contain;
  overflow: hidden;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-position: center center;
  padding: 1%;
`;

export const Section = styled.section`
  background-color: white;
  display: flex;
  flex-direction: column;
  min-height: 700px;
  width: 66%;
  box-sizing: border-box;
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
