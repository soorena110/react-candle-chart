import * as React from 'react';
import './style.css';
import {CandleChartProps, CandleInfo} from "./models";
import Candle from "./Candle";

export default class CandleChart extends React.Component<CandleChartProps> {
    private _min = -999999;
    private _max = 999999;

    constructor(props: CandleChartProps) {
        super(props);
        this._computeMinAndMax(props.candles);
    }


    private _computeMinAndMax(candles: CandleInfo[]) {
        this._min = Math.min(...candles.map(r => r.low));
        this._max = Math.max(...candles.map(r => r.high));
    }

    render() {
        return <div className="candle-chart">
            {this.props.candles.map((candle, ix) => (
                <Candle key={candle.time} candle={candle} max={this._max} min={this._min}
                        doesTooltipOpenFromRight={ix > this.props.candles.length / 2}
                        renderTooltip={this.props.renderTooltip}
                        candleClassNames={this.props.candleClassNames}
                />))}
        </div>
    }
}