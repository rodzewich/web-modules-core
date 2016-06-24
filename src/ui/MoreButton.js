'use strict';

import React from 'react';
import classnames from 'classnames';
import {Button} from './Button';
import {Icon} from './Icon';

export class MoreButton extends React.Component {

    static defaultProps = {
        placeholder: ''
    };

    static propTypes = {
        placeholder: React.PropTypes.string
    };

    render() {
        var props = this.props;
        return (
            <Button className='form-control text-left more-button' {...props}>
                <Icon name='chevron-right-big' className='pull-right' />
                <span className={classnames('more-label', {placeholder: !props.children && props.placeholder})}>
                    {props.children || props.placeholder}
                </span>
            </Button>
        );
    }
}
