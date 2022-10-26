import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  overflow: hidden;
  width: 100%;
  background-image: url("/images/dicas/capa.jpeg");
  height: 400px;
  background-position: center center;
  h2 {
    font-size: 30px;
    color: white;
    font-style: bold;
    position: absolute;
    margin-top: 10%;
    margin-left: 19%;
  }
`;

export const Section = styled.section`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  min-height: 700px;
  width: 66%;
  padding: 10px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  width: 47.5%;
  min-height: 200px;
  background-color: rgba(206, 205, 202, 0.3);
  border-radius: 15px;
  color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1%;
  padding: 10px;
`;

export const Line = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: red;
    color: white;
    font-weight: bold;
    border: 0;
  }
`;

export const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Image = styled.div<{ src: string }>`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  filter: invert(20%) sepia(151%) saturate(248%) hue-rotate(315deg)
    brightness(93%) contrast(150%);
`;

export const Description = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 30px;
  h4 {
    :hover {
      cursor: pointer;
    }
  }
`;
