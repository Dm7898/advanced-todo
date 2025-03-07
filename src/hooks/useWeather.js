import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_URL;

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);

  // Get User's Location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.error("Error fetching location:", err);
        setError("Location access denied.");
        setLoading(false);
      }
    );
  }, []);

  // Fetch Weather Data when coordinates are available
  useEffect(() => {
    if (!coords) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords]);

  return { weather, loading, error };
};

export default useWeather;
