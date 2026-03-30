"use client"
import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/mapPicker"), {
    ssr: false,
});


export default function GetCoordinates({ onLocationSelect }) {
  return <MapPicker onLocationSelect={onLocationSelect} />;
}