import {ReactNode} from "react";

export interface CandleInfo {
    closing: number;
    opening: number;
    high: number;
    low: number;
    volume: number;
    time: number;
}

export interface CandleClassNamesInfo {
    increaseBar?: string;
    decreaseBar?: string;
    volumeBars?: string;
    lines?: string;
}

export interface CandleChartProps {
    candleClassNames?: CandleClassNamesInfo;
    renderTooltip?: (candle: CandleInfo) => ReactNode;
    candles: CandleInfo[];
}