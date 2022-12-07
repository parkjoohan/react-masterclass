import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    isDark: boolean;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId, isDark }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 10000,
    });
    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "price",
                                data: data?.map(price => price.close) as number[]
                            }
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
                            grid: {
                                show: false,
                            },
                            xaxis: {
                                axisBorder: { show: false },
                                axisTicks: { show: false },
                                labels: { show: false },
                                type: "datetime",
                                categories: data?.map(price => (price.time_close * 1000))
                            },
                            yaxis: {
                                labels: {
                                    show: false,
                                }
                            },
                            stroke: {
                                curve: "smooth",
                                width: 4,
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["#0be881"],
                                    stops: [0,100]
                                },
                            },
                            colors: ["#0fbcf9"],
                            tooltip: {
                                y: {
                                    formatter: (val) => `$ ${val.toFixed(2)}`
                                }
                            }
                    }}
                />
            )}
        </div>
    )
}
export default Chart;