'use strict';

import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import Modal from "react-bootstrap/lib/Modal";

export class Popup extends React.Component {
    static close() {
        // Component unmounting should be out of call stack to avoid errors with DOM events handling
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('popup-container'));
        }, 1);
    }

    static defaultProps = {
        testAutomationId: "popup",
        borderedTitle: false
    };

    static propTypes = {
        borderedTitle: React.PropTypes.bool,
        onClose: React.PropTypes.func,
        testAutomationId: React.PropTypes.string,
        header: React.PropTypes.any,
        footer: React.PropTypes.any
    };

    constructor(props, context) {
        super(props, context);

        this.hideModal = () => {
            (this.props.onClose || Popup.close)();
        };
    }

    componentDidMount() {
        document.body.className += document.body.className.length ? ' rc-modal-open' : 'rc-modal-open';
    }

    componentWillUnmount() {
        document.body.className = document.body.className.replace(/ ?rc-modal-open/, '');
    }

    render() {
        var footer = null;
        var title = null;

        if (this.props.footer) {
            footer = <Modal.Footer data-test-automation-id="popupFooter">
                {this.props.footer}
            </Modal.Footer>;
        }

        if (this.props.title) {
            title = <Modal.Title
                data-test-automation-id="title"
                className={classnames({"bordered-modal-title": this.props.borderedTitle})}>
                {this.props.title}
            </Modal.Title>;
        }

        return (
            <Modal
                show={true}
                data-test-automation-id={this.props.testAutomationId}
                container={document.getElementById('popup-container')}
                {...this.props}
                className={classnames("static-modal", {
                    'rc-popup-noPadding': this.props.noPadding,
                    'rc-popup-noBottomPadding': this.props.noBottomPadding,
                    'rc-popup-noHeaderPadding': this.props.noHeaderPadding
                }, this.props.className)}>

                <Modal.Header
                    data-test-automation-id="popupHeader"
                    closeButton
                    onHide={this.hideModal}>
                    {title}
                    {this.props.header}
                </Modal.Header>

                <Modal.Body
                    data-test-automation-id="popupContent">
                    {this.props.children}
                </Modal.Body>

                {footer}
            </Modal>
        );
    }
}
