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

import ControlPanel from "./pages/control-panel";
import Pins from "./pages/pins";
import CityInfo from "./pages/city-info";

import CITIES from "./helpers/fake_data/cities.json";
import CinemaForm from "./pages/cinemaForm";
import { getListCinema } from "./helpers/app_backend/cinema-backend-helper";
import CinemaFormEdit from "./pages/cinemaFormEdit";
import SlidingPanel from "react-sliding-side-panel";
import { withRouter, useHistory } from "react-router-dom";

const TOKEN = process.env.REACT_APP_GOONGAPI || ""; // Set your goong maptiles key here

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
function App() {
  const history = useHistory();
  const [dataEdit, setDataEdit] = useState(null);
  const [viewport, setViewport] = useState({});
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupForm, setPopupForm] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongtitude] = useState(null);
  const [dataCinema, setDataCinema] = useState(null);
  const [dataListCinema, setDataListCinema] = useState([]);
  const [itemSearch, setItemSearch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const fetchCinemas = async () => {
    await getListCinema().then((res) => {
      setDataListCinema(res.body);
    });
  };
  const onClickItemSearchHandler = (item) => {
    setViewport({
      latitude: item.latitude,
      longitude: item.longitude,
      zoom: 17,
      bearing: 0,
      pitch: 0,
    });
    setItemSearch(item);
    setPopupInfo(item);
    setPopupForm(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("GisToken")) {
      history.push("/SignIn");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setViewport({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 15,
        bearing: 0,
        pitch: 1,
      });
    }),
      fetchCinemas();
  }, []);

  return (
    <React.Fragment>
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
          setPopupInfo(null);
          setIsEdit(false);
        }}
      >
        {dataListCinema?.length > 0 ? (
          <Pins
            data={dataListCinema}
            onClick={setPopupInfo}
            setPopupForm={setPopupForm}
            setItemSearch={setItemSearch}
            setDataEdit={setDataEdit}
            setIsView={setIsView}
            setIsEdit={setIsEdit}
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
            <CityInfo
              info={popupInfo}
              setIsEdit={setIsEdit}
              setPopupInfo={setPopupInfo}
              isEdit={isEdit}
              fetchCinemas={fetchCinemas}
            />
          </Popup>
        )}

        {popupForm && latitude && longitude && !isEdit && (
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

      <ControlPanel
        onClickItemSearchHandler={onClickItemSearchHandler}
        userLocation={userLocation}
        setIsEdit={setIsEdit}
      />
    </React.Fragment>
  );
}
export default withRouter(App);

// export function renderToDom(container) {
//   render(<App />, container);
// }
