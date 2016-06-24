'use strict';

var TinyEmitter = require('tiny-emitter');
var _ = require("lodash");

/**
 * @deprecated
 */
export default class SelectionModel extends TinyEmitter {
    constructor(primaryKey) {
        super();
        this.primaryKey = primaryKey || "id";
        this.selection = {};
    }

    select(list) {
        var changed;

        for (var i=0; i< list.length; i++) {
            var recordId = list[i][this.primaryKey];

            if (this.addRecord(recordId, list[i])) {
                changed = true;
            }

            if (this.selection[recordId].status <= 0) {
                this.selection[recordId].status++;
                changed = true;
            }
        }

        if (changed) {
            this.emit('change');
        }
    }

    unselect(list) {
        var changed;

        for (var i=0; i< list.length; i++) {
            var recordId = list[i][this.primaryKey];

            if (this.addRecord(recordId, list[i])) {
                changed = true;
            }

            if (this.selection[recordId].status >= 0) {
                this.selection[recordId].status--;
                changed = true;
            }
        }

        if (changed) {
            this.emit('change');
        }
    }

    addRecord(id, record) {
        if (!this.selection.hasOwnProperty(id)) {
            this.selection[id] = {
                record: record,
                id: id,
                status: 0
            };

            return true;
        }

        return false;
    }

    remove(ids) {
        var changed = false;

        ids.forEach(id => {
            if (id in this.selection) {
                delete this.selection[id];
                changed = true;
            }
        });

        if (changed) {
            this.emit('change');
        }
    }

    getSelected() {
        return this.getDiff().selected;
    }

    /**
     * Calculates a difference from the initial selection
     * @return {{selected: [], unselected: [] }}
     */
    getDiff() {
        var selection = this.selection;
        var keys = Object.keys(selection);

        var diff = _.reduce(
            keys,
            (acc, key) => {
                if (selection[key].status > 0) {
                    acc.selected.push(selection[key].record);
                } else if (selection[key].status < 0) {
                    acc.unselected.push(selection[key].record);
                }
                return acc;
            },
            {selected:[], unselected:[]}
        );

        return diff;
    }

    handleSelection (record, isSelected, isMultiple = true) {
        if (isMultiple) {
            isSelected ? this.unselect(record) : this.select(record);
        } else {
            if (!isSelected) {
                this.unselect(this.getSelected());
                this.select(record);
            }
        }
    }
}
