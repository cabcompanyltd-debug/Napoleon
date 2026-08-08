import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { FARMS_DATA, COMPANY_INFO } from '../../data/companyData';
import { MapPin, Navigation, Maximize2, Layers, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  highlightFarmId?: string;
  showAllFarms?: boolean;
  heightClass?: string;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initialCenter = COMPANY_INFO.headquarters.coordinates,
  initialZoom = 9,
  highlightFarmId,
  showAllFarms = true,
  heightClass = 'h-[450px]',
  className = ''
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeTile, setActiveTile] = useState<'street' | 'satellite' | 'dark'>('street');
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    subtitle: string;
    coords: [number, number];
    isHq?: boolean;
    slug?: string;
  }>({
    name: COMPANY_INFO.name + ' Headquarters',
    subtitle: COMPANY_INFO.headquarters.fullAddress,
    coords: COMPANY_INFO.headquarters.coordinates,
    isHq: true
  });

  const tileUrls = {
    street: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Fix default marker icon issues in Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
    });

    // Create Map
    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      scrollWheelZoom: false
    });

    const tileLayer = L.tileLayer(tileUrls[activeTile], {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Trigger map resize to ensure tiles render reliably
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 250);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 800);

    // Custom Icons
    const createCustomIcon = (isHq: boolean) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="w-8 h-8 rounded-full ${isHq ? 'bg-[#A3E635] text-[#0B2B1B]' : 'bg-[#1E5E3A] text-white'} border-2 border-white shadow-lg flex items-center justify-center font-bold text-xs transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
              ${isHq ? 'HQ' : '✦'}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });
    };

    // Add HQ Marker
    const hqMarker = L.marker(COMPANY_INFO.headquarters.coordinates, {
      icon: createCustomIcon(true)
    }).addTo(map);

    hqMarker.bindPopup(`
      <div class="p-1 text-slate-900 font-sans">
        <span class="text-[10px] uppercase font-bold text-[#1E5E3A] tracking-wider">Corporate Headquarters</span>
        <h4 class="font-bold text-base mt-0.5">${COMPANY_INFO.name}</h4>
        <p class="text-xs text-slate-600 my-1">${COMPANY_INFO.headquarters.fullAddress}</p>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(COMPANY_INFO.headquarters.fullAddress)}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5E3A] hover:underline mt-2"
        >
          <span>Get Directions</span> &rarr;
        </a>
      </div>
    `);

    hqMarker.on('click', () => {
      setSelectedLocation({
        name: COMPANY_INFO.name + ' Headquarters',
        subtitle: COMPANY_INFO.headquarters.fullAddress,
        coords: COMPANY_INFO.headquarters.coordinates,
        isHq: true
      });
    });

    markersRef.current['hq'] = hqMarker;

    // Add Farm Markers if requested
    if (showAllFarms) {
      FARMS_DATA.forEach((farm) => {
        const farmMarker = L.marker(farm.coordinates, {
          icon: createCustomIcon(false)
        }).addTo(map);

        farmMarker.bindPopup(`
          <div class="p-1 text-slate-900 font-sans">
            <span class="text-[10px] uppercase font-bold text-[#1E5E3A] tracking-wider">${farm.farmType}</span>
            <h4 class="font-bold text-sm mt-0.5">${farm.name}</h4>
            <p class="text-xs text-slate-600 my-1">${farm.location}, ${farm.region}</p>
            <p class="text-xs font-medium text-emerald-800 my-1">Size: ${farm.sizeAcres} Acres</p>
            <a 
              href="#/operations/farms/${farm.slug}"
              class="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5E3A] hover:underline mt-1"
            >
              <span>View Farm Estate</span> &rarr;
            </a>
          </div>
        `);

        farmMarker.on('click', () => {
          setSelectedLocation({
            name: farm.name,
            subtitle: `${farm.location} • ${farm.sizeAcres} Acres`,
            coords: farm.coordinates,
            isHq: false,
            slug: farm.slug
          });
        });

        markersRef.current[farm.id] = farmMarker;
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [initialCenter, initialZoom, showAllFarms]);

  // Update tile layer
  const changeTileLayer = (tileType: 'street' | 'satellite' | 'dark') => {
    if (!mapInstanceRef.current) return;
    setActiveTile(tileType);

    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrls[tileType], {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);
  };

  const centerOnLocation = (coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, 12, { duration: 1.5 });
    }
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-[#1E5E3A]/20 shadow-2xl bg-[#0B2B1B] ${className}`}>
      {/* Map Container */}
      <div ref={mapContainerRef} className={`w-full ${heightClass} z-10`} />

      {/* Tile Controls */}
      <div className="absolute top-4 right-4 z-20 bg-[#0B2B1B]/90 backdrop-blur-md border border-[#A3E635]/30 rounded-xl p-1.5 flex gap-1 shadow-lg text-white text-xs">
        <button
          onClick={() => changeTileLayer('street')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTile === 'street' ? 'bg-[#1E5E3A] text-[#A3E635] font-bold' : 'hover:bg-white/10'}`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Street</span>
        </button>
        <button
          onClick={() => changeTileLayer('satellite')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTile === 'satellite' ? 'bg-[#1E5E3A] text-[#A3E635] font-bold' : 'hover:bg-white/10'}`}
        >
          <span>Satellite</span>
        </button>
        <button
          onClick={() => changeTileLayer('dark')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${activeTile === 'dark' ? 'bg-[#1E5E3A] text-[#A3E635] font-bold' : 'hover:bg-white/10'}`}
        >
          <span>Dark</span>
        </button>
      </div>

      {/* Selected Location Bottom Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#0B2B1B]/95 backdrop-blur-md border border-[#1E5E3A]/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-[#1E5E3A] text-[#A3E635] shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3E635]">
              {selectedLocation.isHq ? 'HQ Address' : 'Selected Farm Site'}
            </span>
            <h4 className="font-bold text-sm sm:text-base text-white">{selectedLocation.name}</h4>
            <p className="text-xs text-emerald-200/80 line-clamp-1">{selectedLocation.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => centerOnLocation(selectedLocation.coords)}
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#1E5E3A] hover:bg-[#287547] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-[#A3E635]/20"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Center Map</span>
          </button>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedLocation.subtitle)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#A3E635] hover:bg-[#84CC16] text-[#0B2B1B] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
};
