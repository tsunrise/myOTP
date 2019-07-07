import * as React from 'react';
import {Stack, ProgressIndicator} from "office-ui-fabric-react";

interface Props {
    /**
     * Time Stamp
     */
    nextUpdate: number,
    maxTimeLeft: number
}

interface State {
    timerID: number,
    remainTime: number,
    percentageDone: number
}

export class TimeLeft extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        this._updateRemainTime = this._updateRemainTime.bind(this);
        this.state = {timerID: window.setInterval(this._updateRemainTime, 50),remainTime:0,
        percentageDone:0}
    }

    private _updateRemainTime(): void{
        const remainTime = Math.max(0, this.props.nextUpdate - Date.now());
        this.setState({remainTime: remainTime,
            percentageDone: TimeLeft._percentageDone(remainTime, this.props.maxTimeLeft)})

    }

    private static _percentageDone(remainTime: number, maxTimeLeft: number): number{
        return 100 - (remainTime / maxTimeLeft) * 100
    }

    render(): React.ReactNode {
        return <Stack>
            <ProgressIndicator description={Math.round(this.state.remainTime / 1000)} percentComplete={this.state.percentageDone / 100}/>
        </Stack>;
    }


}