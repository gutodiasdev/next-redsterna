import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

export const Input = styled.input`
  display: none;
`;

export const Star = styled(AiFillStar)`
  cursor: pointer;
  transition: color 200ms;
`;
