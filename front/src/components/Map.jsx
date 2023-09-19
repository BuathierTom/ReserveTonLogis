import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

function Map({ giteLocation }) {
  const [userLocation, setUserLocation] = useState(null);

  // Fonction pour activer la localisation de l'utilisateur
  const activateUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
    }
    else {
      alert("La géolocalisation n'est pas disponible sur votre navigateur");
    }
  };

  useEffect(() => {
    if (userLocation) {
      const map = L.map("map");
      map.setView(userLocation, 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(giteLocation[0], giteLocation[1]),
        ],
      }).addTo(map);

      L.marker(userLocation).addTo(map).bindPopup("Votre emplacement");
      L.marker(giteLocation).addTo(map).bindPopup("Gîte");
    }
  }, [userLocation, giteLocation]);

  return (
    <div className="map-container">
      <h2 className="map__title">Itinéraire vers le gîte</h2>
      <button className="map__button" onClick={activateUserLocation}>
        Activer la localisation
      </button>
      <div id="map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
}

export default Map;
