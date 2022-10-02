import React from "react";
import styled from "styled-components";

const StyledDiv = styled("div")`
  background-color: #0000008d;
  padding: 25px;

  & > a {
    position: relative;
    text-decoration: none;
    color: royalblue;

    &::before {
      content: "";
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: royalblue;
      transform: scaleX(0);
      transition: transform 0.4s ease;
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }
`;

function Footer() {
  return (
    <StyledDiv>
      Author: <a href="https://matejkotrba.vercel.app">Matěj Kotrba</a>
    </StyledDiv>
  );
}

export default Footer;
