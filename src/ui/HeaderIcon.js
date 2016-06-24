import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

export class HeaderIcon extends React.Component {
    static propTypes = {
        imageClass: React.PropTypes.string,
        children: function (props, propName, componentName) {
            var children = props[propName];
            var count = React.Children.count(children);

            if (count > 0 && (count != 1 || children.type.name != 'Icon')) {
                return new Error(`Only a Icon component is allowed in the body of the ${componentName}.`);
            }
        }
    }
    render() {
        var className = classnames('header-icon', {
            [this.props.imageClass]: !_.isEmpty(this.props.imageClass)
        });

        return (
            <div data-test-automation-id="headerIcon"
                 className={className}>
                 {this.props.children}
            </div>
        );
    }
}