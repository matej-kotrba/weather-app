import { useContext, Fragment, useCallback } from "react";
import { BsCloudRainHeavy } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import WeatherBoxSCSS from "../scss/components/weatherBox.module.scss";
import TextField from "../components/TextField";
import Box from "../components/Box";
import { WeatherBox, WeatherBoxSmall } from "../components/WeatherBox";
import { WeatherContext } from "../App";
import { TbFaceIdError } from "react-icons/tb";

function WeatherPage() {
  const context = useContext(WeatherContext);

  const getWindDirection = useCallback((deg: number) => {
    if (deg > 360) deg %= 360;

    if ((deg >= 337.5 && deg <= 360) || (deg >= 0 && deg <= 22.5)) return "N";
    else if (deg > 22.5 && deg <= 67.5) return "NE";
    else if (deg > 67.5 && deg <= 112.5) return "E";
    else if (deg > 112.5 && deg <= 157.5) return "SE";
    else if (deg > 157.5 && deg <= 202.5) return "S";
    else if (deg > 202.5 && deg <= 247.5) return "SW";
    else if (deg > 247.5 && deg <= 292.5) return "W";
    else if (deg > 292.5 && deg <= 337.5) return "NW";
  }, []);

  return (
    <Fragment>
      <TextField />
      <Box>
        <WeatherBox
          image={context?.state.currentLocation.main || "Clear"}
          key={context?.state.currentLocation.cityName || ""}
        >
          {context?.state.currentLocation.cityName !== "" ? (
            <>
              <h2
                style={{
                  marginBlock: "10px",
                }}
              >
                {context?.state.currentLocation.cityName || "Prague"}
              </h2>
              <div style={{ width: "100%" }}>
                <h6>{context?.state.currentLocation.time}</h6>
                <div
                  className={WeatherBoxSCSS.dataBox}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h6
                    className={
                      WeatherBoxSCSS.popup +
                      " " +
                      WeatherBoxSCSS.weather +
                      " " +
                      WeatherBoxSCSS.iconValueBox
                    }
                  >
                    <BsCloudRainHeavy /> {context?.state.currentLocation.rain}{" "}
                    mm
                  </h6>
                  <h6
                    className={
                      WeatherBoxSCSS.popup +
                      " " +
                      WeatherBoxSCSS.humidity +
                      " " +
                      WeatherBoxSCSS.iconValueBox
                    }
                  >
                    <WiHumidity /> {context?.state.currentLocation.humidity} %
                  </h6>
                </div>
                <h5 className={WeatherBoxSCSS.tempature}>
                  {context?.state.currentLocation.tempature.toFixed(1)}°C
                </h5>
                <div
                  className={WeatherBoxSCSS.dataBox}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h6 className={WeatherBoxSCSS.iconValueBox}>
                    <FaWind /> {context?.state.currentLocation.speed} m/s
                  </h6>
                  <div
                    className={WeatherBoxSCSS.windCircle}
                    style={{
                      rotate: context?.state.currentLocation.deg + "deg",
                    }}
                  >
                    <h6
                      style={{
                        rotate: context?.state.currentLocation.deg
                          ? -context.state.currentLocation.deg + "deg"
                          : "",
                      }}
                    >
                      {context
                        ? getWindDirection(context.state.currentLocation.deg)
                        : "ERR"}
                    </h6>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                gap: "15px",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h5>Please select valid city name</h5>
              <TbFaceIdError style={{ fontSize: "5rem" }} />
            </div>
          )}
        </WeatherBox>
        <div
          className={WeatherBoxSCSS.forecastContainer}
          key={context?.state.currentLocation.cityName + "Container"}
        >
          {context?.state.forecast.array.map((item, index) => {
            return (
              <WeatherBoxSmall
                key={index}
                delayIterator={index}
                image={item.main || "Clear"}
              >
                <h6 className={WeatherBoxSCSS.date}>{item.date}</h6>
                <h6 className={WeatherBoxSCSS.time}>{item.time}</h6>
                <h5 className={WeatherBoxSCSS.tempature}>
                  {item.tem.toFixed(1)}°C
                </h5>
                <h6
                  className={
                    WeatherBoxSCSS.popup +
                    " " +
                    WeatherBoxSCSS.weather +
                    " " +
                    WeatherBoxSCSS.iconValueBox
                  }
                >
                  <BsCloudRainHeavy /> {item.rain} mm
                </h6>
              </WeatherBoxSmall>
            );
          })}
        </div>
      </Box>
    </Fragment>
  );
}

export default WeatherPage;
