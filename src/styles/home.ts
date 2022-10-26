import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
`;

export const Banner = styled.div`
  display: flex;
  justify-content: center;
`;

export const TipBanner = styled.div`
  display: flex;
  justify-content: center;
`;
export const RowContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  position: relative;
`;

export const Title = styled.h2`
  display: flex;
  text-transform: uppercase;
  color: #888;
  font-size: 30px;
  font-weight: 300;
  width: 400px;
  justify-content: center;
  margin-left: 10%;
`;

export const Section = styled.section`
  margin: 20px 0 20px 0;
  padding: 0 15px 0 15px;
  flex-direction: column;
  display: flex;
`;

export const LinkIcons = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  background-color: gray;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

// export const Link = styled.a`
//   display: flex;
//   align-items: center;
//   margin-top: 8px 0 8px 0;
//   font-size: 14px;
//   cursor: pointer;
//   color: #777;
//   text-transform: uppercase;

//   &:hover {
//     color: red;
//   }
// `;

export const RoadmapButton = styled.div`
  position: absolute;
  margin-top: 10%;
  margin-left: 35%;
  height: 230px;
  width: 230px;
  background-image: url("/images/desktop/home/roadmap_button.png");
  background-color: transparent;
`;

export const RegisterButton = styled.div`
  position: absolute;
  margin-top: 18%;
  margin-left: 40%;
  height: 230px;
  width: 230px;
  background-image: url("/images/desktop/home/register_button.png");
  background-color: transparent;
`;

export const AditionalInfoButton = styled.a`
  position: absolute;
  margin-top: 5%;
  margin-right: 45%;
  height: 230px;
  width: 230px;
  background-image: url("/images/desktop/home/tip_button.png");
  background-color: transparent;
`;

export const RoadmapText = styled.p`
  position: absolute;
  color: #fff;
  display: flex;
  width: 11.1%;
  margin-left: 18%;
  font-weight: bold;
  margin-top: 2%;
  font-size: 16px;
  line-height: 1.42857143;
  font-family: MontserratRegular;
`;

export const RegisterText = styled.p`
  margin-top: 260px;
  margin-left: 280px;
  position: absolute;
  word-break: break-word;
  width: 200px;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: #fff;

  font-family: MontserratRegular;
`;

export const TipsText = styled.p`
  margin-top: 40px;
  margin-left: 32%;
  position: absolute;
  word-break: break-word;
  width: 10%;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: #fff;
  font-family: MontserratRegular;
`;
