import * as React from 'react';
import './style.css';
import {CandleChartProps, CandleInfo} from "./models";
import Candle from "./Candle";

export default class CandleChart extends React.Component<CandleChartProps> {
    private _minPrice = -999999;
    private _maxPrice = 999999;
    private _maxVolume = 999999;

    constructor(props: CandleChartProps) {
        super(props);
        this._computeMinAndMax(props.candles);
    }


    private _computeMinAndMax(candles: CandleInfo[]) {
        this._minPrice = Math.min(...candles.map(r => r.low));
        this._maxPrice = Math.max(...candles.map(r => r.high));
        this._maxVolume = Math.max(...candles.map(r => r.volume));
    }

    render() {
        return <div className="candle-chart">
            {this.props.candles.map((candle, ix) => (
                <Candle key={candle.time} candle={candle}
                        maxPrice={this._maxPrice} minPrice={this._minPrice} maxVolume={this._maxVolume}
                        doesTooltipOpenFromRight={ix > this.props.candles.length / 2}
                        renderTooltip={this.props.renderTooltip}
                        candleClassNames={this.props.candleClassNames}
                />))}
        </div>
    }
}