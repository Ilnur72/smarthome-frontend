// import {
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMapEvents,
// } from "react-leaflet";

// import { FaMapMarkerAlt } from "react-icons/fa";
// import L from "leaflet";
// import icon from "leaflet/dist/images/marker-icon.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
// import { layer } from "../assets/layer";
// import { useState } from "react";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const center = [41.2995, 69.2401];

// function MapClick({ onLocationChange }) {
//   useMapEvents({
//     click(e) {
//       const { lat, lng } = e.latlng;
//       onLocationChange([lat, lng]);
//     },
//   });
//   return null;
// }

// export function LocationPicker({ onLocationSelect }) {
//   const [position, setPosition] = useState(center);
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleLocationChange = (newPosition) => {
//     setPosition(newPosition);
//     onLocationSelect(newPosition);
//   };

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="relative w-full">
//       <div
//         className={`
//             transition-all duration-300 ease-in-out 
//             ${isExpanded ? "h-[500px]" : "h-24"}
//             w-full 
//             border 
//             rounded-lg 
//             overflow-hidden 
//             relative
//           `}
//       >
//         <MapContainer
//           center={center}
//           zoom={15}
//           style={{ height: "100%", width: "100%" }}
//           scrollWheelZoom={false}
//           attributionControl={false}
//         >
//           <TileLayer
//             maxNativeZoom={layer.maxNativeZoom}
//             url={layer.url}
//             attribution={layer.attribution}
//             key={layer.name}
//             maxZoom={20}
//           />
//           <MapClick onLocationChange={handleLocationChange} />
//           <Marker position={position}>
//             <Popup>Selected Location</Popup>
//           </Marker>
//         </MapContainer>

//         {/* Overlay for small view */}
//         <div
//           className={`
//               absolute 
//               inset-0 
//               bg-black/30 
//               flex 
//               items-center 
//               justify-center 
//               ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
//               transition-opacity 
//               duration-300
//             `}
//         >
//           <div className="flex items-center text-white">
//             <FaMapMarkerAlt className="mr-2" />
//             <span>Click to select location</span>
//           </div>
//         </div>
//       </div>

//       {/* Expand/Collapse Button */}
//       <button
//         onClick={toggleExpand}
//         className="
//             mt-2 
//             w-full 
//             bg-primary-500 
//             text-white 
//             py-2 
//             rounded 
//             flex 
//             items-center 
//             justify-center 
//             hover:bg-primary-600 
//             transition-colors
//           "
//       >
//         {isExpanded ? "Collapse Map" : "Expand Map"}
//       </button>

//       {/* Location Coordinates Display */}
//       <div className="mt-2 text-sm text-gray-600">
//         Coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
//       </div>
//     </div>
//   );
// }