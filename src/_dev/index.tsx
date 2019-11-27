import * as React from 'react';
import {render} from "react-dom";
import CandleChart from "../CandleChart";

declare const module: any;

class MainApplication extends React.Component {
    render() {
        return <div style={{
            width: 500,
            height: 200,
            position: 'absolute',
            left: 800,
            top: 300,
            border: 'solid 1px #eeeeee',
            padding: 5
        }}>
            <CandleChart candles={require('./testData.json')}/>
        </div>
    }
}

render(
    <MainApplication/>,
    document.getElementById("root")
);

module.hot.accept();