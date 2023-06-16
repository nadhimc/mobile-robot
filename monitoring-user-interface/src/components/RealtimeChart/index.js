import { Chart } from "chart.js";
import React, { useRef, useEffect } from "react";
import "chartjs-adapter-moment";

const RealtimeChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Data Real-time",
            data: data,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: {
            type: "time",
            time: {
              displayFormats: {
                second: "HH:mm:ss",
              },
            },
            title: {
              display: true,
              text: "Waktu",
            },
          },
          y: {
            title: {
              display: true,
              text: "Nilai",
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default RealtimeChart;
