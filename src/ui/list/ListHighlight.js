'use strict';

import React from "react";
import {highlight} from './utils';

export class ListHighlight extends React.Component {

    static contextTypes = {
        listStore: React.PropTypes.object
    };

    render() {
        return highlight(this.context.listStore.textFilterPattern, this.props.children, this.props.title);
    }

}
