import {React, Button, ButtonGroup, Panel} from "../../index";

export default class Buttons extends React.Component {

    render() {
        return <Panel header={<h1>Buttons</h1>}>
            <p><Button bsStyle="default">Default</Button> <Button bsStyle="default" disabled>Default</Button></p>
            <p><Button bsStyle="primary">Primary</Button> <Button bsStyle="primary" disabled>Primary</Button></p>
            <ButtonGroup>
                <Button bsStyle="default">Default</Button>
                <Button bsStyle="primary">Primary</Button>
            </ButtonGroup>
        </Panel>;
    }

}
