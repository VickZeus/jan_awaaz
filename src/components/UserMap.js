"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import {useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RecenterMap({ latitude, longitude }) {
    const map = useMap();
    useEffect(() => {
        map.setView([latitude, longitude], 16, {
            animate: true,
        });
    }, [latitude, longitude, map]);
    return null;
}


export default function UserMap({ latitude, longitude }) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
      className="w-full h-20 rounded-sm flex justify-center mb-5"
    >

    <RecenterMap
        latitude={latitude}
        longitude={longitude}
    />

      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>

      <Marker position={[latitude, longitude]}>
      </Marker>
    </MapContainer>
  );
}