import * as React from 'react';
import {ReactNode} from 'react';
import {CandleClassNamesInfo, CandleInfo} from "./models";
import './Candle.css';

interface Props {
    max: number;
    min: number;
    candle: CandleInfo;
    doesTooltipOpenFromRight?: boolean;
    candleClassNames?: CandleClassNamesInfo;
    renderTooltip?: (candle: CandleInfo) => ReactNode;
}

export default class Candle extends React.Component<Props> {

    _renderCandleLine() {
        const {candle, max, min} = this.props;

        const totalHeight = max - min;
        const lineHeight = (candle.high - candle.low) / totalHeight * 100;
        const lineTop = (max - candle.high) / totalHeight * 100;

        const lineColor = "candle-base-line " + ((this.props.candleClassNames || {}).lines || 'candle-base-line-default');
        return <div className={lineColor} style={{
            height: lineHeight + '%',
            top: lineTop + '%'
        }}/>;
    }

    _renderCandleBar() {
        const {candle, max, min} = this.props;

        const totalHeight = max - min;
        const barHeight = Math.abs(candle.closing - candle.opening) / totalHeight * 100;
        const barTop = (max - Math.max(candle.closing, candle.opening)) / totalHeight * 100;

        const increasingClassName = (this.props.candleClassNames || {}).increaseBar || 'candle-bar-increase';
        const decreasingClassName = (this.props.candleClassNames || {}).decreaseBar || 'candle-bar-decrease';
        const barColor = candle.closing > candle.opening ? increasingClassName : decreasingClassName;

        return <div className={"candle-bar " + barColor}
                    style={{height: barHeight + '%', top: barTop + '%'}}/>;
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
        </span>
    }

    render() {
        return <div className="candle">
            {this._renderCandleLine()}
            {this._renderCandleBar()}
            {this._renderTooltip()}
        </div>
    }
}