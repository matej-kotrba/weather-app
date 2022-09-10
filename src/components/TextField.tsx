import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { TiZoom } from "react-icons/ti";
import {
  fetchDataByLocation,
  fetchForecastByLocation,
} from "../fetchFile/fetchFile";
import { WeatherContext } from "../App";

const StyledDiv = styled("div")`
  width: min(300px, 100vw);
  height: 100px;
  padding: 15px;
  /* border: pink 2px solid; */
  border-radius: 0 15px 15px 0;
  display: flex;
  flex-direction: row;
  gap: 0;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  & > input {
    height: max(50%, 25px);
    width: 100%;
    font-size: 1.5rem;
    border-radius: 15px;
    border: 2px solid black;
    text-indent: 10px;
    transition: 0.2s;
    border: 3px black solid;
    outline: 2px white solid;

    &::before {
      content: "Search for city ...";
      inset: 0;
      position: absolute;
      color: black;
    }

    &:focus {
      height: 80%;
      border-radius: 10px;
    }
  }

  & > div {
    & > svg {
      display: block;
      font-size: 3rem;
      transform-origin: 20% 80%;
      cursor: pointer;

      &:hover {
        animation: rotateMag 0.4s ease;
      }
    }
  }

  @keyframes rotateMag {
    0%,
    100% {
      rotate: 0deg;
    }
    33% {
      rotate: 6deg;
    }
    66% {
      rotate: -6deg;
    }
  }
`;

function TextField() {
  const inputRef = useRef<HTMLInputElement>(null);

  const context = useContext(WeatherContext);
  const dispatch = context?.dispatch;

  function handleClick() {
    if (dispatch && inputRef.current?.value) {
      fetchDataByLocation(dispatch, inputRef.current?.value);
      fetchForecastByLocation(dispatch, inputRef.current?.value);
      localStorage.setItem("lastLocation", inputRef.current?.value);
    }
  }

  useEffect(() => {
    const storageLastLocation = localStorage.getItem("lastLocation");
    if (storageLastLocation !== null && dispatch) {
      fetchDataByLocation(dispatch, storageLastLocation);
      fetchForecastByLocation(dispatch, storageLastLocation);
    }
  }, [dispatch]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  return (
    <StyledDiv>
      <input
        ref={inputRef}
        type={"text"}
        placeholder="Search for city..."
        onKeyDown={(e) => handleKeyDown(e)}
      ></input>
      <div onClick={handleClick}>
        <TiZoom />
      </div>
    </StyledDiv>
  );
}

export default TextField;
