'use strict';

import React from 'react';
import {default as BrandedFileLoader} from '../utils/BrandedFileLoader';

export class BrandedImage extends React.Component {
    static propTypes = {
        src: React.PropTypes.string, // file path relative to target folder
        folderContext: React.PropTypes.func // require.context('./target/folder/relative/path/to/current/file')
    };

    render() {
        var src = this.props.src;
        var imageLoader = new BrandedFileLoader(this.props.folderContext);
        var fileInfo = imageLoader.getFileInfo(src);
        return <img {...this.props} src={fileInfo.file} data-src={fileInfo.requirePath}/>
    }
}
