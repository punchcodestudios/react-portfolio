import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  ColorScheme,
  Marker,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Geocode from "react-geocode";
import { useGeolocated } from "react-geolocated";
import { useForm } from "react-hook-form";
import ButtonControl from "../common/button/button.control";
import SearchInput from "../common/search-input/search-input";

export interface UserLocation {
  latitude: number;
  longitude: number;
}

const LocationMap = () => {
  const mapProps = {
    defaultZoom: 10,
    defaultCenter: { lat: 41.881832, lng: -87.623177 },
  };

  const handleAddressSearch = () => {
    console.log("handleAddressSearch: ");
  };

  return (
    <APIProvider apiKey="AIzaSyDHJUwOxjJvMfz7NeA0M53K1PRGFfCCamw">
      {/* <div style={{ width: "1050px", height: "200px" }}> */}
      <Map {...mapProps}>
        <MapControl position={ControlPosition.TOP_CENTER}>
          <SearchInput
            placeholderText="search by address"
            clickEvent={handleAddressSearch}
          ></SearchInput>
        </MapControl>
      </Map>
      {/* </div> */}
    </APIProvider>
  );
};

export default LocationMap;
