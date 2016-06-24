'use strict';

import React from "react";
import {ListHighlight} from "./ListHighlight";

export class GridCell extends React.Component {

    render() {
        let {children, ...props} = this.props;
        return (<td {...props}>
            <ListHighlight>{children}</ListHighlight>
        </td>);
    }

}