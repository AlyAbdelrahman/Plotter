import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import PropTypes from 'prop-types';

/**
 * ChartBuilder component which generate the chart using (X-Y) Axes data
 * @param  {Array} data array of values for the chart and it's corresponding Axis name
 * @param  {Boolean} propsChardBuilderData used for testing the component to check if there's data passed to the component or not 
 * @param  {Boolean} propsLoadingChart used for testing the component to check if the component rendered or not
 */
const ChartBuilder = ({ data, propsChardBuilderData, propsLoadingChart }) => {
    const [chardBuilderData, setChartBuilderData] = useState(propsChardBuilderData || {});
    const [loadingChart,setLoadingChart] = useState(propsLoadingChart ||  false);
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
                    }                }
            }
        }
    };

    useEffect(() => {
        setLoadingChart(true)
        if (data.length) {
            const chartData = {
                labels: [
                    ...data[0].values
                ],
                backgroundColor: ['rgba(255,0,0,1)'],
                lineTension: 1,
                datasets: [
                    {
                        label: data[1].name,
                        fill: true,
                        borderColor: "rgba(255, 0, 0, 0.3)",
                        borderWidth: 3,
                        pointRadius: 3,
                        data: [...data[1].values]
                    },

                ]
            };
            setChartBuilderData(chartData);
            setTimeout(() => {
                setLoadingChart(false)
            }, 500);
        }else{
            setChartBuilderData({})
        }
    }, [data])
    const chart = useMemo(() => {
        return Object.entries(chardBuilderData).length > 1 && !loadingChart ? <Line data={chardBuilderData} options={options} data-test='data-chart'  /> : <p data-test='chart-Empty-Alert'>loading chart</p>
    }, [chardBuilderData,loadingChart])
    return (
        <div>
            {chart}
        </div>
    )
}

ChartBuilder.defaultProps = {
    data: [],
    propsChardBuilderData: false,
    propsLoadingChart: false
}
ChartBuilder.prototype = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        values: PropTypes.arrayOf(String),
    })),
    propsChardBuilderData: PropTypes.bool,
    propsLoadingChart: PropTypes.bool
}
export default ChartBuilder;