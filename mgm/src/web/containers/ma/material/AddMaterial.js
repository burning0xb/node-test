import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal } from 'antd';
import jquery from 'jquery';
import * as actions from '../../../../redux/modules/material';
import { yyyyMMdd } from '../../../utils/Format';
import { checkStatus, clearValidations } from '../../../utils/validations';
// const TabPane = Tabs.TabPane;
// const InputGroup = Input.Group;
let random = 0;

class AddMaterial extends Component {
  static propTypes = {
    params: PropTypes.object,
    material: PropTypes.object,
    clearPage: PropTypes.func,
    pushState: PropTypes.func,
    sMaterial: PropTypes.func,
    findMaterials: PropTypes.func,
    setPageNow: PropTypes.func,
    upLoad: PropTypes.func,
    upLoad2: PropTypes.func,
    clear: PropTypes.func,
    mMaterial: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    this.state = {
      list: 1,
      msgType: '单图文',
      msgType2: '排序',
      liCls: {
        0: 'bg_lv',
        1: '',
        2: ''
      },
      liCls2: {
        0: 'bg_lv',
        1: ''
      }
    };
  }

  componentWillMount() {
    this.props.clearPage();
    this.props.findMaterials();
  }

  componentDidMount() {
    jquery('#edit').editable({
      inlineMode: false,
      alwaysBlank: true,
      theme: 'gray',
      language: 'zh_cn',
      allowedImageTypes: ['jpeg', 'jpg', 'png', 'gif'],
      imageParams: {postId: '123'},
      imageUploadURL: '/crmmobilepay-mgm/material/upload2',
      height: '500px',
      width: '92%',
      marginTop: '19%'
    });
    jquery('.fr-bttn').each((index, el) => {
      if (jquery(el).attr('data-cmd') === 'insertImage') {
        jquery(el).hide();
      }
      if (jquery(el).attr('data-cmd') === 'insertVideo') {
        jquery(el).after('<button type="button" class="fr-bttn" title="插入图片" id="insertImage"><i class="fa fa-picture-o"></i></button>');
      }
    });
    jquery('#insertImage').click(() => {
      jquery('#ip2').click();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.material.upload === 'ok') {
      setTimeout(() => { jquery('#progress').hide(); this.props.clear(); }, 1000);
    }
    if (nextProps.material.upload2 === 'ok') {
      this.props.clear();
      jquery('.froala-element').append('<p><img class="fr-fin" data-fr-image-preview="false" alt="Image title" src="' + nextProps.material.base64 + '" width="300" data-url="' + nextProps.material.url + '"></p>');
    }
    if (nextProps.material.material === true) {
      this.props.clear();
      this.success(() => { this.props.pushState('/ma/MaterialManage'); });
    }
  }

  success(pushState) {
    Modal.success({
      title: 'This is a success message',
      content: '上传成功',
      onOk() {
        if (pushState) pushState();
      }
    });
  }

  upLoad(el) {
    random = (new Date()).valueOf();
    const id = jquery(el.target).parents('form')[0].id;
    const file = document.getElementById(id);
    const formData = new FormData(file);
    formData.append('random', random);
    if (jquery('#ip').val() !== '') {
      this.props.upLoad(formData);
      jquery('#progress').show();
    }
  }

  upLoad2(el) {
    const id = jquery(el.target).parents('form')[0].id;
    const file = document.getElementById(id);
    const formData = new FormData(file);
    if (jquery('#ip2').val() !== '') {
      this.props.upLoad2(formData);
    }
  }

  SMaterial() {
    clearValidations('#S');
    const json = {};
    jquery('#S').find('input').each((index, el) => {
      if (jquery(el).val() === '') {
        jquery(el).next().html('必填');
      }
      json[jquery(el).attr('name')] = jquery(el).val();
    });
    jquery('.froala-element').find('.fr-fin').each((index, el) => {
      json.articleContentbase64 = jquery('.froala-element').html()
      ;
      jquery(el).attr('src', jquery(el).attr('data-url'));
      jquery(el).removeAttr('data-url');
    });
    if (random === 0) {
      alert('请上传封面');
      return;
    }
    const articleContent = jquery('.froala-element').html();
    json.file = undefined;
    json.random = random;
    json.articleContent = articleContent;
    if (checkStatus('#S') === true) {
      this.props.sMaterial(json);
    }
  }

  error(info) {
    Modal.error({
      title: 'This is an error message',
      content: info
    });
  }

  mMaterial() {
    let count = 0;
    const articleNos = [];
    jquery('#mu').find('.mouse').each((index, el) => {
      count = index;
      articleNos.push(jquery(el).attr('data-articleno'));
    });
    if (count <= 4 && count > 0) {
      this.props.mMaterial('articleNos=' + articleNos);
    } else if (count === 0) {
      this.error('请选择要上传的单图文');
    } else {
      this.error('上传的单图文素材不能超过5个');
    }
  }
  spans(el) {
    	jquery(el.target).parents('.jbxx_ts').css('border-bottom', '1px solid #23a86c');
    	jquery(el.target).siblings('.tx').css('color', '#23a86c');
    	jquery(el.target).parents('.jbxx_ts').siblings('.jbxx_ts').css('border-bottom', '1px solid #e6ecef');
    	jquery(el.target).parents('.jbxx_ts').siblings('.jbxx_ts').find('.tx').css('color', '#78909c');
  }
  render() {
    return (
      <div>
        <form id="material2" style={{ display: 'none' }}><input id="ip2" type="file" accept="image/*" data-info="no" name="file" className="file" onChange={this.upLoad2.bind(this)}/>
        </form>
        <form id="material1" style={{ display: 'none' }}><input id="ip" type="file" accept="image/*" data-info="no" name="file" className="file" onChange={this.upLoad.bind(this)}/>
        </form>
        <div className="dyh2">
          <span className="biaoti">{this.state.msgType}</span>
          <div className="sousu2">
            <input type="submit" value="上传" style={{ display: this.state.liCls[0] ? 'block' : 'none' }} onClick={this.SMaterial.bind(this)}/>
            <input type="submit" value="上传" style={{ display: this.state.liCls[1] ? 'block' : 'none' }} onClick={this.mMaterial.bind(this)}/>
            <div className="zxgs" style={{ display: this.state.liCls[1] ? 'block' : 'none' }}><span>{ this.props.material.list ? this.props.material.list.length : '' }</span></div>
          </div>
          <div className="duwb" onClick={() => { this.setState({ sell: !this.state.sell}); }}><span>{this.state.msgType}</span><img src="../../../../../assets/images/xl_wxz_hui.png"/>
            <div className={ this.state.sell === true ? 'xl_xz2 sell' : 'xl_xz2'} style={{ display: this.state.sell === true ? 'block' : 'none'}}>
              <ul>
                <li className={this.state.liCls[0]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '单图文', liCls: {} }); this.setState({ liCls: {0: 'bg_lv'} });}}><span>单图文</span></li>
                <li className={this.state.liCls[1]} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '多图文', liCls: {} }); this.setState({ liCls: {1: 'bg_lv'} });}}><span>多图文</span></li>
                <li className={this.state.liCls[2]} style={{ borderBottom: 'none' }} onClick={(event) => {event.stopPropagation(); this.setState({ sell: false, msgType: '文本', liCls: {} }); this.setState({ liCls: {2: 'bg_lv'} });}}><span>文本</span></li>
              </ul>
            </div>
          </div>
          <div className="duwb" onClick={() => { this.setState({ sell2: !this.state.sell2}); }}><span>{this.state.msgType2}</span><img src="../../../../../assets/images/xl_wxz_hui.png"/>
            <div className={ this.state.sell2 === true ? 'xl_xz sell' : 'xl_xz'} style={{ display: this.state.sell2 === true ? 'block' : 'none'}}>
              <ul>
                <li className={this.state.liCls2[0]} onClick={(event) => {event.stopPropagation(); this.setState({ sell2: false, msgType2: '全部', liCls2: {} }); this.setState({ liCls2: {0: 'bg_lv'} });}}>全部</li>
                <li className={this.state.liCls2[1]} onClick={(event) => {event.stopPropagation(); this.setState({ sell2: false, msgType2: '最新', liCls2: {} }); this.setState({ liCls2: {1: 'bg_lv'} });}}><span>最新</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="nrrong" style={{ display: this.state.liCls[0] ? 'block' : 'none' }} id="S">
          <div className="nr_top">
            <div className="nr_jiben">
              <div className="nr_jb_top">
                <div className="nr_jb_top_l"><img src="../../../../../assets/images/jbxx_ml.png" /><span>基本信息</span></div>
                <div className="nr_jb_top_r"><img src="../../../../../assets/images/3_bj.png" /></div>
              </div>
              <div className="nr_jb_dw">
                <div className="jbxx_ts">
                  <div className="ts_l"><span className="tx">摘要：</span><input className="zjbj" ref="digest" name="articleDigest" onClick={this.spans.bind(this)}/><i className="error"/></div>
                  <div className="ts_r"><span className="cz" onClick={() => { this.refs.digest.value = ''; }}>重置</span></div>
                </div>
                <div className="jbxx_ts">
                  <div className="ts_l"><span className="tx">标题：</span><input className="zjbj" ref="title" name="articleTitle" onClick={this.spans.bind(this)}/><i className="error"/></div>
                  <div className="ts_r"><span className="cz" onClick={() => { this.refs.title.value = ''; }}>重置</span></div>
                </div>
                <div className="jbxx_ts">
                  <div className="ts_l"><span className="tx">作者：</span><input className="zjbj" style={{ fontFamily: 'Helvetica' }} ref="author" name="articleAuthor" onClick={this.spans.bind(this)}/><i className="error"/></div>
                  <div className="ts_r"><span className="cz" onClick={() => { this.refs.author.value = ''; }}>重置</span></div>
                </div>
                <div className="jbxx_ts">
                  <div className="ts_l"><span className="tx">原文地址：</span><input className="zjbj" style={{ fontFamily: 'Helvetica' }} ref="sourceUrl" name="articleContentSourceUrl" onClick={this.spans.bind(this)}/><i className="error"/></div>
                  <div className="ts_r"><span className="cz" onClick={() => { this.refs.sourceUrl.value = ''; }}>重置</span></div>
                </div>
              </div>
            </div>
            <div className="nr_fmpic">
              <div className="nr_fmpic_top">
                <div className="nr_fmpic_top_l"><img src="../../../../../assets/images/fmpic.png" /><span>封面图片</span></div>
                <div className="nr_fmpic_top_r"><img src="../../../../../assets/images/fmpic_bg_pic.png" /></div>
              </div>
              <div className="nr_fmpic_dw" onClick={() => { jquery('#ip').click(); }}><img src={ this.props.material.Base64 ? this.props.material.Base64 : '../../../../../assets/images/image_t.png' } /></div>
            </div>
          </div>
          <div className="nr_dw">
            <div className="nr_zhwen" style={{ width: '100%' }}>
              <div className="nr_zw_top">
                <div className="nr_zw_top_l"><img src="../../../../../assets/images/zwnr.png" /><span>正文内容</span></div>
                <div className="nr_zw_top_r"><img src="../../../../../assets/images/3_bj.png" /></div>
              </div>
              <div className="nr_zw_dw" id="edit" style={{ marginBottom: '2%' }}>
              </div>
            </div>
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div className="lb_ml" style={{ display: this.state.liCls[1] ? 'block' : 'none' }} id="mu">
          <div className="liblh">
            <ul>
              {
                this.props.material && this.props.material.list && this.props.material.list.length > 0 ?
                this.props.material.list.map((key, value) => (
                  <li key={value} className={this.state['hover' + value] || this.state['lock' + value] ? 'mouse' : ''} onMouseEnter={() => { this.setState({ ['hover' + value]: true }); }} onMouseLeave={() => { this.setState({ ['hover' + value]: false }); }} onClick={() => { this.setState({ ['hover' + value]: true, ['lock' + value]: true }); }} data-articleno={key.articleNo}>
                    <div className="lb_top" data-articleno={key.articleNo}>
                      <p>{key.articleTitle}</p>
                      <div className="deh">
                        <div className="deh_l"><img src="../../../../../assets/images/shizhong.png"/>{yyyyMMdd(key.createtime)}</div>
                        <div className="deh_r"><img src="../../../../../assets/images/zuozhe.png"/>{key.articleAuthor}</div>
                      </div>
                      <div className="pic_m"><img src={key.img}/></div>
                      <div className="dsih"><img src="../../../../../assets/images/zhaiyao.png"/>{key.articleDigest}</div>
                      <div className="dwuh"><img src="../../../../../assets/images/dizhi.png"/>{key.articleContentSourceUrl}</div>
                      <div className="bg_black" style={{ display: this.state['hover' + value] || this.state['lock' + value] ? 'block' : 'none' }}><img src="../../../../../assets/images/black_top.png"/>
                        <p>点击查看详情</p>
                      </div>
                    </div>
                    <div className="lb_dw">
                      <div className={ this.state['hover' + value] || this.state['lock' + value] ? 'xzj aa' : 'xzj' }><img src={'../../../../../assets/images/' + (this.state['hover' + value] || this.state['lock' + value] ? 'zuxe_lv.png' : 'xuanze.png' )}/><span>选择</span></div>
                      <div className="xzj2" style={{ borderRight: 'none' }} onClick={(event) => { event.stopPropagation(); this.setState({ ['hover' + value]: false, ['lock' + value]: false }); }}><img src="../../../../../assets/images/quxi_ml.png"/><span>取消</span></div>
                    </div>
                  </li>
                ))
                : ''
              }
            </ul>
          </div>
        </div>
    </div>
    );
  }
}
export default connect(
  state => ({ material: state.material }),
  { ...actions, pushState: push }
)(AddMaterial);
