'use strict';

import React from "react";
import _ from "lodash";

/**
 * Check whether the row is visually selected
 * Firstly check if user select/unselect specified row according to selection model changes. if there are no
 * user changes, selection will be calculated according to appropriate selectionChecker of column model.
 * @param {SelectionModel} selectionModel
 * @param {function} selectionChecker
 * @param {Object} record Item from the store
 * @return {Boolean}
 */
export function isSelectedRow(selectionModel, selectionChecker, record) {
    let selectionDiff = selectionModel.getDiff();
    let primaryKey = selectionModel.primaryKey;

    let becameSelected = selectionDiff.selected.findIndex(item => item[primaryKey] == record[primaryKey]) > -1;
    let becameUnselected = selectionDiff.unselected.findIndex(item => item[primaryKey] == record[primaryKey]) > -1;

    if (becameSelected) {
        return true;
    } else if (becameUnselected) {
        return false;
    }

    let isSelected = false;

    if (_.isFunction(selectionChecker)) {
        isSelected = selectionChecker(record);
    }

    return isSelected;
}

export function highlight(regExp, text, title) {
    if (regExp === null || text == null) {
        return <span title={title}>{text}</span>;
    }
    let highlightedText = String(text).replace(regExp, handleTextParts);
    return <span title={title} dangerouslySetInnerHTML={{__html: highlightedText}}/>;
}

export function handleTextParts() {
    var parts = [].slice.call(arguments, 1, -2);
    return parts.map(addHighLightTags).join('');
}

export function addHighLightTags(part, index) {
    return index % 2 == 1 ? '<strong>' + part + '</strong>' : part;
}
