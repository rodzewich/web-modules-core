'use strict';

import React from 'react';
import classnames from 'classnames';
import {translate} from '../utils/functions';

const MODE_ALL = 'MODE_ALL';
const MODE_SELECTED = 'MODE_SELECTED';

export class SelectedRecordsSwitcher extends React.Component {
    static get MODE_ALL() {
        return MODE_ALL;
    };

    static get MODE_SELECTED() {
        return MODE_SELECTED;
    };

    static propTypes = {
        onChange: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        showAllText: 'TRANSLATE:SHOW_ALL',
        showSelectedText: 'TRANSLATE:SHOW_SELECTED'
    };

    getShowElement( mode ){
        var clickable = this.props.mode !== mode;
        var isModeAll = mode === MODE_ALL;
        var testAutomationId = isModeAll ? 'showAllButton' : 'showSelectedButton"';

        var text = isModeAll
            ? translate(this.props.showAllText)
            : translate(this.props.showSelectedText) + ' (' + this.props.selectedCount + ')';

        return clickable ? (
            <a
                href='#'
                onClick={ e => {
                    e.preventDefault();
                    this.props.onChange(mode);
                    return false;
                } }
                data-test-automation-id={ testAutomationId }
            >{ text }</a>
        ): (
            <strong className="text-primary" data-test-automation-id={ testAutomationId }>
                { text }
            </strong>
        );
    }

    render() {
        return (
            <div
                data-test-automation-id={this.props.testAutomationId}
                className={classnames("store-selected-records-switcher", this.props.className)}>
                {this.getShowElement(MODE_ALL)}
                |
                {this.getShowElement(MODE_SELECTED)}
            </div>
        );
    }
}
