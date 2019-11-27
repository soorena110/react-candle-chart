import * as React from 'react';
import {ReactNode} from 'react';
import {CandleClassNamesInfo, CandleInfo} from "./models";
import './Candle.css';

interface Props {
    maxPrice: number;
    minPrice: number;
    maxVolume: number;

    candle: CandleInfo;
    doesTooltipOpenFromRight?: boolean;
    candleClassNames?: CandleClassNamesInfo;
    renderTooltip?: (candle: CandleInfo) => ReactNode;
}

const candlesHeightPercent = 70;
const gapPercent = 5;
const volumeBarsHeightPercent = 25;

export default class Candle extends React.Component<Props> {

    _renderCandleLine() {
        const {candle, maxPrice, minPrice} = this.props;

        const totalHeight = maxPrice - minPrice;
        const lineHeight = (candle.high - candle.low) / totalHeight * candlesHeightPercent;
        const lineTop = (maxPrice - candle.high) / totalHeight * candlesHeightPercent;

        const lineColor = "candle-base-line " + ((this.props.candleClassNames || {}).lines || 'candle-base-line-default');
        return <div className={lineColor} style={{
            height: lineHeight + '%',
            top: lineTop + '%'
        }}/>;
    }

    _renderCandleBar() {
        const {candle, maxPrice, minPrice} = this.props;

        const totalHeight = maxPrice - minPrice;
        const barHeight = Math.abs(candle.closing - candle.opening) / totalHeight * candlesHeightPercent;
        const barTop = (maxPrice - Math.max(candle.closing, candle.opening)) / totalHeight * candlesHeightPercent;

        const increasingClassName = (this.props.candleClassNames || {}).increaseBar || 'candle-bar-increase';
        const decreasingClassName = (this.props.candleClassNames || {}).decreaseBar || 'candle-bar-decrease';
        const barColor = candle.closing > candle.opening ? increasingClassName : decreasingClassName;

        return <div className={"candle-bar " + barColor}
                    style={{height: barHeight + '%', top: barTop + '%'}}/>;
    }


    _renderVolumeBar() {
        const {candle, maxVolume} = this.props;

        const volumeHeight = candle.volume / maxVolume * volumeBarsHeightPercent;
        const volumeTop = 100 -  volumeHeight;

        const className = 'candle-bar ' + ((this.props.candleClassNames || {}).volumeBars || 'candle-volume-bar-default');

        return <div className={className}
                    style={{height: volumeHeight + '%', top: volumeTop + '%'}}/>;
    }

    _renderTooltip() {
        const {candle} = this.props;
        const className = "candle-tooltip " + (this.props.doesTooltipOpenFromRight ? 'candle-tooltip-right' : '');

        if (this.props.renderTooltip)
            return <span className={className}>{this.props.renderTooltip(candle)}</span>;

        return <span className={className + ' candle-tooltip-default'}>
            <div>closing: {candle.closing}</div>
            <div>opening: {candle.opening}</div>
            <div>high: {candle.high}</div>
            <div>low: {candle.low}</div>
            <div>volume: {candle.volume}</div>
        </span>
    }

    render() {
        return <div className="candle">
            {this._renderCandleLine()}
            {this._renderCandleBar()}
            {this._renderVolumeBar()}
            {this._renderTooltip()}
        </div>
    }
}