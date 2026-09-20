"use client";

import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type HotspotLocation = {
  location: string;
  latitude: number;
  longitude: number;
  riskScore: number;
  riskLevel: string;
  hotspot: boolean;
};

type HotspotMapProps = {
  location?: string;
  latitude?: number;
  longitude?: number;
  riskScore?: number;
  riskLevel?: string;
  hotspot?: boolean;
  locations?: HotspotLocation[];
};

export default function HotspotMap({
  location,
  latitude,
  longitude,
  riskScore,
  riskLevel,
  hotspot,
  locations,
}: HotspotMapProps) {
  const mapLocations: HotspotLocation[] =
    locations && locations.length > 0
      ? locations
      : latitude !== undefined &&
          longitude !== undefined &&
          location !== undefined &&
          riskScore !== undefined &&
          riskLevel !== undefined &&
          hotspot !== undefined
        ? [
            {
              location,
              latitude,
              longitude,
              riskScore,
              riskLevel,
              hotspot,
            },
          ]
        : [];

  const getRadius = (score: number) => {
    if (score >= 80) return 22;
    if (score >= 60) return 18;
    return 14;
  };

  const getFillColor = (
    score: number,
    isHotspot: boolean
  ) => {
    if (isHotspot || score >= 70) {
      return "#ef4444";
    }

    if (score >= 40) {
      return "#f59e0b";
    }

    return "#22c55e";
  };

  const getBorderColor = (
    score: number,
    isHotspot: boolean
  ) => {
    if (isHotspot || score >= 70) {
      return "#b91c1c";
    }

    if (score >= 40) {
      return "#d97706";
    }

    return "#15803d";
  };

  const center: [number, number] =
    mapLocations.length > 0
      ? [
          mapLocations[0].latitude,
          mapLocations[0].longitude,
        ]
      : [19.076, 73.8777];

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200">
      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapLocations.map((item) => (
          <CircleMarker
            key={`${item.location}-${item.latitude}-${item.longitude}`}
            center={[
              item.latitude,
              item.longitude,
            ]}
            radius={getRadius(item.riskScore)}
            pathOptions={{
              fillColor: getFillColor(
                item.riskScore,
                item.hotspot
              ),
              color: getBorderColor(
                item.riskScore,
                item.hotspot
              ),
              weight: 2,
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div className="min-w-[190px] space-y-2">
                <h3 className="text-base font-bold text-slate-900">
                  {item.location}
                </h3>

                <div className="text-sm text-slate-600">
                  Risk Score:{" "}
                  <span className="font-semibold text-slate-900">
                    {item.riskScore}%
                  </span>
                </div>

                <div className="text-sm text-slate-600">
                  Risk Level:{" "}
                  <span className="font-semibold text-slate-900">
                    {item.riskLevel}
                  </span>
                </div>

                <div className="text-sm text-slate-600">
                  Hotspot:{" "}
                  <span className="font-semibold text-slate-900">
                    {item.hotspot ? "Yes" : "No"}
                  </span>
                </div>

                <div className="text-xs text-slate-500">
                  Coordinates:{" "}
                  {item.latitude.toFixed(4)},{" "}
                  {item.longitude.toFixed(4)}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}