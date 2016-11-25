import 'babel-polyfill';
import 'babel-core/register';
import React, { Component, PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const style = {
  width: '200px',
  height: '200px',
  'borderWidth': '2px',
  'borderColor': '#666',
  'borderStyle': 'dashed',
  'borderRadius': '5px'
};

const bannerStyle = {
  width: '100%',
  height: '334px'
};

export default class Upload extends Component {

  static propTypes = {
    dist: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {files: null};
  }

  onDrop(files) {
    this.setState({
      files: files
    });
  }

  onOpenClick() {
    this.refs.dropzone.open();
  }

  uploadImg() {
    const req = request.post('/upload');
    this.state.files.forEach((file)=> {
      req.attach('image', file, this.props.dist)
        .end(() => {
          alert(this.props.dist + '上传成功');
        });
    });
    // req.end();
  }

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" style={style} onDrop={this.onDrop.bind(this)} >
          <div>需要上传的图片拖放到方框内或点击方框 </div>
        </Dropzone>
        <button type="button" onClick={this.uploadImg.bind(this)}>
          上传
        </button>
        {this.state.files ? <div>
          <h3>预览图</h3>
          <div>
            {this.state.files.map(function preivew(file) {
              return <img key={file.name} style={bannerStyle} src={file.preview}/>;
            })}
          </div>
        </div> : null}
      </div>
    );
  }
}
