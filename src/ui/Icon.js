/* jscs:disable disallowDanglingUnderscores */

import React from "react";
import classnames from "classnames";

export class Icon extends React.Component {

    static propTypes = {
        name: React.PropTypes.string.isRequired
    };

    static defaultProps = {
        testAutomationId: "icon"
    };

    render() {
        let {
            testAutomationId,
            className,
            name,
            ...props
            } = this.props;

        var iconName = name;
        var iconClassName = classnames('rc-icon', 'rc-icon-' + name, className);
        if (iconName) {
            return (
                <span data-test-automation-id={testAutomationId} className={iconClassName} {...props}/>
            );
        } else {
            return null;
        }
    }
}
