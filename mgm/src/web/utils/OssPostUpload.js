import 'babel-polyfill';
import 'babel-core/register';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
  height: '100%'
};

const BUCKET_NAME = 'machao1';
const END_POINT = 'oss-cn-shanghai.aliyuncs.com';
const OSS_API_URL = 'http://' + BUCKET_NAME + '.' + END_POINT;

export default class Upload extends Component {

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
    const requestBody = {
      bucket: BUCKET_NAME,
      endpoint: END_POINT
    };

    fetch('/pscp-mgm/oss/getPostPolicy', {
      method: 'POST',
      body: JSON.stringify(requestBody)
    }).then(
      (res) => { return res.json(); }
    ).then((auth) => {
      const data = new FormData();
      data.append('OSSAccessKeyId', auth.accessId);
      data.append('policy', auth.policy);
      data.append('signature', auth.signature);
      data.append('key', auth.dir + '/' + this.state.files[0].name);
      data.append('file', this.state.files[0]);

      fetch(OSS_API_URL, {
        method: 'POST',
        body: data
      }).then(()=> {
        alert('上传成功');
      });
    });
  }

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" style={style} onDrop={this.onDrop.bind(this)} >
          <div>上传的图片拖放到方框内或点击方框 </div>
        </Dropzone>
        <button type="button" onClick={this.uploadImg.bind(this)}>
          表单方式上传
        </button>
          { this.state.files ? <div>
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
