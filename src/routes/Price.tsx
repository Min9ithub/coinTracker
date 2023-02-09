import { useQuery } from "react-query";
import { useOutletContext } from "react-router";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 50000,
    }
  );

  let validData = data ?? [];
  if ("error" in validData) {
    validData = [];
  }

  return (
    <div>
      {isLoading ? (
        "Loading price..."
      ) : (
        <ApexChart
          type="bar"
          series={[
            {
              data: validData?.slice(0, 10).map((price) => ({
                x: new Date(price.time_close),
                // y: price.close,
                y: Math.floor(+price.close),
              })),
            },
          ]}
          chart={{
            height: 300,
            width: 500,
            type: "bar",
          }}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              type: "bar",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            plotOptions: {
              bar: {
                borderRadius: 10,
                dataLabels: {
                  position: "top",
                },
              },
            },

            xaxis: {
              type: "datetime",
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            colors: ["#0fbcf9"],
            yaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
