'use client'
import React, { useState, useEffect, Fragment } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, scales } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getTopTraditionalUse } from '@/api/reasonings';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
    const [sortedData, setSortedData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTopTraditionalUse(); // Panggil API
                console.log(response)
                // Ambil data count dari properti yang sesuai di API
                const formattedData = response.map(item => ({
                    label: item.properties.label,
                    value: item.count
                }));


                // Sorting dan mengambil 5 data terbesar
                const sorted = formattedData.sort((a, b) => b.value - a.value).slice(0, 5);
                setSortedData(sorted);
                console.log(sorted)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        labels: sortedData ? sortedData.map(item => item.label) : [],
        datasets: [{
            label: 'Top Data of Traditional Use',
            data: sortedData ? sortedData.map(item => item.value) : [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
        }]
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                labels: {
                    fontSize: 16
                }
            }
        },
    }
    return (
        <Fragment>
            <div>
                {sortedData ? (
                    <Bar data={chartData} options={options} height={400} />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='mt-3'>
                <h1>The Most Commonly Used Benefits in Traditional Medicine</h1>
                {sortedData?.map((data, index) => (
                    <div key={index}>
                        <span className='font-bold text-slate-900'>
                            {index + 1}. {data.label}
                            </span> 
                    </div>
                ))}
            </div>
        </Fragment>

    )
}

export default BarChart