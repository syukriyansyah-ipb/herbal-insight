import React from 'react'
import maplibregl from 'maplibre-gl'

const showMaps = () => {
    const mapElementRef = useRef(null);
    const mapRef = useRef(null);
    const [mapLoad, setMapLoad] = useState(false)

    useEffect(() => {
        setMapLoad(false);
        mapRef.current = new maplibregl.Map({
        container: mapElementRef.current,
        showLabels:false,
        style: {
        version: 8,
        glyphs:
        'https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=hgAoOG3XNi47hsyAbIsj',
        sources: {
        'raster-tiles': {
        type: 'raster',
        tiles: [
        'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=hgAoOG3XNi47hsyAbIsj',
        ],
        tileSize: 256,
        },
        },
        layers: [
        {
        id: 'raster-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 24,
        },
        ],
        },
        bounds: [
        [106.14177, -7.703153],
        [108.905747, -5.87488],
        ],
        zoom: 4,
        maxZoom: 20,
        minZoom: 3,
        });
        
        mapRef.current.addControl(
        new maplibregl.NavigationControl({ showZoom: false }),
        'bottom-left'
        );
        
        mapRef.current.on('load', () => {
        setMapLoad(true);
        });
        // map.value = mapRef.current;
        return () => {
        mapRef.current.remove();
        // map.value = null;
        setMapLoad(false);
        };
        }, []);

  return (
    <div>showMaps</div>
  )
}

export default showMaps