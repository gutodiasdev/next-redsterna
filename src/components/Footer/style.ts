import styled from "styled-components";
import { Text } from "../../styles/register";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #777;
  background-image: url("/images/desktop/footer/background_image.jpg");
  background-repeat: none;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  text-transform: uppercase;
`;

export const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 0 40px 0 40px;

  width: 100%;
`;

export const MediaContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const Logo = styled.div`
  align-self: center;

  display: flex;
`;

export const Ancor = styled.a`
  font-size: 14px;
  cursor: pointer;
  color: #337ab7;
`;

export const SocialLogo = styled.a`
  display: flex;
  align-self: center;
  margin: 0 20px 0 20px;
  cursor: pointer;
`;
export const CopyContainer = styled.div`
  display: flex;
  align-self: center;
`;

export const LinkIcons = styled.div`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  background-color: gray;
  transform: uppercase;
`;

export const List = styled.ul`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  cursor: pointer;
  color: #ffffff;
  text-transform: uppwidth;
`;

export const Copyright = styled(Text)`
  color: #ffffff;
  font-size: 12px;
  align-self: center;
  margin: 20px 0 20px 0;
  text-transform: none;
  width: 100%;
`;
export const DesignCopyright = styled(Text)`
  color: #ffffff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  margin: 20px 0 20px 0;
  text-transform: none;
  width: 100%;
  padding: 0 60px 0 60px;
`;
