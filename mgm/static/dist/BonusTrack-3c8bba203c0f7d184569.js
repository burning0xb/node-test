webpackJsonp([5],{44:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function s(e){var t=(0,o.default)(e).serializeArray(),a={},l=!0,s=!1,n=void 0;try{for(var i,d=(0,u.default)(t);!(l=(i=d.next()).done);l=!0){var m=i.value;(0,c.default)(a,(0,r.default)({},m.name,m.value))}}catch(e){s=!0,n=e}finally{try{!l&&d.return&&d.return()}finally{if(s)throw n}}return a}Object.defineProperty(t,"__esModule",{value:!0});var n=a(21),r=l(n),i=a(86),c=l(i),d=a(85),u=l(d);t.default=s;var m=a(36),o=l(m);e.exports=t.default},215:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(1090);Object.defineProperty(t,"BonusTrack",{enumerable:!0,get:function(){return l(s).default}});var n=a(1089);Object.defineProperty(t,"BonusQuery",{enumerable:!0,get:function(){return l(n).default}})},1089:function(e,t,a){(function(l){"use strict";function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,i,c,d,u=a(6),m=n(u),o=a(17),f=n(o),p=a(7),h=n(p),E=a(16),y=n(E),v=a(12),N=n(v),b=a(11),g=n(b),T=a(1),w=n(T),k=a(73),_=n(k),P=a(313),S=s(P),j=a(13),x=a(83),C=a(163),M=a(44),H=n(M),D=a(59),A=a(49),F=a(74),O=l.jQuery,I=-1,B={curPage:1,type:""},K=(r=(0,C.asyncConnect)([{promise:function(e){var t=e.store.dispatch;return t(S.findAll(B,1))}}]),r((d=c=function(e){function t(e){(0,h.default)(this,t);var a=(0,N.default)(this,(t.__proto__||(0,f.default)(t)).call(this,e));return a.state={showModal:!1,selectUsers:[],rewardStatus:"请选择"},a}return(0,g.default)(t,e),(0,y.default)(t,[{key:"componentDidMount",value:function(){O("#datePicker1").date_input(),O(".time").find("img").click(function(e){O(e.currentTarget).prev().toggle()})}},{key:"check",value:function(e){(0,F.runValidations)(e.target)}},{key:"search",value:function(){var e=(0,H.default)(".form");e.curPage=1,null!==this.refs.rewardStatus.innerHTML&&(e.rewardStatus=(0,A.getFlag)("rewardStatus",this.refs.rewardStatus.innerHTML)),(0,F.clearValidations)(".inout"),(0,F.subValidations)(".inout"),(0,F.subValidations)(".time"),""===e.rewardTime?(this.refs.rewardTime.innerHTML=" ",(0,F.checkSpanStatus)(".sjmcinput")===!0&&this.props.search(e,1)):(0,F.checkSpanStatus)(".sjmcinput")===!0&&this.props.search(e,1)}},{key:"select",value:function(e){var t={curPage:e.eventKey};if("findAll"===this.props.bonus.findStatus&&(t.curPage=e.eventKey,this.props.findAll(t,e.eventKey)),"search"===this.props.bonus.findStatus2){var a=this.props.bonus.input;a.rewardDate=a.rewardDate,a.curPage=e.eventKey,null!==this.refs.rewardStatus.innerHTML&&(a.rewardStatus=(0,A.getFlag)("rewardStatus",this.refs.rewardStatus.innerHTML)),this.props.search(a,e.eventKey)}}},{key:"sort",value:function(e){I=~I,this.props.sort(e,I)}},{key:"render",value:function(){var e=this;return w.default.createElement("div",null,w.default.createElement("link",{rel:"stylesheet",href:"/assets/css/bj2.css"}),w.default.createElement("link",{rel:"stylesheet",href:"/assets/css/datePickerr.css"}),w.default.createElement("div",{className:"dyh"},w.default.createElement("div",{className:"zuo_l"},w.default.createElement("span",{className:"biaoti"},"奖励查询")),w.default.createElement("form",{className:"form"},w.default.createElement("div",{className:"you_r"},w.default.createElement("div",{className:"yiha"},w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"商户名称"),w.default.createElement("div",{className:"inout"},w.default.createElement("input",{type:"text","data-info":"no",id:"hdmch",placeholder:"请输入您的商户名称",ref:"storeName",name:"storeName"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada"},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"}))))),w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"活动名称"),w.default.createElement("div",{className:"inout"},w.default.createElement("input",{type:"text","data-info":"no",id:"hdmch",placeholder:"请输入您的活动名称",ref:"rewardName",name:"rewardName"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada"},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"}))))),w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"月份"),w.default.createElement("div",{className:"inout"},w.default.createElement("input",{type:"text","data-info":"date",placeholder:"请输入您的月份",ref:"rewardTime",name:"rewardTime"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada",style:{marginLeft:"17%"}},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"})))))),w.default.createElement("div",{className:"erha"},w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("span",{className:"wbknr"},"奖品发放时间"),w.default.createElement("div",{className:"time"},w.default.createElement("input",{type:"text","data-info":"ydm",placeholder:"请选择您的奖品发放时间",name:"rewardDate",id:"datePicker1",className:"date_picker1"}),w.default.createElement("img",{src:"../../../../../assets/images/rili_tubiao.png"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada"},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"})))),w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("span",{className:"wbknr"},"奖励状态"),w.default.createElement("div",{className:"inout",onClick:function(){e.setState({selected:!e.state.selected})}},w.default.createElement("div",{className:"select select-zhong"},w.default.createElement("div",{className:"selected-box",style:{border:"none"}},w.default.createElement("span",{ref:"rewardStatus",className:"ab"},this.state.rewardStatus)),w.default.createElement("div",{className:"xljt_js"},w.default.createElement("img",{src:"../../../../../assets/images/xl_wxz_hui\t.png"})),w.default.createElement("ul",{className:"option-box option-box-zhong",style:{width:"159px",top:"-1",display:this.state.selected?"block":"none"}},w.default.createElement("li",{className:"option"+(0===this.state.selectIndex?" selected":""),onClick:function(t){t.stopPropagation(),e.setState({selected:!e.state.selected,rewardStatus:"请选择",selectIndex:0})}},"请选择"),w.default.createElement("li",{className:"option"+(1===this.state.selectIndex?" selected":""),onClick:function(t){t.stopPropagation(),e.setState({selected:!e.state.selected,rewardStatus:"活动执行中",selectIndex:1})}},"活动执行中"),w.default.createElement("li",{className:"option"+(2===this.state.selectIndex?" selected":""),onClick:function(t){t.stopPropagation(),e.setState({selected:!e.state.selected,rewardStatus:"照片不合格",selectIndex:2})}},"照片不合格"),w.default.createElement("li",{className:"option"+(2===this.state.selectIndex?" selected":""),onClick:function(t){t.stopPropagation(),e.setState({selected:!e.state.selected,rewardStatus:"奖励发放中",selectIndex:3})}},"奖励发放中"),w.default.createElement("li",{className:"option"+(2===this.state.selectIndex?" selected":""),onClick:function(t){t.stopPropagation(),e.setState({selected:!e.state.selected,rewardStatus:"已完成",selectIndex:4})}},"已完成"))),w.default.createElement("div",{className:"jt_top",style:{display:this.state.selected?"block":"none"}})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada",style:{marginLeft:"17%"}},w.default.createElement("span",{className:"error"})))),w.default.createElement("div",{className:"sousu"},w.default.createElement("input",{type:"button",value:"搜索",onClick:this.search.bind(this)})),w.default.createElement("div",{className:"sousu"},w.default.createElement("input",{type:"reset",onClick:function(t){t.stopPropagation(),e.setState({rewardStatus:"请选择"})},value:"重置"})))))),w.default.createElement("div",{className:"bg_ml"},this.props.bonus&&this.props.bonus.list&&this.props.bonus.list.length>0?w.default.createElement("table",{cellPadding:"0",cellSpacing:"0"},w.default.createElement("tbody",null,w.default.createElement("tr",{className:"first",style:{height:"50px"}},w.default.createElement("td",{className:"table_tittle",width:"4%",onClick:this.sort.bind(this,"storeNo")},"商户ID"),w.default.createElement("td",{className:"table_tittle",width:"5%",onClick:this.sort.bind(this,"storeName")},"商户名称"),w.default.createElement("td",{className:"table_tittle",width:"6%",onClick:this.sort.bind(this,"rewardName")},"活动名称"),w.default.createElement("td",{className:"table_tittle",width:"7%",onClick:this.sort.bind(this,"rewardTime")},"奖励月份"),w.default.createElement("td",{className:"table_tittle",width:"8%",onClick:this.sort.bind(this,"rewardStatus")},"奖励当前状态"),w.default.createElement("td",{className:"table_tittle",width:"5%",onClick:this.sort.bind(this,"rewardAmt")},"奖励金额"),w.default.createElement("td",{className:"table_tittle",width:"6%",onClick:this.sort.bind(this,"rewardDate")},"奖励发放时间")),this.props.bonus.list.map(function(e,t){return w.default.createElement("tr",{key:t,className:"tr_hover",style:{height:"80px"}},w.default.createElement("td",{style:{color:"#23a86c"}},e.storeNo),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},e.storeName),w.default.createElement("td",{style:{color:"#333333"}},e.rewardName),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},new Date(e.rewardTime).getMonth()+1+"月"),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},(0,A.getStatus)("rewardStatus",e.rewardStatus)),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},e.rewardAmt),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},(0,D.yyyyMMdd)(e.rewardDate)))}))):w.default.createElement("p",null,"没有搜索到符合条件的数据！")),w.default.createElement(_.default,{items:this.props.bonus.pageCount,activePage:this.props.bonus.pageNow,onSelect:this.select.bind(this),style:this.props.bonus.list}))}}]),t}(T.Component),c.propTypes={bonus:T.PropTypes.object,OrderSearch:T.PropTypes.object,findAll:T.PropTypes.func,search:T.PropTypes.func,setPageNow:T.PropTypes.func,hhMMss:T.PropTypes.func,sort:T.PropTypes.func},i=d))||i);t.default=(0,j.connect)(function(e){return{bonus:e.bonus}},(0,m.default)({},S,{pushState:x.pushState}))(K),e.exports=t.default}).call(t,function(){return this}())},1090:function(e,t,a){(function(l){"use strict";function s(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t.default=e,t}function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,i,c,d,u=a(6),m=n(u),o=a(17),f=n(o),p=a(7),h=n(p),E=a(16),y=n(E),v=a(12),N=n(v),b=a(11),g=n(b),T=a(1),w=n(T),k=a(313),_=s(k),P=a(74),S=a(73),j=n(S),x=a(13),C=a(83),M=a(59),H=a(163),D=a(44),A=n(D),F=l.jQuery,O=-1,I={};I.curPage=1;var B=(r=(0,H.asyncConnect)([{promise:function(e){var t=e.store.dispatch;return t(_.payBackfindAll(I,1))}}]),r((d=c=function(e){function t(e){(0,h.default)(this,t);var a=(0,N.default)(this,(t.__proto__||(0,f.default)(t)).call(this,e));return a.state={list:1,pageNow:1},a}return(0,g.default)(t,e),(0,y.default)(t,[{key:"componentDidMount",value:function(){F("#datePicker1").date_input(),F("#datePicker2").date_input(),F(".time").find("img").click(function(e){F(e.currentTarget).prev().toggle()})}},{key:"search",value:function(){var e=(0,A.default)(".form-inline");e.curPage=1,e.startTime1=e.startTime?e.startTime+"T00:00:00.000+08:00":e.startTime,e.startTime2=e.startTime?e.startTime+"T23:59:59.999+08:00":e.startTime,e.endTime1=e.endTime?e.endTime+"T00:00:00.000+08:00":e.endTime,e.endTime2=e.endTime?e.endTime+"T23:59:59.999+08:00":e.endTime,(0,P.clearValidations)(".inout"),(0,P.subValidations)(".inout"),(0,P.subValidations)(".time"),(0,P.checkSpanStatus)(".sjmcinput")===!0&&this.props.searchBonusTrack(e,1)}},{key:"select",value:function(e){var t={curPage:e.eventKey};if("payBackfindAll"===this.props.bonus.findStatus&&(t.curPage=e.eventKey,this.props.payBackfindAll(t,e.eventKey)),"searchBonusTrack"===this.props.bonus.findStatus){var a=this.props.bonus.input;a.startTime1=a.startTime?a.startTime+"T00:00:00.000+08:00":a.startTime,a.startTime2=a.startTime?a.startTime+"T23:59:59.999+08:00":a.startTime,a.endTime1=a.endTime?a.endTime+"T00:00:00.000+08:00":a.endTime,a.endTime2=a.endTime?a.endTime+"T23:59:59.999+08:00":a.endTime,a.curPage=e.eventKey,this.props.searchBonusTrack(a,e.eventKey)}}},{key:"closeList",value:function(){F("#list").fadeOut(500)}},{key:"sort",value:function(e){O=~O,this.props.sort(e,O)}},{key:"render",value:function(){return w.default.createElement("div",null,w.default.createElement("div",{className:"dyh"},w.default.createElement("link",{rel:"stylesheet",href:"/assets/css/bj2.css"}),w.default.createElement("div",{className:"zuo_l"},w.default.createElement("span",{className:"biaoti"},"陈列活动")),w.default.createElement("form",{className:"form-inline"},w.default.createElement("div",{className:"you_r"},w.default.createElement("div",{className:"yiha"},w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"活动名称"),w.default.createElement("div",{className:"inout"},w.default.createElement("input",{id:"hdmch",type:"text","data-info":"none",placeholder:"请输入您的活动名称",name:"rewardName"})))),w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"商户名称"),w.default.createElement("div",{className:"inout"},w.default.createElement("input",{type:"text","data-info":"none",placeholder:"请输入您的商户名称",name:"storeName"})))),w.default.createElement("div",{className:"sousu"},w.default.createElement("input",{type:"button",value:"搜索",onClick:this.search.bind(this)}))),w.default.createElement("div",{className:"erha"},w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"开始时间"),w.default.createElement("div",{className:"time"},w.default.createElement("input",{type:"text","data-info":"ydm",placeholder:"请选择您的开始时间",name:"startTime",id:"datePicker1",className:"date_picker1"}),w.default.createElement("img",{src:"../../../../../assets/images/rili_tubiao.png"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada",style:{marginLeft:"71px"}},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"}))))),w.default.createElement("div",{className:"sjmcinput"},w.default.createElement("div",{className:"sj_top"},w.default.createElement("span",{className:"wbknr"},"结束时间"),w.default.createElement("div",{className:"time"},w.default.createElement("input",{type:"text","data-info":"ydm",placeholder:"请选择您的结束时间",name:"endTime",id:"datePicker2",className:"date_picker1"}),w.default.createElement("img",{src:"../../../../../assets/images/rili_tubiao.png"})),w.default.createElement("div",{className:"pd"},w.default.createElement("div",{className:"pada",style:{marginLeft:"71px"}},w.default.createElement("img",{src:"../../../../../assets/images/icon.png"}),w.default.createElement("span",{className:"error"}))))),w.default.createElement("div",{className:"sousu"},w.default.createElement("input",{type:"reset",value:"重置"})))))),w.default.createElement("div",{className:"bg_ml"},this.props.bonus&&this.props.bonus.list&&this.props.bonus.list.length>0?w.default.createElement("table",{cellPadding:"0",cellSpacing:"0"},w.default.createElement("tbody",null,w.default.createElement("tr",{className:"first",style:{height:"50px"}},w.default.createElement("td",{className:"table_tittle",width:"4%",onClick:this.sort.bind(this,"storeNo")},"商户ID"),w.default.createElement("td",{className:"table_tittle",width:"5%",onClick:this.sort.bind(this,"storeName")},"商户名称"),w.default.createElement("td",{className:"table_tittle",width:"6%",onClick:this.sort.bind(this,"rewardName")},"活动名称"),w.default.createElement("td",{className:"table_tittle",width:"7%",onClick:this.sort.bind(this,"startTime")},"活动开始时间"),w.default.createElement("td",{className:"table_tittle",width:"8%",onClick:this.sort.bind(this,"endTime")},"活动结束时间"),w.default.createElement("td",{className:"table_tittle",width:"5%",onClick:this.sort.bind(this,"displayStandard")},"活动陈列标准"),w.default.createElement("td",{className:"table_tittle",width:"6%",onClick:this.sort.bind(this,"rewardAmt")},"活动协议金额"),w.default.createElement("td",{className:"table_tittle",width:"6%",onClick:this.sort.bind(this,"rulesDetail")},"活动奖励规则")),this.props.bonus.list.map(function(e,t){return w.default.createElement("tr",{key:t,className:"tr_hover",style:{height:"80px"}},w.default.createElement("td",{style:{color:"#23a86c"}},e.storeNo),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},e.storeName),w.default.createElement("td",{style:{color:"#333333"}},e.rewardName),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},(0,M.yyyyMMdd)(e.startTime)),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},(0,M.yyyyMMdd)(e.endTime)),w.default.createElement("td",{style:{fontFamily:"Helvetica"},title:e.displayStandard},e.displayStandard.length>10?e.displayStandard.substring(0,9)+"...":e.displayStandard),w.default.createElement("td",{style:{fontFamily:"Helvetica"}},e.rewardAmt),w.default.createElement("td",{style:{fontFamily:"Helvetica"},title:e.rulesDetail},e.rulesDetail.length>10?e.rulesDetail.substring(0,9)+"...":e.rulesDetail))}))):w.default.createElement("p",null,"没有搜索到符合条件的数据！")),w.default.createElement(j.default,{items:this.props.bonus.pageCount,activePage:this.props.bonus.pageNow,onSelect:this.select.bind(this),style:this.props.bonus.list}))}}]),t}(T.Component),c.propTypes={bonus:T.PropTypes.object,OrderSearch:T.PropTypes.object,payBackfindAll:T.PropTypes.func,searchBonusTrack:T.PropTypes.func,setPayBackNow:T.PropTypes.func,hhMMss:T.PropTypes.func,setPageNow:T.PropTypes.func,sort:T.PropTypes.func},i=d))||i);t.default=(0,x.connect)(function(e){return{bonus:e.bonus}},(0,m.default)({},_,{pushState:C.pushState}))(B),e.exports=t.default}).call(t,function(){return this}())}});