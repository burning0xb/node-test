import 'babel-polyfill';
import 'babel-core/register';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import SparkMD5 from 'spark-md5';

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

  // 读取上传文件内容，生成MD5，IE9及以下不兼容
  genFileMD5() {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    const file = this.state.files[0];
    const chunkSize = 2097152;
    const chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    const loadNext = () => {
      const start = currentChunk * chunkSize;
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    };

    fileReader.onload = ((uploadFile) => {
      return (event) => {
        const hex2a = (hexx) => {
          const hex = hexx.toString();
          let str = '';
          for (let index = 0; index < hex.length; index += 2) {
            str += String.fromCharCode(parseInt(hex.substr(index, 2), 16));
          }
          return str;
        };

        console.log('read chunk nr', currentChunk + 1, 'of', chunks);
        spark.append(event.target.result);  // Append array buffer
        currentChunk++;

        if (currentChunk < chunks) {
          loadNext();
        } else {
          // 加载完文件内容，生成MD5
          console.log('finished loading');
          const md5Content = btoa(hex2a(spark.end()));

          const contentType = 'text/html';
          const objectName = 'yes.png';

          const requestBody = {
            method: 'PUT',
            contentMD5: md5Content,
            contentType,
            resource: '/' + BUCKET_NAME + '/' + objectName
          };

          request.post('/pscp-mgm/oss/auth')
          .send(JSON.stringify(requestBody))
          .end((err, res) => {
            const auth = JSON.parse(res.text);
            const header = {
              'Authorization': auth.sign,
              'Content-Type': contentType,
              'x-oss-date': auth.date,
              'Content-MD5': md5Content,
              'Content-Disposition': 'yes.png'
            };
            request.put(OSS_API_URL + '/' + objectName)
            .set(header)
            .send(uploadFile)
            .end( ()=> {
              alert('上传成功');
            });
          });
        }
      };
    })(this.state.files[0]);

    fileReader.onerror = () => {
      console.warn('oops, something went wrong.');
    };

    loadNext();
  }

  uploadImg() {
    this.genFileMD5.call(this);
  }

  render() {
    return (
      <div>
        <Dropzone ref="dropzone" style={style} onDrop={this.onDrop.bind(this)} >
          <div>需要上传的图片拖放到方框内或点击方框 </div>
        </Dropzone>
        <button type="button" onClick={this.uploadImg.bind(this)}>
          PUT方式上传
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
