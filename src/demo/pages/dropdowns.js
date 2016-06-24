import {
    React,
    Panel,
    RegularSelect,
    Block,
    Row,
    Col,
    Form,
    Icon,
    classnames,
    Dropdown,
    MenuItem,
    DropdownButton
} from '../../index';

const data = [{
    id: '111',
    label: 'My public dashbaard',
    isPublic: true
}, {
    id: '112',
    label: 'PRIVATE DASHBOARD xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    isPublic: false
},{
    id: '222',
    label: 'Item 3',
    isPublic: true
},{
    id: '33',
    label: 'the 4th one',
    isPublic: true
},{
    id: '4',
    label: 'FInAlly',
    isPublic: false
}
];
export default class Dropdowns extends React.Component {
    constructor( props, context ){
        super( props, context );

        this.state = {
            activeEventKey: '111'
        }
    }
    render() {
        return <Panel>
            <Block>
                <Row>
                    <Col xs={3}>
                        <h3> Filterable Regular Dropdown with Form-Icon left</h3>
                        <Form value={{dashboardSelector: this.state.activeEventKey }} onChange={ this.onSelectChangeWithForm.bind( this ) }
                        >
                            <RegularSelect
                                name="dashboardSelector"
                                testAutomationId="dashboard-selector"
                                isFilterable
                                label={ this.getItemLabel() }
                                block
                            >
                                { this.getMenuItems( true ) }
                            </RegularSelect>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <h3> Filterable Regular Dropdown without Form-Icon-right</h3>
                        <RegularSelect
                            name="dashboardSelector"
                            testAutomationId="dashboard-selector"
                            isFilterable
                            label={ this.getItemLabel() }
                            block
                            onChange={ this.onSelectChangeWithoutForm.bind( this ) }
                            value={ this.state.activeEventKey }
                        >
                            { this.getMenuItems() }
                        </RegularSelect>
                    </Col>
                    <Col xs={3}>
                        <h3>Non-filterable Regular Dropdown</h3>
                        <Form value={{dashboardSelector: this.state.activeEventKey }} onChange={ this.onSelectChangeWithForm.bind( this ) }
                        >
                            <RegularSelect
                                name="dashboardSelector"
                                testAutomationId="dashboard-selector"
                                label={ this.getItemLabel() }
                                block
                            >
                                { this.getMenuItems() }
                            </RegularSelect>
                        </Form>
                    </Col>
                </Row>
            </Block>
            <Block>
                <Row>
                    <Col xs={3}>
                        <h3>Normal Bootstrap Dropdowns</h3>
                        <Dropdown id="bootstrap-dropdown">
                            <Dropdown.Toggle noCaret>
                                normal
                                <Icon name="chevron-down-small" className="rc-icon-right"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <MenuItem eventKey="1">
                                    <Icon name="lock" className="rc-icon-left" />
                                    Item 1
                                </MenuItem>
                                <MenuItem eventKey="2">
                                    <Icon name="lock" className="rc-icon-right pull-right" />
                                    Item 1
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col xs={3}>
                        <h3>Bootstrap DropdownButton</h3>
                        <DropdownButton bsStyle='link' noCaret pullRight className="rc-button-icon-only"
                                        id='dropdown-button'
                                        title={<Icon name="more-vertical" />}>
                            <MenuItem eventKey="1"><Icon name="icon_d3_save" className="rc-icon-left"/>SETTINGS</MenuItem>
                            <MenuItem eventKey="2"><Icon name="icon_d3_save" className="rc-icon-left"/>DUPLICATE </MenuItem>
                            <MenuItem eventKey="3"><Icon name="delete" className="rc-icon-left"/>DELETE</MenuItem>
                        </DropdownButton>
                    </Col>
                </Row>
            </Block>
        </Panel>;
    }

    getMenuItems( iconLeft ){
        return _.map( data, ( item ) =>{
            let { label, id, isPublic } = item;
            var key = 'dashboard-'+id;
            return <RegularSelect.Option key={key} testAutomationId={key} value={id}>
                <Icon name="lock" className={classnames({
                    "rc-icon-left": iconLeft,
                    "rc-icon-right pull-right": !iconLeft
                }) }/>
                {label}
            </RegularSelect.Option>;
        });
    }

    getItemLabel(){
        let { activeEventKey } = this.state;
        let item = _.find( data, {id: activeEventKey});
        return item.label;
    }

    onSelectChangeWithForm( formData ){
        this.setState({
            activeEventKey: formData.dashboardSelector
        });
    }

    onSelectChangeWithoutForm( activeEventKey ){
        this.setState({
            activeEventKey
        });
    }

}
