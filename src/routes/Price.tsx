import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface PriceProps {
    coinId: string;
    isDark: boolean;
}

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

function Price({ coinId, isDark }: PriceProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));

    data?.map((price) => price.close);

    return (
        <div>
        {isLoading ? (
            "Loading Price..."
        ) : (
            <ApexChart
            type="candlestick"
            series={[
                {
                    data: data?.map((price) => {
                        return {
                            x: price.time_close,
                            y: [price.open, price.high, price.low, price.close],
                        };
                    }) as any,
                },
            ]}
            options={{
                theme: {
                    mode: isDark ? "dark" : "light"
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false,
                    },
                    background: "transparent",
                },
                grid: { show: false },
                stroke: {
                    curve: "smooth",
                    width: 4,
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
                    type: "datetime",
                },
                fill: {
                    type: "gradient",
                    gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(3)}`,
                    },
                },
            }}
            ></ApexChart>
        )}
        </div>
    );
}

export default Price;