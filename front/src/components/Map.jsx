import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map({ giteLocation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationActivated, setLocationActivated] = useState(false);

  // Fonction pour activer la localisation de l'utilisateur
  const activateUserLocation = () => {
    if (!locationActivated && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      });
      setLocationActivated(true); // Marquer la localisation comme activée
    }
    else if (locationActivated) {
      alert("La localisation a déjà été activée.");
    }
    else {
      alert("La géolocalisation n'est pas disponible sur votre navigateur");
    }
  };

  useEffect(() => {
    if (userLocation) {
      const map = L.map("map");
      map.setView(userLocation, 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(userLocation),
          L.latLng(giteLocation[0], giteLocation[1]),
        ],
        language: 'fr', // Spécifie la langue française

      }).addTo(map);

      L.marker(userLocation).addTo(map).bindPopup("Votre emplacement");
      L.marker(giteLocation).addTo(map).bindPopup("Gîte");
    }
  }, [userLocation, giteLocation]);

  return (
    <>
      <h2 className="map__title">Itinéraire vers le gîte</h2>
      {locationActivated ? null : (
        <div className="map__button-container">
      <button className="map__button" onClick={activateUserLocation}>
        <span className="map__box">
               Activer la localisation
        </span>
      </button>
 
      </div>
      )}

      {locationActivated ? (
        <div className="map__container">
          <div id="map" className="map__content"></div>
        </div>
      ) : null}
      
      
      
    </>
  );
}

export default Map;

