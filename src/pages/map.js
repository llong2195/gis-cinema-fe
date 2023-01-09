import * as React from "react";
import { useState, useEffect } from "react";
import { render } from "react-dom";
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "@goongmaps/goong-map-react";

import ControlPanel from "./control-panel";
import Pins from "./pins";
import CityInfo from "./city-info";

import CinemaForm from "./cinemaForm";
import { getListCinema } from "../helpers/app_backend/cinema-backend-helper";
const TOKEN = ""; // Set your goong maptiles key here

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 21.046459624337025,
    longitude: 105.78512234850211,
    zoom: 14,
    bearing: 0,
    pitch: 0,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupForm, setPopupForm] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [dataCinema, setDataCinema] = useState(null);
  const [dataListCinema, setDataListCinema] = useState([]);
  const [dataSearchChoose, setDataSearchChoose] = useState({});
  const fetchCinemas = async () => {
    await getListCinema().then((res) => {
      setDataListCinema(res.body);
    });
  };

  const onClickItemSearchHandler = (item) => {
    setViewport({
      latitude: item.latitude,
      longitude: item.longitude,
      zoom: 14,
      bearing: 0,
      pitch: 0,
    });
  };

  useEffect(() => {
    fetchCinemas();
  }, []);
  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/navigation_day.json"
        onViewportChange={setViewport}
        goongApiAccessToken={"4XHVFQeEIt5Yg4ssP9XbohU2MNMk1ewMgUP41l8w"}
        onClick={(e) => {
          console.log(e.lngLat[0], e.lngLat[1]);
          setLongtitude(e.lngLat[0]);
          setLatitude(e.lngLat[1]);
          setPopupForm(true);
          setPopupInfo(false);
        }}
      >
        {dataListCinema.length > 0 ? (
          <Pins
            data={dataListCinema}
            onClick={setPopupInfo}
            setPopupForm={setPopupForm}
          />
        ) : (
          <></>
        )}

        {popupInfo && (
          <Popup
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
          >
            <CityInfo info={popupInfo} />
          </Popup>
        )}

        {popupForm && latitude && longitude && (
          <Popup
            tipSize={5}
            anchor="top"
            closeOnClick={false}
            onClose={setPopupForm}
            longitude={longitude}
            latitude={latitude}
            style={{ background: "#ccc" }}
          >
            <CinemaForm
              latitude={latitude}
              longitude={longitude}
              fetchCinemas={fetchCinemas}
              setPopupForm={setPopupForm}
            />
          </Popup>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>

      <ControlPanel onClickItemSearchHandler={onClickItemSearchHandler} />
    </>
  );
}
