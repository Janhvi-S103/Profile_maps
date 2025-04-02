import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Profile } from '../types';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  selectedProfile: Profile | null;
  isDarkMode: boolean;
}

const Map: React.FC<MapProps> = ({ selectedProfile }) => {
  const defaultPosition: [number, number] = [20.5937, 78.9629]; // Center of India
  const defaultZoom = selectedProfile ? 13 : 5;

  return (
    <MapContainer
      center={selectedProfile?.coordinates || defaultPosition}
      zoom={defaultZoom}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedProfile && (
        <Marker position={selectedProfile.coordinates}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg text-primary-main">{selectedProfile.name}</h3>
              <p className="text-sm text-gray-600">{selectedProfile.description}</p>
              <p className="text-sm font-medium mt-2">{selectedProfile.address}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;