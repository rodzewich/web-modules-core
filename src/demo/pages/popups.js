import {React, Panel, Popup, TabPanel, TabItem, Block, Button, Menu, Row, Col, Media, Icon} from "../../index";

class WidgetButton extends React.Component {
    render() {
        return (
            <Media className="rc-media-clickable">
                <Media.Left>
                    <Icon name="templates"/>
                </Media.Left>
                <Media.Body>
                    <Media.Heading>Media Heading</Media.Heading>
                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin
                       commodo.</p>
                </Media.Body>
            </Media>
        );
    }
}

export default class Panels extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: null
        };
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(type) {
        this.setState({modal: type});
    }

    closeModal() {
        this.setState({modal: null});
    }

    render() {

        let headerTabs = <Block cancelTopOffset cancelBottomOffset cancelHorizontalOffset>
            <TabPanel noBorder>
                <TabItem to="/users" active>Users With Extensions</TabItem>
                <TabItem to="/users/unassigned">Unassigned</TabItem>
            </TabPanel>
        </Block>;

        let footer = <div>Footer</div>;

        const menus = [
            {
                onClickHandler: () => {},
                name: <span>Buttons</span>,
                icon: 'add',
                className: 'active'
            },
            {
                onClickHandler: () => {},
                name: <span>Panels</span>,
                icon: 'download-meetings-mobile-app'
            },
            {
                onClickHandler: () => {},
                name: <span>Popups</span>,
                icon: 'templates'
            }
        ];

        return <Panel header={<h1>Modals</h1>}>

            <p><Button onClick={this.openModal.bind(this, 'regular')}>Regular</Button></p>
            <p><Button onClick={this.openModal.bind(this, 'tabs')}>Tabs</Button></p>
            <p><Button onClick={this.openModal.bind(this, 'menu')}>Menu</Button></p>

            {this.state.modal == 'regular' ?
             <Popup footer={footer} title="Header" onHide={this.closeModal}>
                 <Row>
                     <Col xs={6}>
                         <WidgetButton/>
                         <WidgetButton/>
                         <WidgetButton/>
                         <WidgetButton/>
                     </Col>
                     <Col xs={6}>
                         <WidgetButton/>
                         <WidgetButton/>
                         <WidgetButton/>
                         <WidgetButton/>
                     </Col>
                 </Row>
             </Popup> : null}

            {this.state.modal == 'tabs'
                ? <Popup footer={footer} header={headerTabs} onHide={this.closeModal} bsSize="small">
                      XXX
                  </Popup>
                : null}

            {this.state.modal == 'menu' ? <Popup footer={footer} title="Menu" onHide={this.closeModal} bsSize="large">

                <Row>
                    <Col xs={3}>
                        <Menu sub>{menus}</Menu>
                    </Col>
                    <Col xs={8} xsOffset={1}>

                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                           voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                           cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                           voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                           cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                           labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                           laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                           voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                           cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    </Col>
                </Row>

            </Popup> : null}

        </Panel>;
    }

}
