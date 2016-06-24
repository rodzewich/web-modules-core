import {React, Menu, Row, Col, Icon, OverlayTrigger, Tooltip} from "../../index";

const tooltip = <Tooltip>Also includes layout demos</Tooltip>;

const menus = [
    {
        link: '/buttons',
        name: <span>Buttons</span>,
        icon: 'add'
    },
    {
        link: '/panels',
        name: <span>Panels <OverlayTrigger overlay={tooltip} placement="bottom"><Icon name="more-information"/></OverlayTrigger></span>,
        icon: 'download-meetings-mobile-app'
    },
    {
        link: '/popups',
        name: <span>Popups</span>,
        icon: 'templates'
    },
    {
        link: '/graphs',
        name: <span>Graphs</span>,
        icon: 'templates'
    },
    {
        link: '/forms',
        name: <span>Forms</span>,
        icon: 'templates'
    }
];

export default class Layout extends React.Component {

    render() {
        return <div className="bootstrap-rc">
            <Row>
                <Col sm={2} xs={2}>
                    <Menu>{menus}</Menu>
                </Col>
                <Col sm={10} xs={10}>
                    {this.props.children}
                </Col>
            </Row>
        </div>;
    }
}
