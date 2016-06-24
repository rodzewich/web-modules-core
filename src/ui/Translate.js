'use strict';

import React from "react";
import {translate} from "../utils/functions";

export class Translate extends React.Component {
    render() {
        //FIXME .toString() of children?
        return <span className={this.props.className}
                     dangerouslySetInnerHTML={{__html: translate(this.props.children, this.props)}}/>;
    }
}
