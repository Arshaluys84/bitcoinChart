import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import { setBitcoinData } from "../features/bitcoin/bitcoinSlice";
import { fetchBitcoinPrice } from "../api/coindesk";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BitcoinChart = () => {
  const bitcoinData = useSelector((state) => state.bitcoin);
  const dispatch = useDispatch();
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBitcoinPrice();
        const USD = data?.USD?.rate_float;
        const EUR = data?.EUR?.rate_float;
        const GBP = data?.GBP?.rate_float;
        dispatch(setBitcoinData({ USD, EUR, GBP }));
      } catch (error) {
        console.error("Error fetching Bitcoin price data:", error);
      }
    };

    fetchData();

    const updateChart = () => {
      const ctx = chartRef.current.chartInstance?.ctx;
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }

      chartRef.current.chartInstance?.update();
    };

    const interval = setInterval(() => {
      fetchData();
      updateChart();
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div>
      <h2>Bitcoin Price Chart</h2>
      <Line
        ref={chartRef}
        data={{
          labels: bitcoinData?.USD,
          datasets: [
            {
              label: "USD",
              data: [...bitcoinData?.USD],
              borderColor: "blue",
              yAxisID: "y",
            },
            {
              label: "EUR",
              data: [...bitcoinData?.EUR],
              borderColor: "green",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "GBP",
              data: [...bitcoinData?.GBP],
              borderColor: "purple",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            x: {
              display: false,
            },
            y: {
              title: {
                display: true,
                text: "Bitcoin Price",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BitcoinChart;
