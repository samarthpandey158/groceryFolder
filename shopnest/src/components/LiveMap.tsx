"use client"
interface ILocation {
  latitude: number;
  longitude: number;
}

interface IProps {
  userLocation: ILocation;
  deliveryBoyLocation: ILocation;
}
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
function Recenter({
  positions,
}: {
  positions: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    if (positions[0] !== 0 && positions[1] !== 0) {
      map.setView(positions, map.getZoom(), {
        animate: true,
      });
    }
  }, [positions, map]);

  return null;
}
function LiveMap({ userLocation, deliveryBoyLocation }: IProps) {
    const deliveryBoyIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9561/9561688.png",
        iconSize: [45, 45],
        });

    const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/4821/4821951.png",
    iconSize: [45, 45],
    });
    const center =  [userLocation.latitude, userLocation.longitude];
    const linePositions =
    deliveryBoyLocation && userLocation
      ? [
          [userLocation.latitude, userLocation.longitude],
          [
            deliveryBoyLocation.latitude,
            deliveryBoyLocation.longitude,
          ],
        ]
      : [];



      const [route, setRoute] = useState<[number, number][]>([]);

useEffect(() => {
  async function getRoute() {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLocation.longitude},${userLocation.latitude};${deliveryBoyLocation.longitude},${deliveryBoyLocation.latitude}?overview=full&geometries=geojson`
      );

      const data = await response.json();

      if (data.routes?.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates;

        setRoute(
          coordinates.map(
            ([longitude, latitude]: [number, number]) =>
              [latitude, longitude]
          )
        );
      }
    } catch (error) {
      console.error("Route fetch error:", error);
    }
  }

  if (userLocation && deliveryBoyLocation) {
    getRoute();
  }
}, [userLocation, deliveryBoyLocation]);
return (
  <div className="w-full h-[500px] z-0 rounded-xl overflow-hidden shadow relative">
    <MapContainer
      center={center as LatLngExpression}
      zoom={13}
      scrollWheelZoom={true}
      className="w-full h-full"
    >
      <Recenter positions={center as any}/>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

          <Marker
      position={[userLocation.latitude, userLocation.longitude]}
      icon={userIcon}
    >
        <Popup>Delivery Address</Popup>
      </Marker>

      {deliveryBoyLocation && (
        <Marker
          position={[
            deliveryBoyLocation.latitude,
            deliveryBoyLocation.longitude,
          ]}
          icon={deliveryBoyIcon}
        >
          <Popup>Delivery Boy</Popup>
        </Marker>
      )}

      {/* <Polyline positions={linePositions as any} color="green" /> */}
        


        {route.length > 0 && (
  <Polyline positions={route} color="green" weight={5} />
)}
    </MapContainer>
  </div>
);
}

export default LiveMap;
