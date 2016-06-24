import {React, Panel, ReactVis} from "../../index";

let {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    LineSeries
} = ReactVis;

export default class Graphs extends React.Component {

    constructor() {
        super();
        this.state = {
            data: this.generateData()
        };
    }

    generateData() {
        return ([0,0,0,0,0,0,0,0,0,0]).map((item, index)=> {
            return {
                x: index + 1,
                y: Math.random() * 10
            };
        });
    }

    componentWillMount() {
        this.interval = setInterval(()=> {
            this.setState({
                data: this.generateData()
            });
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {

        return <div>

            <Panel header={<h1>Data Visualization</h1>}>

                <XYPlot
                    width={900}
                    height={300}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries
                        data={this.state.data} animation={true}/>
                    <VerticalBarSeries
                        data={this.state.data} animation={true}/>
                    <LineSeries
                        data={this.state.data} animation={true}/>
                </XYPlot>

            </Panel>
        </div>;
    }

}
