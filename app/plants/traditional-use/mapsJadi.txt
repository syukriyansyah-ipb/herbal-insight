'use client'
import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl';

import { getTradisionalUse } from '@/api/reasonings';

// const data = [{
//     name: 'Ageratina riparia',
//     description: 'Description of Ageratina riparia',
//     location: {
//         properties: {
//             kecamatan: "Bengkayang",
//             id: "Loc-00000001",
//             provinsi: "Kalimantan Barat",
//             kel_desa: "Gerantung",
//             long: "109.17444953835523",
//             lat: "0.9347330942291079",
//             kab_kota: "Monterado"
//         }
//     }
// }]

const Maps = ({ plantName }) => {
    const contentRef = useRef(null);
    const mapElementRef = useRef(null);
    const [contentPopup, setContentPopup] = useState({});
    const showMap = async () => {
        const map = new maplibregl.Map({
            container: mapElementRef.current,
            style: 'https://api.maptiler.com/maps/streets/style.json?key=RFLeqoTvQAwwRUw6Ozzv',
            bounds: [
                [106.14177, -7.703153],
                [108.905747, -5.87488],
            ],
            zoom: 4,
            maxZoom: 20,
            minZoom: 3,
        });
        // if(data){
        const response = await getTradisionalUse(plantName);
        console.log('data respon', response?.data);

        const dataMap = response?.data?.map((item) => {
            // const dataMap = data?.map((item) => {
            return {
                type: 'Feature',
                properties: {
                    description: `${item.plant.properties.label} adalah spesies tanaman yang dikenal sebagai ${item.plant_part.properties["label@id"]} yang digunakan oleh suku ${item.ethnic.properties.label} di provinsi ${item.ethnic.properties.province} sebagai ${item.traditional_use.properties.label} dengan cara ${item.method_of_use.properties.label}.`,
                    name: item.plant.properties.label
                    // address: item.location.properties,
                    // kel : item.location.properties.kel_desa,
                    // kec : item.location.properties.kecamatan,
                    // kab : item.location.properties.kab_kota,
                    // prov : item.location.properties.provinsi,
                    // name: item.name,

                    // 'description' : '<strong>dsadasdasdasdasdasdassadsad</strong>'
                    // description : `<p>Plant Part : ${item.plant_part?.properties?.label} <br /> Traditional Use : ${item.traditional_use?.properties?.label} <br /> Method of Use : ${item.method_of_use?.properties?.label}</p>`,
                    // // id: index,
                    // data : {
                    //     plant_part: item.plant_part?.properties?.label,
                    //     traditional_use: item.traditional_use?.properties?.label,
                    //     method_of_use: item.method_of_use?.properties?.label
                    // }
                },
                geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(item.location.properties.long), parseFloat(item.location.properties.lat)]
                },
            }
        })
        console.log('dataMap', dataMap);

        map.on('load', async () => {
            const image = await map.loadImage('https://maplibre.org/maplibre-gl-js/docs/assets/custom_marker.png');
            // Add an image to use as a custom marker
            map.addImage('custom-marker', image.data);
            // Add a GeoJSON source with 15 points
            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': dataMap
                }
            });

            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'custom-marker',
                    "icon-overlap": "always"
                }
            });

            // Focus on the first location from the data
            const firstLocation = dataMap[0]?.geometry?.coordinates;
            if (firstLocation) {
                map.flyTo({
                    center: firstLocation,
                    zoom: 7, // Adjust the zoom level as needed
                    essential: true // Ensures the flyTo action is performed immediately
                });
            }
            // Create a popup, but don't add it to the map yet.
            const popup = new maplibregl.Popup({
                closeButton: false,
                closeOnClick: false
            });
            map.on('click', 'places', (e) => {
                // Change the cursor style as a UI indicator.
                // map.getCanvas().style.cursor = 'pointer';

                const coordinates = e.features[0].geometry.coordinates.slice();
                const description = e.features[0].properties.description;
                console.log('desc', description);
                console.log('address', e.features[0].properties.address);

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                setContentPopup({
                    description: description,
                    coordinates: coordinates,
                    name: e.features[0].properties.name,
                    // address: e.features[0].properties.address,
                    // kel: e.features[0].properties.kel,
                    // kec: e.features[0].properties.kec,
                    // kab: e.features[0].properties.kab,
                    // prov: e.features[0].properties.prov,

                })
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                // popup.setLngLat(coordinates).setHTML(description).setMaxWidth('300px').addTo(map);
                console.log('coordinates', coordinates);

                new maplibregl.Popup({
                    closeButton: false,
                    offset: [0, -375]
                })
                    .setMaxWidth('300px')
                    .setLngLat(coordinates)
                    .setDOMContent(contentRef.current)
                    .addTo(map);
            });

            map.on('mouseenter', 'conferences', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'places', () => {
                map.getCanvas().style.cursor = '';
                // popup.remove();
            });
        });
        // }


    }

    useEffect(() => {
        showMap()

    }, [plantName])
    return (
        <>
            <div ref={mapElementRef} className='w-full h-[400px] relative overflow-hidden'>
                <div className='hidden'>
                    <div ref={contentRef} className='bg-[#ffffff] rounded-lg px-5 py-5 shadow-xl'>
                        <p className='font-medium text-lg'>{contentPopup.name} </p>
                        <p className='text-xs text-slate-500  mt-2'>{contentPopup.description}</p>
                        {/* <p className='text-xs text-slate-500 mt-1'>kel. {contentPopup.kel}, kec. {contentPopup.kec}, kab. {contentPopup.kab}, {contentPopup.prov} </p> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Maps
