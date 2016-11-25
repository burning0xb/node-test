import jquery from 'jquery';

export function roleEditFuc() {
    // /*点击二级菜单展开*/
  jquery('.js_r_dw ul li').click((el) => {
    const zt = jquery(el.currentTarget).hasClass('lo');
    if (zt) {
      jquery(el.currentTarget).children('.erji').hide();
      jquery(el.currentTarget).removeClass('lo');
    } else {
      jquery(el.currentTarget).children('.erji').show();
      jquery(el.currentTarget).addClass('lo');
    }
  });
  // /*一级菜单选中*/
  jquery('.anniu').click((el) => {
    const et = jquery(el.currentTarget).hasClass('mn');
    const inde5 = jquery('.js_r_dw').children('ul').children('li').index(jquery(el.currentTarget).parents('li'));
    if (et) {
      jquery(el.currentTarget).find('img').attr('src', '../../../assets/images/5yccd_js_hui.png');
      jquery(el.currentTarget).removeClass('mn');
      jquery(el.currentTarget).parents('.zong').css('background', 'none');
      jquery(el.currentTarget).siblings('.yiji').css('color', '#78909c');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('.li_r').find('img').attr('src', '../../../assets/images/5yccd_js_hui.png');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('li').css('border-right', 'none');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('li').find('.li_r').removeClass('huang');

      if (inde5 === 0) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/xtgl_ml.png');
      if (inde5 === 1) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/clgl_ml1.png');
      if (inde5 === 2) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/nrgl_ml.png');
      if (inde5 === 3) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/zdgl_ml.png');
      if (inde5 === 4) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/shgl_ml.png');
    } else {
      jquery(el.currentTarget).find('img').attr('src', '../../../assets/images/5yccd_js_lv.png');
      jquery(el.currentTarget).addClass('mn');
      jquery(el.currentTarget).parents('.zong').css('background', '#23a86c');
      jquery(el.currentTarget).siblings('.yiji').css('color', '#ffffff');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('.li_r').find('img').attr('src', '../../../assets/images/5yccd_js_huang.png');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('li').css('border-right', '3px solid #ffca28');
      jquery(el.currentTarget).parents('.zong').siblings('.erji').find('li').find('.li_r').addClass('huang');

      if (inde5 === 0) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/xtgl_ml_bai.png');
      if (inde5 === 1) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/clgl_ml_bai.png');
      if (inde5 === 2) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/nrgl_ml_bai.png');
      if (inde5 === 3) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/zdgl_ml_bai.png');
      if (inde5 === 4) jquery(el.currentTarget).siblings('.yiji').find('img').attr('src', '../../../assets/images/shgl_ml_bai.png');
    }
  });

  jquery('.anniu').click((ev) => {
    if (ev.preventDefault) {
      // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });


  // /*二级菜单选中*/
  jquery('.li_r').click((el) => {
    const op = jquery(el.currentTarget).hasClass('huang');
    const inde6 = jquery('.js_r_dw').children('ul').children('li').index(jquery(el.currentTarget).parents('.erji').parents('li'));
    if (op) {
      jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.anniu').find('img').attr('src', '../../../assets/images/5yccd_js_hui.png');
      jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.anniu').removeClass('mn');
      jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').css('color', '#78909c');
      jquery(el.currentTarget).parents('.erji').siblings('.zong').css('background', 'none');

      if (inde6 === 0) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/xtgl_ml.png');
      if (inde6 === 1) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/clgl_ml1.png');
      if (inde6 === 2) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/nrgl_ml.png');
      if (inde6 === 3) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/zdgl_ml.png');
      if (inde6 === 4) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/shgl_ml.png');

      jquery(el.currentTarget).find('img').attr('src', '../../../assets/images/5yccd_js_hui.png');
      jquery(el.currentTarget).removeClass('huang');
      jquery(el.currentTarget).parent('li').css('border-right', 'none');
    } else {
      jquery(el.currentTarget).find('img').attr('src', '../../../assets/images/5yccd_js_huang.png');
      jquery(el.currentTarget).addClass('huang');
      jquery(el.currentTarget).parent('li').css('border-right', '3px solid #ffca28');


      const jj = jquery(el.currentTarget).parents('.erji').children('ul').children('li').size();
      let ss = 0;
      for (let ii = 0; ii < jj; ii++) {
        if (jquery(el.currentTarget).parents('.erji').children('ul').children('li').eq(ii).find('.li_r').hasClass('huang')) ss++;
      }
      if (ss === jj) {
        jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.anniu').find('img').attr('src', '../../../assets/images/5yccd_js_lv.png');
        jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.anniu').addClass('mn');
        jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').css('color', '#ffffff');
        jquery(el.currentTarget).parents('.erji').siblings('.zong').css('background', '#23a86c');

        if (inde6 === 0) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/xtgl_ml_bai.png');
        if (inde6 === 1) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/clgl_ml_bai.png');
        if (inde6 === 2) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/nrgl_ml_bai.png');
        if (inde6 === 3) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/zdgl_ml_bai.png');
        if (inde6 === 4) jquery(el.currentTarget).parents('.erji').siblings('.zong').children('.yiji').find('img').attr('src', '../../../assets/images/shgl_ml_bai.png');
      }
    }
  });

  jquery('.erji').click((ev) => {
    if (ev.preventDefault) {
    // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
    // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });

  // <!--点击编辑-->
  jquery('.ckqx').click((el) => {
    const ckqx = jquery(el.currentTarget).hasClass('ck');
    if (ckqx) {
      jquery(el.currentTarget).css('color', '#78909c');
      jquery(el.currentTarget).removeClass('ck');
    } else {
      jquery(el.currentTarget).css('color', '#23a86c');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.ckqx').css('color', '#78909c');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.ckqx').removeClass('ck');
      jquery(el.currentTarget).siblings('.sc').css('color', '#78909c');
      jquery(el.currentTarget).siblings('.sc').removeClass('shanchu');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.sc').removeClass('shanchu');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.sc').css('color', '#78909c');
      jquery(el.currentTarget).addClass('ck');
    }
  });

  jquery('.sc').click((el) => {
    const sc = jquery(el.currentTarget).hasClass('shanchu');
    if (sc) {
      jquery(el.currentTarget).css('color', '#78909c');
      jquery(el.currentTarget).removeClass('shanchu');
    } else {
      jquery(el.currentTarget).css('color', '#23a86c');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.sc').css('color', '#78909c');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.sc').removeClass('shanchu');
      jquery(el.currentTarget).siblings('.ckqx').css('color', '#78909c');
      jquery(el.currentTarget).siblings('.ckqx').removeClass('ck');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.ckqx').removeClass('ck');
      jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.ckqx').css('color', '#78909c');
      jquery(el.currentTarget).addClass('shanchu');
    }
  });

  // /*鼠标经过*/
  jquery('.ckqx').hover((el) => {
    jquery(el.currentTarget).css('color', '#23a86c');
  }, (el) => {
    const bjj1 = jquery(el.currentTarget).hasClass('ck');
    if (bjj1) {
      jquery(el.currentTarget).css('color', '#23a86c');
    } else {
      jquery(el.currentTarget).css('color', '#78909c');
    }
  });

  jquery('.sc').hover((el) => {
    jquery(el.currentTarget).css('color', '#23a86c');
  }, (el) => {
    const czz1 = jquery(el.currentTarget).hasClass('shanchu');
    if (czz1) {
      jquery(el.currentTarget).css('color', '#23a86c');
    } else {
      jquery(el.currentTarget).css('color', '#78909c');
    }
  });

  // /*点击空白隐藏*/
  jquery('body').click(() => {
    jquery('.ckqx').css('color', '#78909c');
    jquery('.ckqx').removeClass('ck');
  });
  jquery('.ckqx').click((ev) => {
    if (ev.preventDefault) {
    // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
    // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });

  jquery('body').click(() => {
    jquery('.sc').css('color', '#78909c');
    jquery('.sc').removeClass('shanchu');
  });
  jquery('.sc').click((ev) => {
    if (ev.preventDefault) {
    // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
    // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });

  jquery('.select').click((el) => {
    jquery('.select').removeClass('hav');
    jquery('.jt_top').hide();
    jquery('.jt_top1').hide();
    jquery('.xljt_js').children('img').attr('src', '../../../assets/images/xl_wxz_hui.png');
    jquery('.selected-box').css('border-bottom', '1px solid #bbc7cd');
    jquery('.option-box').hide();
    jquery(el.currentTarget).parents('.jslb_ml').siblings('.jslb_ml').find('.select').removeClass('hav');
    const tt = jquery(el.currentTarget).hasClass('hav');
    if (tt) {
      jquery(el.currentTarget).children('.option-box').hide();
      jquery(el.currentTarget).removeClass('hav');
      jquery(el.currentTarget).siblings('.jt_top').hide();
      jquery(el.currentTarget).siblings('.jt_top1').hide();
      jquery(el.currentTarget).children('.xljt_js').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');
      jquery(el.currentTarget).children('.selected-box').css('border-bottom', '1px solid #bbc7cd');
    } else {
      jquery(el.currentTarget).children('.option-box').show();
      jquery(el.currentTarget).addClass('hav');
      jquery(el.currentTarget).siblings('.jt_top').show();
      jquery(el.currentTarget).siblings('.jt_top1').show();
      jquery(el.currentTarget).children('.xljt_js').find('img').attr('src', '../../../assets/images/yjcd_xl.png');
      jquery(el.currentTarget).children('.selected-box').css('border-bottom', '1px solid #23a86c');
    }
  });

  // /*选中的文本赋给文本框*/
  jquery('.option').click((el) => {
    jquery(el.currentTarget).addClass('selected').siblings('.option').removeClass('selected');
    const txt = jquery(el.currentTarget).text(); // 给选中的文本赋值
    jquery(el.currentTarget).parent().siblings('.selected-box').text(txt);
    jquery(el.currentTarget).parents('.option-box').css('display', 'none');
    jquery(el.currentTarget).parents('.select').removeClass('hav');
  });
  jquery('.option').click((ev) => {
    if (ev.preventDefault) {
    // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
    // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });


  jquery('.option1').click((el) => {
    jquery(el.currentTarget).addClass('selected').siblings('.option1').removeClass('selected');
    const txt = jquery(el.currentTarget).text(); // 给选中的文本赋值
    jquery(el.currentTarget).parent().siblings('.selected-box').text(txt);
    jquery(el.currentTarget).parents('.option-box').css('display', 'none');
    jquery(el.currentTarget).parents('.select').removeClass('hav');
  });
  jquery('.option1').click((ev) => {
    if (ev.preventDefault) {
    // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
    // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });

  // /*点击其他地方下拉隐藏*/
  jquery('body').click(() => {
    jquery('.option-box').hide();
    jquery('.jt_top').hide();
    jquery('.jt_top1').hide();
    jquery('.inout').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');
    jquery('.selected-box').css('border-bottom', '1px solid #bbc7cd');
  });

  jquery('.select').click((ev) => {
    if (ev.preventDefault) {
      // Firefox
      ev.preventDefault();
      ev.stopPropagation();
    } else {
      // IE
      ev.cancelBubble = true;
      ev.returnValue = false;
    }
  });
}
