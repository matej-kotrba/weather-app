import React from "react";
import styled from "styled-components";
import WeatherBoxSCSS from "../scss/components/weatherBox.module.scss";

const StyledDiv = styled("div")<{
  image: `./imgs/weatherTypes/${string}.png` | undefined;
}>`
  background-image: url(${(props) => (props.image ? props.image : "")});
`;

const StyledSmallWeatherBox = styled("div")<{
  image: `./imgs/weatherTypes/${string}.png` | undefined;
  appearDelay: number;
}>`
  animation-delay: ${(props) => props.appearDelay / 4}s !important;
  background-image: url(${(props) => (props.image ? props.image : "")});
`;

export function WeatherBox({
  children,
  image,
}: {
  children: React.ReactNode;
  image: string;
}) {
  return (
    <StyledDiv
      className={WeatherBoxSCSS.weatherBox}
      image={`./imgs/weatherTypes/day/${image?.toLowerCase()}.png`}
    >
      {children}
    </StyledDiv>
  );
}

export function WeatherBoxSmall({
  children,
  image,
  delayIterator,
}: {
  children: React.ReactNode;
  image: string;
  delayIterator: number;
}) {
  return (
    <StyledSmallWeatherBox
      className={WeatherBoxSCSS.weatherBoxSmall}
      image={`./imgs/weatherTypes/day/${image?.toLowerCase()}.png`}
      appearDelay={delayIterator}
    >
      {children}
    </StyledSmallWeatherBox>
  );
}
