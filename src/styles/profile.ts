import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  max-width: 72%;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const HeaderTab = styled.div`
  display: flex;
  width: 100%;
  text-transform: uppercase;
  justify-content: space-between;
  background-color: #fff;
`;

export const Cover = styled.div`
  height: 500px;
  background-size: cover;
  width: 100%;
  border: 5px solid #fff;
  align-self: center;
`;

export const ProfileImageContainer = styled.div`
  border: 5px solid #fff;
  height: 270px;
  border-radius: 100%;
  width: 270px;
  margin-top: -250px;
  margin-left: 20px;
  display: block;
`;

export const ProfileIcon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

export const CoverIcon = styled.img`
  width: 100%;
  height: 100%;
`;

export const Ancor = styled.div``;

export const Icon = styled.img`
  display: flex;
`;

export const FollowIcon = styled.img`
  display: flex;
  margin: 0 15px 0 15px;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadingContainer = styled.div`
  display: flex;
  text-transform: uppercase;
  margin-left: 40%;
  justify-content: space-between;
  padding: 9px;
`;

export const SocialMediaButton = styled.a`
  display: flex;
  border: none;
  background: none;
  padding: 0;
`;

export const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #555;
  width: 180px;
  height: auto;
  border-radius: 30px;
  text-transform: uppercase;
  color: #fff;
`;

export const Destination = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  font-size: 10px;
`;

export const Itinerary = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  font-size: 10px;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Text = styled.div`
  display: flex;
  font-size: 14px;
  align-self: flex-start;
  text-transform: uppercase;

  overflow-y: auto;
`;

export const SmallText = styled.div`
  display: flex;
  font-size: 12px;
  align-self: center;
  text-transform: uppercase;
  margin-left: 10px;
`;

export const Title = styled.span`
  font-size: 20px;
  margin: 10px;
  text-transform: uppercase;
`;

export const UserName = styled.span`
  font-weight: bold;
`;

export const LargeText = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;

  padding: 20px 20px 0 20px;
`;
export const CollapseDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const FollowGroupContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: auto;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 40%;
`;

export const InterestsContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: auto;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  width: 55%;
`;

export const InterestsHeading = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

export const FollowColumn = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
  justify-content: space-between;
`;

export const Counter = styled.div`
  display: flex;
  color: red;
  align-items: center;
  font-weight: bold;
  padding-left: 20px;
`;

export const Roadmap = styled.span`
  color: red;
  font-weight: bold;
`;

export const AboutContainer = styled.div`
  background-color: #f5f5f5;
  color: #000;
  width: 90vh;
  height: auto;
  margin-bottom: 20px;
`;

export const Select = styled.div`
  background-color: #f5f5f5;
  color: #000;
  width: 90vh;
  height: auto;
  padding: 10px 20px 10px 20px;
`;

export const SelectDescription = styled.span`
  font-size: 16px;
  color: #000;
  margin: 0;
  font-weight: bold;
`;

export const Divider = styled.div`
  width: auto;
  height: 1px;
  background-color: #000;
  margin-bottom: 25px;
`;

export const ItineraryContainer = styled.div<{ children: any; }>`
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 10px;
  margin-bottom: 30px;
`;

export const HeadingItinerary = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleContainer = styled.div`
  display: flex;
  height: auto;
`;
export const ItineraryButton = styled(Ancor)`
  display: flex;
  text-transform: uppercase;
  background-color: red;
  color: #fff;
  font-weight: bold;
  border: none;
  align-items: center;
  border-radius: 5px;
  height: 30px;
  cursor: pointer;
  padding: 5px;
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

export const FollowContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  margin: 20px 0 20px 0;
  padding: 20px;
  flex-direction: column;
`;
