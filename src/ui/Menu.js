'use strict';

import React from "react";
import classnames from "classnames";
import {Link} from "react-router";
import {Icon} from "./Icon";

const CLASS_NAME_MENU = 'rc-menu';

export class Menu extends React.Component {
    render() {
        return (
            <ul className={classnames(CLASS_NAME_MENU, this.props.className, {'rc-menu-sub': !!this.props.sub})} data-test-automation-id={this.props.testAutomationId}>
                {this.props.children.map((menuItem, i) => {
                    var link = menuItem.link;
                    var testId = menuItem.testAutomationId;
                    var id = menuItem.id;
                    var classNames = classnames(menuItem.className, {
                        "link-with-icon": menuItem.icon
                    });
                    var name = menuItem.name;
                    var icon = menuItem.icon
                        ? <Icon name={menuItem.icon} className="rc-menu-icon"/>
                        : null;
                    var onClickHandler = menuItem.onClickHandler ? menuItem.onClickHandler : null;

                    var content;
                    if (!onClickHandler) {
                        content = (
                            <Link to={link} className={classNames} data-test-automation-id="item" activeClassName="active">
                                {icon}
                                {name}
                            </Link>
                        );
                    } else {
                        content = (
                            <a className={classNames} data-test-automation-id="item" onClick={onClickHandler}>
                                {icon}
                                {name}
                            </a>
                        );
                    }

                    return (
                        <li key={i} id={id} data-test-automation-id={testId}>
                            {content}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
