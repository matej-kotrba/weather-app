import React from "react";
import styled from "styled-components";

const StyledDiv = styled("div")`
  padding: 25px;
  background-color: whitesmoke;
  border-radius: 20px;
  border: black 3px solid;
`;

function Box({ children }: { children: React.ReactNode }) {
  return <StyledDiv>{children}</StyledDiv>;
}

export default Box;
