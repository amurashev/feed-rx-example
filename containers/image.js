import React from 'react';

export default class extends React.Component {

    render() {
        var image = this.props.image;
        return <div className="question_image-block"
                style={{
                    width: image.get('blockWidth') + 'px',
                    height: image.get('blockHeight') + 'px',
                    marginRight: image.get('blockMarginRight') + 'px',
                    marginBottom: image.get('blockMarginBottom') + 'px'
                }}>
            <img className="question_img"
                src={image.get('path')}
                style={{
                    width: image.get('imageWidth') + 'px',
                    height: image.get('imageHeight') + 'px',
                    marginTop: -image.get('imageMarginTop') + 'px',
                    marginLeft: -image.get('imageMarginLeft') + 'px'
                }} />
        </div>
    }
}