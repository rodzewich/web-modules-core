import {
    React,
    Panel,
    TabPanel,
    TabItem,
    Block,
    Row,
    Col,
    TextInput,
    Input,
    Button,
    Icon,
    Checkbox,
    Static,
    Select,
    Radio,
    RadioControl,
    Table,
    GridRowActions,
    CheckboxGroup
} from "../../index";

export default class Panels extends React.Component {

    render() {
        let headerTabs = <div>
            <Block cancelTopOffset cancelHorizontalOffset>
                <TabPanel>
                    <TabItem to="/users" onlyActiveOnIndex>Users With Extensions</TabItem>
                    <TabItem to="/users/unassigned">Unassigned</TabItem>
                </TabPanel>
            </Block>
            <Block noOffset>
                <Row>
                    <Col xs={2}><TextInput placeholder="Foo"/></Col>
                    <Col xs={2}><TextInput placeholder="Foo"/></Col>
                </Row>
            </Block>
        </div>;

        let footer = <div>Footer</div>;

        return <div>
            <Panel footer={footer} header={[<h1>Header</h1>, <div>Some text</div>]}>

                <p>5 columns cannot be created in Bootstrap. There has to be either 4 or 6 of them.</p>

                <Input label="Selected Numbers:">
                    <Row>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                        <Col xs={2}>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                            <Static>(111) 222-3344</Static>
                        </Col>
                    </Row>
                </Input>

                <hr/>

                <p>This is actually a wrong layout. Contents may never be synchronized under headers of different
                   heights.</p>

                <Row>
                    <Col xs={6}>
                        <Input label="Super long title that definitely wraps is going right here lalala foo bar baz qux alpha beta gamma" help="There is an error" bsStyle="error">
                            <div className="form-inline rc-form-inline">
                                <Select style={{width: 80}}>
                                    <option>8**</option>
                                </Select>
                                <TextInput style={{width: 80}} placeholder="***"/>
                                <TextInput style={{width: 80}} placeholder="****"/>
                                <div className="form-group"><Button>Submit</Button></div>
                            </div>
                        </Input>
                    </Col>
                    <Col xs={6}>
                        <Input label={<span>Small title<br/><br/></span>}>
                            <Static>Image</Static>
                        </Input>
                    </Col>
                </Row>

                <hr/>

                <Input label="Enter the characters you see" help="There is an error" bsStyle="error">
                    <div className="form-inline rc-form-inline">
                        <img src="https://c22blog.files.wordpress.com/2010/10/input-black.gif" style={{width: 100, height: 32}}/>
                        <Button bsStyle="link" iconOnly><Icon name="resync"/></Button>
                        <TextInput style={{width: 80}} placeholder="Symbols"/>
                        <div className="form-group"><Button>Submit</Button></div>
                    </div>
                </Input>

                <hr/>

                <Input label="Checkboxes in columns">
                    <Row>
                        <Col xs={6}>
                            <Checkbox label="(111) 222-3344"/>
                            <Checkbox label="(111) 222-3344"/>
                            <Checkbox label="(111) 222-3344"/>
                        </Col>
                        <Col xs={6}>
                            <Checkbox label="(111) 222-3344"/>
                            <Checkbox label="(111) 222-3344"/>
                            <Checkbox label="(111) 222-3344"/>
                        </Col>
                    </Row>
                </Input>

                <hr/>

                <Input label="Vertical group of radios">
                    <Radio label="Auto-Receptionist"/>
                    <Radio label={<div>Extension:<br/>Admin User, Ext. 101<br/><Button>Select Extension</Button></div>}/>
                </Input>

                <hr/>

                <Input label="Vertical group of radios (control)">
                    <div><RadioControl>Auto-Receptionist</RadioControl></div>
                    <div><RadioControl><div>Extension:<br/>Admin User, Ext. 101<br/><Button>Select Extension</Button></div></RadioControl></div>
                </Input>

                <hr/>

                <Input label="Group of inline radios">
                    <RadioControl inline>Auto-Receptionist</RadioControl>
                    <RadioControl inline><div>Extension:<br/>Admin User, Ext. 101<br/><Button>Select Extension</Button></div></RadioControl>
                </Input>

            </Panel>

            <Panel footer={footer} header={headerTabs}>
                <Block cancelTopOffset cancelHorizontalOffset cancelBottomOffset>
                    <Table striped hover>
                        <thead>
                        <tr>
                            <th>Foo</th>
                            <th>Bar</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Foo</td>
                            <td>
                                <GridRowActions>
                                    <Button bsStyle="link">Foo</Button>
                                    <Button bsStyle="link">Bar</Button>
                                </GridRowActions>
                            </td>
                        </tr>
                        <tr>
                            <td>Foo</td>
                            <td>
                                <GridRowActions>
                                    <Button bsStyle="link">Foo</Button>
                                    <Button bsStyle="link">Bar</Button>
                                </GridRowActions>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Block>
            </Panel>
        </div>;
    }

}
