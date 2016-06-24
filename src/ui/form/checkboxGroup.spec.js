'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TinyEmitter from 'tiny-emitter';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import _ from 'lodash';
import classnames from 'classnames';
import EventBus from '../../utils/EventBus';
import {translate} from '../../utils/functions';

import {chai, expect, ReactTestUtils, getNodeClassNames, toArray} from '../../testUtils/index';
import {CheckboxGroup} from '../../index';

function findCheckboxesAttributes(nodeCheckboxGroup) {
    return toArray(nodeCheckboxGroup.querySelectorAll('.rc-checkbox-group-body .rc-checkbox'))
        .map((node) => {
            return {
                checked: node.dataset.checked === 'true',
                readonly: node.dataset.readonly === 'true',
                dashed: node.dataset.dashed === 'true',
                label: node.querySelector('.rc-checkbox-label').textContent
            };
        });
}

describe('CheckboxGroup', () => {
    var checkboxesConfig = [
        {
            name: 'name_1',
            label: 'label_1',
            testAutomationId: 'automation_id_1'
        },
        {
            name: 'name_2',
            label: 'label_2',
            testAutomationId: 'automation_id_2'
        },
        {
            name: 'name_3',
            label: 'label_3',
            testAutomationId: 'automation_id_3',
            nested: ['name_1', 'name_4']
        },
        {
            name: 'name_4',
            label: 'label_4',
            testAutomationId: 'automation_id_4',
            nested: ['name_1']
        },
        {
            name: 'name_5',
            label: 'label_5',
            testAutomationId: 'automation_id_5',
            nested: ['name_1']
        }
    ];

    it('should render nested checkboxes as checked+readonly for checked parents ', () => {
        var expectedCheckedLabels = ['label_1', 'label_2', 'label_3', 'label_4', 'label_5'];
        var expectedReadOnlyLabels = ['label_1', 'label_4'];

        var values = {
            name_1: true,
            name_2: true,
            name_3: true,
            name_4: true,
            name_5: true
        };

        var checkboxGroupComponent = ReactTestUtils.renderIntoDocument(
            <CheckboxGroup label="Label" config={checkboxesConfig} value={values} />
        );

        var dom = ReactDOM.findDOMNode(checkboxGroupComponent);

        var checkboxes = findCheckboxesAttributes(dom);

        var actualCheckedLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.checked === true)
            .map(checkboxInfo => checkboxInfo.label);

        var actualReadOnlyLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.readonly === true)
            .map(checkboxInfo => checkboxInfo.label);

        expect(actualCheckedLabels).to.include.members(expectedCheckedLabels);
        expect(actualReadOnlyLabels).to.include.members(expectedReadOnlyLabels);
    });

    it('should check and make readonly nested checkboxes when check their parent', () => {
        var expectedCheckedLabels = ['label_1', 'label_3', 'label_4'];
        var expectedReadOnlyLabels = ['label_1', 'label_4'];
        var checkboxIndexToClick = 2; //name_3

        var values = {
            name_1: false,
            name_2: false,
            name_3: false,
            name_4: false,
            name_5: false
        };

        var checkboxGroupComponent = ReactTestUtils.renderIntoDocument(
            <CheckboxGroup label="Label" config={checkboxesConfig} value={values} />
        );

        var dom = ReactDOM.findDOMNode(checkboxGroupComponent);
        var nodes = toArray(dom.querySelectorAll('.rc-checkbox-group-body .rc-checkbox'));
        ReactTestUtils.Simulate.click(nodes[checkboxIndexToClick]);

        var checkboxes = findCheckboxesAttributes(dom);

        var actualCheckedLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.checked === true)
            .map(checkboxInfo => checkboxInfo.label);

        var actualReadOnlyLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.readonly === true)
            .map(checkboxInfo => checkboxInfo.label);

        expect(actualCheckedLabels).to.include.members(expectedCheckedLabels);
        expect(actualReadOnlyLabels).to.include.members(expectedReadOnlyLabels);
    });

    it('should uncheck nested checkboxes when uncheck their parent', () => {
        var expectedUncheckedLabels = ['label_3', 'label_4'];
        var expectedReadOnlyLabels = ['label_1'];
        var checkboxIndexToClick = 2; //name_3

        var values = {
            name_1: true,
            name_2: false,
            name_3: true,
            name_4: true,
            name_5: true
        };

        var checkboxGroupComponent = ReactTestUtils.renderIntoDocument(
            <CheckboxGroup label="Label" config={checkboxesConfig} value={values} />
        );

        var dom = ReactDOM.findDOMNode(checkboxGroupComponent);
        var nodes = toArray(dom.querySelectorAll('.rc-checkbox-group-body .rc-checkbox'));
        ReactTestUtils.Simulate.click(nodes[checkboxIndexToClick]);

        var checkboxes = findCheckboxesAttributes(dom);

        var actualUncheckedLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.checked === false)
            .map(checkboxInfo => checkboxInfo.label);

        var actualReadOnlyLabels = checkboxes
            .filter(checkboxInfo => checkboxInfo.readonly === true)
            .map(checkboxInfo => checkboxInfo.label);

        expect(actualUncheckedLabels).to.include.members(expectedUncheckedLabels);
        expect(actualReadOnlyLabels).to.include.members(expectedReadOnlyLabels);
    });
});
