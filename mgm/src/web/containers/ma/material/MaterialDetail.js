import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {pushState} from 'redux-router';
import dataFormat from '../../../utils/DataFormat';
import {trans} from '../../../utils/numberTrans';
import {yyyyMMdd} from '../../../utils/Format';
import jquery from 'jquery';
import * as actions from '../../../../redux/modules/material';

class MaterialDetail extends Component {
  static propTypes = {
    params: PropTypes.object,
    material: PropTypes.object,
    clearPage: PropTypes.func,
    findMaterialById: PropTypes.func,
    setPageNow: PropTypes.func,
    search: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      list: 1,
      lvxan: {0: true},
      contentIndex: 0
    };
  }
  componentWillMount() {
    this.props.clearPage();
    const data = {
      materialNo: this.props.params.materialNo
    };
    this.props.findMaterialById(dataFormat(data));
  }

  componentDidUpdate() {
    if (this.props.material.list && this.props.material.list.length > 0) {
      jquery('.nr_zw_dw').html(this.props.material.list[this.state.contentIndex].articleContentBase64);
    }
  }

  render() {
    return (
      <div>
        <div className="dyh3">
          <span className="biaoti">图文详情</span>
          <div className="sousu3" onClick={() => { window.history.go(-1); }}>
            <input type="submit" value="返回" />
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="qiehuan tab">
          <ul>
            {
              this.props.material.list && this.props.material.list.length > 0 ?
              this.props.material.list.map((key, value) => (
                <li key={value} className={ this.state.lvxan[value] ? 'lvxan' : ''} onClick={() => { this.setState({ lvxan: undefined }); this.setState({ lvxan: { [value]: true, contentIndex: value } }); }}>{'图文' + trans(value + 1)}</li>
              )) : ''
            }
          </ul>
        </div>
        {
          this.props.material.list && this.props.material.list.length > 0 ?
          this.props.material.list.map((key, value) => (
            <div className="nrrong" key={value} style={{ display: this.state.lvxan[value] ? 'block' : 'none'}}>
              <div className="nr_top">
                <div className="nr_jiben">
                  <div className="nr_jb_top">
                    <div className="nr_jb_top_l"><img src="../../../../../assets/images/jbxx_ml.png" /><span>基本信息</span></div>
                    <div className="nr_jb_top_r"><img src="../../../../../assets/images/3_bj.png" /></div>
                  </div>
                  <div className="nr_jb_dw">
                    <div className="jbxx_ts">
                      <div className="ts_l"><span className="tx">摘要：</span><span className="zjbj">{key.articleDigest}</span></div>
                      <div className="ts_r"><span className="cz">重置</span>
                        <div className="fgx"><img src="../../../../../assets/images/fengexian.png" /></div><span className="bj">编辑</span></div>
                    </div>
                    <div className="jbxx_ts">
                      <div className="ts_l"><span className="tx">标题：</span><span className="zjbj">{key.articleTitle}</span></div>
                      <div className="ts_r"><span className="cz">重置</span>
                        <div className="fgx"><img src="../../../../../assets/images/fengexian.png" /></div><span className="bj">编辑</span></div>
                    </div>
                    <div className="jbxx_ts">
                      <div className="ts_l"><span className="tx">作者：</span><span className="zjbj" style={{ fontFamily: 'Helvetica' }}>{key.articleAuthor}</span></div>
                      <div className="ts_r"><span className="cz">重置</span>
                        <div className="fgx"><img src="../../../../../assets/images/fengexian.png" /></div><span className="bj">编辑</span></div>
                    </div>
                    <div className="jbxx_ts">
                      <div className="ts_l"><span className="tx">创建时间：</span><span className="zjbj" style={{ fontFamily: 'Helvetica' }}>{yyyyMMdd(key.createtime)}</span></div>
                    </div>
                    <div className="jbxx_ts">
                      <div className="ts_l"><span className="tx">原文地址：</span><span className="zjbj" style={{ fontFamily: 'Helvetica' }}>{key.articleContentSourceUrl}</span></div>
                    </div>
                  </div>
                </div>
                <div className="nr_fmpic">
                  <div className="nr_fmpic_top">
                    <div className="nr_fmpic_top_l"><img src="../../../../../assets/images/fmpic.png" /><span>封面图片</span></div>
                    <div className="nr_fmpic_top_r"><img src="../../../../../assets/images/fmpic_bg_pic.png" /></div>
                  </div>
                  <div className="nr_fmpic_dw"><img src={key.img} /></div>
                </div>
              </div>
              <div className="nr_dw">
                <div className="nr_zhwen">
                  <div className="nr_zw_top">
                    <div className="nr_zw_top_l"><img src="../../../../../assets/images/zwnr.png" /><span>正文内容</span></div>
                    <div className="nr_zw_top_r"><img src="../../../../../assets/images/3_bj.png" /></div>
                  </div>
                  <div className="nr_zw_dw">
                  </div>
                </div>
              </div>
            </div>
          )) : ''
        }
      </div>
    );
  }
}
export default connect(state => ({material: state.material}), {
  ...actions,
  pushState
})(MaterialDetail);
