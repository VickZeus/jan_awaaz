"use client";

import { useEffect } from "react";
export default function LocationTracker() {
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition((pos) => {
            sessionStorage.setItem("latitude", pos.coords.latitude);
            sessionStorage.setItem("longitude", pos.coords.longitude);
        });
    }, []);

    return null;
}