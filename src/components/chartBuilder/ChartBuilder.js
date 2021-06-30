import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const ChartBuilder = ({ data, propsChardBuilderData }) => {
    const [chardBuilderData, setChartBuilderData] = useState(propsChardBuilderData || {});
    const options = {
        legend: {
            position: "right",
            labels: {
                boxWidth: 10
            }
        },
        tooltips: {
            enabled: true,
          },
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: data[1].name,
                    font: {
                        size: 15
                    }
                },
                ticks: {
                    precision: 0
                }
            },
            xAxes: {
                title: {
                    display: true,
                    text: data[0].name,
                    font: {
                        size: 15
                    }
                }
            }
        }
    };
    
    useEffect(() => {
        if (data.length) {
            const chartData = {
                labels: [
                    ...data[0].values
                ],
                backgroundColor: ['rgba(255,0,0,1)'],
                lineTension: 1,
                datasets: [
                    {
                        label: "cost",
                        fill: true,
                        borderColor: "rgba(255, 0, 0, 0.3)",
                        borderWidth: 3,
                        pointRadius: 3,
                        data: [...data[1].values]
                    },

                ]
            };
            setChartBuilderData(chartData);
        }
    }, [data])
    return (
        <div>
            {Object.entries(chardBuilderData).length ? <Line data={chardBuilderData} options={options} data-test='data-chart'/> : <p data-test='chart-Empty-Alert'>no chart yet</p>}
        </div>
    )
}
export default ChartBuilder;