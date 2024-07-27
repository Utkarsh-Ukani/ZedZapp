import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "../../components/ui/button";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    lable: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    lable: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    lable: "1 Month",
    value: 30,
  },
];

const CryptoChart = () => {
  const [chartData, setChartData] = useState({ prices: [] });

  const [activeLable, setActiveLabel] = useState("1 Day");

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Map the fetched data to match the format required by ApexCharts
        console.log(data);
        const formattedData = data.prices.map(([timestamp, value]) => ({
          x: new Date(timestamp),
          y: value,
        }));
        setChartData({ prices: formattedData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleActiveLabel = (value) => {
    setActiveLabel(value);
  };
  return (
    <div>
      <div className="space-x-3">
        {timeSeries.map((item) => (
          <Button
          variant={activeLable==item.lable?"":"outline"}
            onClick={() => handleActiveLabel(item.lable)}
            key={item.lable}
          >
            {item.lable}
          </Button>
        ))}
      </div>
      <div id="chart-timelines" style={{ width: "100%" }}>
        <ReactApexChart
          options={options}
          series={[{ data: chartData.prices }]}
          type="area"
          height={450}
          width={710}
        />
      </div>
    </div>
  );
};

export default CryptoChart;
