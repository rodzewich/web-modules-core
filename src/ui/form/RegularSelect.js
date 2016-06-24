import {FormControl} from './FormControl';
import {Icon} from '../Icon';
import React from 'react';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import classnames from 'classnames';
import { Filter } from '../Filter';
import _ from 'lodash';

class RegularSelectOption extends React.Component{
    static contextTypes = {
        regularSelect: React.PropTypes.object
    };

    static defaultProps = {
        testAutomationId: 'regular-select-menu-option'
    };

    render(){
        let { testAutomationId, value, className } = this.props;
        return <MenuItem
                    eventKey={value}
                    active={ value == this.context.regularSelect.value }
                    testAutomationId={ testAutomationId }
                    onSelect={ this.onSelect.bind( this ) }
                    className={ classnames('rc-select-option', className )}
        >
            { this.props.children }
        </MenuItem>;
    }

    onSelect( event, activeEventKey ){
        this.context.regularSelect.onChange( activeEventKey );
        this.context.regularSelect.toggle( false );
    }
}

let FC = FormControl;

export class RegularSelect extends FormControl{
    // extends defaultProps from superclass
    static defaultProps = {
        ...FC.defaultProps,
        testAutomationId: "select",
        isFilterable: false
    };

    static childContextTypes = {
        regularSelect: React.PropTypes.object
    };

    static Option = RegularSelectOption;

    getChildContext() {
        var props = this.getPropsFromContext();

        return {
            regularSelect: {
                value: props.value,
                onChange: props.onChange,
                isFilterable: props.isFilterable,
                toggle: ( open )=>{
                    this.setState({
                        open
                    });
                }
            }
        };
    }

    constructor( props, context ){
        super( props, context );

        this.state = {
            open: false
        };
    }

    render(){
        let { testAutomationId, block, className, label } = this.props;
        return (
            <Dropdown
                id={ testAutomationId }
                data-test-automation-id={ testAutomationId }
                className={classnames("rc-select", className, block ? "btn-block" : '')}
                open={ this.state.open }
                onToggle={ ()=>{
                    let open = !this.state.open;
                    this.setState({
                        open
                    });
                }}>
                <Dropdown.Toggle data-test-automation-id="Toggle" noCaret block>
                    { label }
                    <Icon name="chevron-down-small" className="rc-icon-right pull-right"/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <RegularSelectMenu testAutomationId={ testAutomationId + '-list'}>
                        { this.props.children }
                    </RegularSelectMenu>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

class RegularSelectMenu extends React.Component{
    static contextTypes = {
        regularSelect: React.PropTypes.object
    };

    constructor( props, context ){
        super( props, context );

        if( context.regularSelect.isFilterable ){
            this.state = {
                filterText: ''
            };
        }
    }
    render(){
        let { testAutomationId } = this.props;

        return <div data-test-automation-id={testAutomationId+'-menu'}>
            { this.getMenu() }
        </div>;
    }

    getMenu(){
        let { children } = this.props;

        return this.context.regularSelect.isFilterable && !_.isEmpty( children ) ? <div>
            <div className="filter-wrapper">
                <Filter
                    value={ this.state.filterText }
                    key='filterSelector'
                    testAutomationId={ this.props.testAutomationId+'-filter'}
                    onChange={ this.handleFilterChange.bind(this) }
                />
            </div>
            { this.getFilterChildren() }
        </div>: children;
    }

    getFilterChildren(){
        let { children } = this.props;
        let { filterText } = this.state;
        let filteredResult = [];

        if( _.isEmpty( filterText )){
            return children;
        }
        filterText = filterText.toLowerCase();

        React.Children.forEach( children, child => {
            let menuItemChildren = child.props.children;
            for(let i=0; i<menuItemChildren.length; i++ ){
                let menuItemChild = menuItemChildren[i];
                if( typeof menuItemChild === 'string' && menuItemChild.toLowerCase().indexOf( filterText ) !== -1 ){
                    filteredResult.push( child );
                    break;
                }
            }
        });
        return filteredResult.length>0 ? filteredResult : <div className="filter-empty-message">{ 'TRANSLATE:NO_RESULTS' }</div>;
    }

    handleFilterChange( filterText ){
        this.setState({
            filterText
        })
    }
}

