'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-polylinedecorator';
import { useEffect } from 'react';

const ArrowDecorator = ({ routes }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || routes.length === 0) return;

    const allLayers = [];

    routes.forEach((route) => {
      const latlngs = route.map(([lng, lat]) => [lat, lng]);

      const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
      allLayers.push(polyline);

      const decorator = L.polylineDecorator(polyline, {
        patterns: [
          {
            offset: '5%',
            repeat: 100,
            symbol: L.Symbol.arrowHead({
              pixelSize: 10,
              polygon: false,
              pathOptions: { stroke: true, color: 'blue' },
            }),
          },
        ],
      });

      decorator.addTo(map);
      allLayers.push(decorator);
    });

    return () => {
      allLayers.forEach((layer) => {
        map.removeLayer(layer);
      });
    };
  }, [map, routes]);

  return null;
};

const RouteMap = ({ coordinates }) => {
  if (!coordinates || coordinates.length === 0) return null;

  // Uses first route’s first point as center
  const center = coordinates[0][0].slice().reverse();

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ArrowDecorator routes={coordinates} />
    </MapContainer>
  );
};

export default RouteMap;