import React, { Component } from 'react';
import { Link } from 'react-router';
export default class Footer extends Component {

  render() {
    return (
      <div>
      <div className="wrapper-footer-line">
        <div className="width-980">
          <div className = "links-box">
            <div className = "fl">
              <dl>
                <dt>服务项目</dt>
                <dd>
                  <Link to="srvindex">B2C海外直邮服务</Link>
                </dd>
              </dl>
              <dl >
                <dt>关于我们</dt>
                <dd><Link to="aboutus">公司简介</Link></dd>
              </dl>
            </div>
            <div className="fr">
              <dl >
                <img src="../../assets/images/telephone.png"></img>
                <dt>400-000-0000</dt>
                <dd>（周一到周五：8:00-18:00）</dd>
              </dl>
              <div>
                <img/>
              </div>
            </div>
          </div>
        </div>
        <div className="qrcode-box">
          <span>Copyright</span>
          <span>&nbsp;&nbsp;©&nbsp;&nbsp;2014-2020 版权所有&nbsp;&nbsp;</span>
          <span>安寄科技发展(北京)有限公司</span>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;京ICP备10000000号-2</span>
        </div>
        </div>
      </div>
    );
  }

}
