'use client'
import { getTradisionalUsePlant } from '@/api/reasonings';
import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl';
import Empty from "@/public/assets/images/empty.svg";
import Image from 'next/image';

async function TraditionalUse({ plantName }) {
    const data = await getTradisionalUsePlant(0, 10, plantName)
    //  const traditionalUse = data?.data || null;
    const traditionalUse = data ? Object.values(data.data) : null;

    const displayPlantName = traditionalUse && traditionalUse.length > 0
        ? traditionalUse[0]?.plant?.properties?.label || 'Unknown Plant'
        : 'Loading...';
    return (
        <>
            <h1 className=' text-center mb-5 text-xl '>Mapping the Locations of <span className='font-bold text-[#335230]'>{displayPlantName}</span> Production in Indonesia</h1>
            <Maps plantName={plantName} />
            <h1 className=' text-center mt-16 text-xl '>Details of <span className='font-bold text-[#335230]'>{displayPlantName}</span></h1>
            <div className=' mx-auto overflow-hidden '>
                {/* <div className='w-[100%] h-[350px] border relative' ref={mapElementRef} ></div> */}
                <div className='flex flex-col mb-5  overflow-auto mt-5'>
                    {traditionalUse ? (
                        <table className='text-sm text-left text-gray-500  border-spacing-y-4 border-spacing-x-4 min-w-max '>
                            <thead className='bg-[#50744C] text-white text-center '>
                                <tr>
                                    <th className='sticky top-0 border w-10 h-10 '>No</th>
                                    <th className='sticky top-0 border w-28'>Plant</th>
                                    <th className='sticky top-0 border w-28'>Plant Part</th>
                                    <th className='sticky top-0 border w-28'>Traditional Use</th>
                                    <th className='sticky top-0 border w-28'>Method of Use</th>
                                    <th className='sticky top-0 border w-28'>Ethnic</th>
                                    <th className='sticky top-0 border w-36'>Location</th>
                                    <th className='sticky top-0 border w-40'>Reference</th>
                                    <th className='sticky top-0 border w-28'>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {traditionalUse.map((item, index) => (
                                    <tr key={index}>
                                        <td className='items-center justify-center px-3 border border-y-[#50744C]  '>{index + 1}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.plant?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.plant_part?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.traditional_use?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.method_of_use?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.ethnic?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>
                                            <p>Kelurahan desa {item.location.properties.kel_desa || "-"} berada di kecamatan {item.location.properties.kecamatan || "-"},
                                                kabupaten {item.location.properties.kab_kota || "-"}, provinsi {item.location.properties.provinsi || "-"},
                                                dengan koordinat lintang {item.location.properties.lat || "-"} dan bujur {item.location.properties.long || "-"}</p></td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.reference?.properties?.label || '-'}</td>
                                        <td className='border text-center border-y-[#50744C]'>{item?.user?.properties?.fullname || '-'}</td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    ) : (<div className="flex flex-col justify-center items-center py-3">
                        <Image src={Empty} height={200} width={200} />
                        <p className="text-sm md:text-base">Traditional Use not available</p>
                    </div>)}
                    {/* <Maps/> */}

                </div>
            </div>
        </>
    )
}

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
        const data = await getTradisionalUsePlant(0, 10, plantName);
        const traditionalUse = data ? Object.values(data.data) : null;

        const dataMap = traditionalUse?.map((item, index) => {
            // const dataMap = data?.map((item) => {
            return {
                type: 'Feature',
                properties: {
                    description: `${item.plant.properties.label} adalah spesies tanaman yang dikenal sebagai ${item.plant_part.properties["label@id"]} yang digunakan oleh suku ${item.ethnic.properties.label} di provinsi ${item.ethnic.properties.province} sebagai ${item.traditional_use.properties.label} dengan cara ${item.method_of_use.properties.label}.`,
                    name: item.plant.properties.label,
                    index: index
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
                    offset: [0, -780]
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

export default TraditionalUse;