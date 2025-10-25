// Google Maps Integration Configuration
// This file contains the setup for integrating Google Maps

// Google Maps API Configuration
const GOOGLE_MAPS_CONFIG = {
    // Replace with your actual Google Maps API key
    API_KEY: 'YOUR_GOOGLE_MAPS_API_KEY',
    
    // Map locations
    LOCATIONS: {
        CEREMONY: {
            name: 'Gimnasio Moderno',
            address: 'Carrera 9 # 74 – 99, Bogotá, Colombia',
            lat: 4.6097, // Replace with actual coordinates
            lng: -74.0817, // Replace with actual coordinates
            description: 'Ceremonia de Matrimonio'
        },
        RECEPTION: {
            name: 'La Pradera de Potosí',
            address: 'Km 19 vía La Calera – Sopó, Cundinamarca, Colombia',
            lat: 4.8000, // Replace with actual coordinates
            lng: -74.0000, // Replace with actual coordinates
            description: 'Recepción de Matrimonio'
        }
    }
};

// Initialize Google Maps
function initGoogleMaps() {
    // Load Google Maps API
    if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_CONFIG.API_KEY}&callback=initMaps`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    } else {
        initMaps();
    }
}

// Initialize maps when API is loaded
function initMaps() {
    // Initialize ceremony map
    const ceremonyMapElement = document.getElementById('ceremony-map');
    if (ceremonyMapElement) {
        const ceremonyMap = new google.maps.Map(ceremonyMapElement, {
            center: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lng
            },
            zoom: 15,
            mapTypeId: 'roadmap',
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry.fill',
                    stylers: [{ weight: '2.00' }]
                },
                {
                    featureType: 'all',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#9c9c9c' }]
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text',
                    stylers: [{ visibility: 'on' }]
                },
                {
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [{ color: '#f2f2f2' }]
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'road',
                    elementType: 'all',
                    stylers: [{ saturation: -100 }, { lightness: 45 }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#eeeeee' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#7b7b7b' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'all',
                    stylers: [{ visibility: 'simplified' }]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#c8d7d4' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#070707' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }]
                }
            ]
        });

        // Add marker for ceremony
        const ceremonyMarker = new google.maps.Marker({
            position: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.lng
            },
            map: ceremonyMap,
            title: GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#d4af37" stroke="#fff" stroke-width="2"/>
                        <path d="M20 8 L24 16 L32 16 L26 22 L28 30 L20 26 L12 30 L14 22 L8 16 L16 16 Z" fill="#fff"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });

        // Add info window for ceremony
        const ceremonyInfoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #d4af37; font-family: 'Playfair Display', serif;">${GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.name}</h3>
                    <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Ceremonia</strong></p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">Viernes 9 de enero de 2026</p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">1:30 PM</p>
                    <p style="margin: 0; font-size: 12px; color: #666;">${GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY.address}</p>
                </div>
            `
        });

        ceremonyMarker.addListener('click', () => {
            ceremonyInfoWindow.open(ceremonyMap, ceremonyMarker);
        });
    }

    // Initialize reception map
    const receptionMapElement = document.getElementById('reception-map');
    if (receptionMapElement) {
        const receptionMap = new google.maps.Map(receptionMapElement, {
            center: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lng
            },
            zoom: 15,
            mapTypeId: 'roadmap',
            styles: [
                // Same styles as ceremony map
                {
                    featureType: 'all',
                    elementType: 'geometry.fill',
                    stylers: [{ weight: '2.00' }]
                },
                {
                    featureType: 'all',
                    elementType: 'geometry.stroke',
                    stylers: [{ color: '#9c9c9c' }]
                },
                {
                    featureType: 'all',
                    elementType: 'labels.text',
                    stylers: [{ visibility: 'on' }]
                },
                {
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [{ color: '#f2f2f2' }]
                },
                {
                    featureType: 'landscape',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'landscape.man_made',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'road',
                    elementType: 'all',
                    stylers: [{ saturation: -100 }, { lightness: 45 }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#eeeeee' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#7b7b7b' }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'all',
                    stylers: [{ visibility: 'simplified' }]
                },
                {
                    featureType: 'road.arterial',
                    elementType: 'labels.icon',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [{ visibility: 'off' }]
                },
                {
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{ color: '#c8d7d4' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{ color: '#070707' }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{ color: '#ffffff' }]
                }
            ]
        });

        // Add marker for reception
        const receptionMarker = new google.maps.Marker({
            position: {
                lat: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lat,
                lng: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.lng
            },
            map: receptionMap,
            title: GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#d4af37" stroke="#fff" stroke-width="2"/>
                        <path d="M20 8 L24 16 L32 16 L26 22 L28 30 L20 26 L12 30 L14 22 L8 16 L16 16 Z" fill="#fff"/>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
            }
        });

        // Add info window for reception
        const receptionInfoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #d4af37; font-family: 'Playfair Display', serif;">${GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.name}</h3>
                    <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>Recepción</strong></p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">Viernes 9 de enero de 2026</p>
                    <p style="margin: 0 0 5px 0; font-size: 14px;">4:00 PM – 2:00 AM</p>
                    <p style="margin: 0; font-size: 12px; color: #666;">${GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION.address}</p>
                </div>
            `
        });

        receptionMarker.addListener('click', () => {
            receptionInfoWindow.open(receptionMap, receptionMarker);
        });
    }
}

// Fallback function for when Google Maps API is not available
function initMapsFallback() {
    const mapPlaceholders = document.querySelectorAll('.map-placeholder');
    mapPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const isCeremony = placeholder.id === 'ceremony-map';
            const location = isCeremony 
                ? GOOGLE_MAPS_CONFIG.LOCATIONS.CEREMONY
                : GOOGLE_MAPS_CONFIG.LOCATIONS.RECEPTION;
            
            const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
            window.open(mapUrl, '_blank');
        });
    });
}

// Setup instructions for Google Maps integration
const MAPS_SETUP_INSTRUCTIONS = `
GOOGLE MAPS INTEGRATION SETUP:

1. Get a Google Maps API key:
   - Go to Google Cloud Console
   - Create a new project or select existing
   - Enable Maps JavaScript API
   - Create credentials (API Key)
   - Restrict the API key to your domain for security

2. Update the coordinates in GOOGLE_MAPS_CONFIG.LOCATIONS:
   - Get the exact coordinates for your ceremony and reception venues
   - Replace the placeholder lat/lng values with actual coordinates

3. Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key

4. Include this script in your HTML:
   <script src="google-maps-config.js"></script>

5. Call initGoogleMaps() when the page loads

6. Make sure to enable the following APIs in Google Cloud Console:
   - Maps JavaScript API
   - Places API (optional, for enhanced location features)
   - Geocoding API (optional, for address conversion)

7. For production, make sure to:
   - Restrict your API key to your domain
   - Set up billing (Google Maps API requires billing)
   - Monitor usage to avoid unexpected charges
`;

console.log(MAPS_SETUP_INSTRUCTIONS);

// Export functions for use in main script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGoogleMaps,
        initMaps,
        initMapsFallback,
        GOOGLE_MAPS_CONFIG
    };
}
