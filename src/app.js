import * as React from 'react';
import { useState } from 'react';
import { render } from 'react-dom';
import MapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from '@goongmaps/goong-map-react';

import ControlPanel from './control-panel';
import Pins from './pins';
import CityInfo from './city-info';

import CITIES from './helpers/fake_data/cities.json';
import CinemaForm from './cinemaForm';

const TOKEN = ''; // Set your goong maptiles key here

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: '10px'
};

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: -100,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupForm, setPopupForm] = useState(null)
  const [latitude,setLatitude] = useState(null)
  const [longitude,setLongtitude] = useState(null)
  const [dataCinema,setDataCinema] = useState(null)
  return (
    <>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="https://tiles.goong.io/assets/navigation_day.json"
        onViewportChange={setViewport}
        goongApiAccessToken={"4dAgWahZ3jW5LsZCiYikMTvVUOYpd2jcmxz3kyLA"}
        onClick={e => {
          setLongtitude(e.lngLat[0])
          setLatitude(e.lngLat[1])
          setPopupForm(true)
        }}
      >
        <Pins data={CITIES} onClick={setPopupInfo} />

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
            style={{background:"#ccc"}}
          >
            <CinemaForm />
          </Popup>
        )}

        <GeolocateControl style={geolocateStyle} />
        <FullscreenControl style={fullscreenControlStyle} />
        <NavigationControl style={navStyle} />
        <ScaleControl style={scaleControlStyle} />
      </MapGL>

      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  render(<App />, container);
}
