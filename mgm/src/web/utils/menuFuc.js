import jquery from 'jquery';

export function menuFuc() {
  jquery('.menua_a').click((el) => {
    const dj = jquery(el.currentTarget).hasClass('xz');
    const inde = jquery('.menu').children('ul').children('li').index(jquery(el.currentTarget).parent('li'));
    jquery('.menua_a').css('border-left', 'none');

    jquery('.menua_a').siblings('.ejcasa').hide();
    jquery('.menua_a').removeClass('xz');
    jquery('.menua_a').css('color', '#78909c');
    jquery('.menua_a').css('border-left', 'none');
    jquery('.menua_a').children('.jt_xl').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');

    jquery('.aaa0').find('img').attr('src', '../../../assets/images/sy_ml.png');
    jquery('.aaa').find('img').attr('src', '../../../assets/images/clgl_ml1.png');
    jquery('.aaa1').find('img').attr('src', '../../../assets/images/nrgl_ml.png');
    jquery('.aaa2').find('img').attr('src', '../../../assets/images/zdgl_ml.png');
    jquery('.aaa3').find('img').attr('src', '../../../assets/images/shgl_ml.png');
    jquery('.aaa4').find('img').attr('src', '../../../assets/images/xtgl_ml.png');

    if (dj) {
      jquery(el.currentTarget).siblings('.ejcasa').hide();
      jquery(el.currentTarget).removeClass('xz');
      jquery(el.currentTarget).css('color', '#78909c');
      jquery(el.currentTarget).css('border-left', 'none');
      jquery(el.currentTarget).children('.jt_xl').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');

      if (inde === 0) jquery(el.currentTarget).children('.aaa0').find('img').attr('src', '../../../assets/images/sy_ml.png');
      if (inde === 1) jquery(el.currentTarget).children('.aaa').find('img').attr('src', '../../../assets/images/clgl_ml1.png');
      if (inde === 2) jquery(el.currentTarget).children('.aaa1').find('img').attr('src', '../../../assets/images/nrgl_ml.png');
      if (inde === 3) jquery(el.currentTarget).children('.aaa2').find('img').attr('src', '../../../assets/images/zdgl_ml.png');
      if (inde === 4) jquery(el.currentTarget).children('.aaa3').find('img').attr('src', '../../../assets/images/shgl_ml.png');
      if (inde === 5) jquery(el.currentTarget).children('.aaa4').find('img').attr('src', '../../../assets/images/xtgl_ml.png');
    } else {
      jquery(el.currentTarget).siblings('.ejcasa').show();
      jquery(el.currentTarget).addClass('xz');
      jquery(el.currentTarget).css('color', '#333333');
      jquery(el.currentTarget).css('border-left', '3px solid #23a86c');
      jquery(el.currentTarget).children('.jt_xl').find('img').attr('src', '../../../assets/images/yjcd_xl.png');

      if (inde === 0) jquery(el.currentTarget).children('.aaa0').find('img').attr('src', '../../../assets/images/sy_ml1.png');
      if (inde === 1) jquery(el.currentTarget).children('.aaa').find('img').attr('src', '../../../assets/images/clgl_ml.png');
      if (inde === 2) jquery(el.currentTarget).children('.aaa1').find('img').attr('src', '../../../assets/images/nrgl_ml1.png');
      if (inde === 3) jquery(el.currentTarget).children('.aaa2').find('img').attr('src', '../../../assets/images/zdgl_ml1.png');
      if (inde === 4) jquery(el.currentTarget).children('.aaa3').find('img').attr('src', '../../../assets/images/shgl_ml1.png');
      if (inde === 5) jquery(el.currentTarget).children('.aaa4').find('img').attr('src', '../../../assets/images/xtgl_ml1.png');
    }
  });

  jquery('.menua_a').hover((el) => {
    const inde = jquery('.menu').children('ul').children('li').index(jquery(el.currentTarget).parent('li'));
    jquery(el.currentTarget).css('color', '#333333');
    jquery(el.currentTarget).children('.jt_xl').find('img').attr('src', '../../../assets/images/yjcd_xl.png');

    if (inde === 0) jquery(el.currentTarget).children('.aaa0').find('img').attr('src', '../../../assets/images/sy_ml1.png');
    if (inde === 1) jquery(el.currentTarget).children('.aaa').find('img').attr('src', '../../../assets/images/clgl_ml.png');
    if (inde === 2) jquery(el.currentTarget).children('.aaa1').find('img').attr('src', '../../../assets/images/nrgl_ml1.png');
    if (inde === 3) jquery(el.currentTarget).children('.aaa2').find('img').attr('src', '../../../assets/images/zdgl_ml1.png');
    if (inde === 4) jquery(el.currentTarget).children('.aaa3').find('img').attr('src', '../../../assets/images/shgl_ml1.png');
    if (inde === 5) jquery(el.currentTarget).children('.aaa4').find('img').attr('src', '../../../assets/images/xtgl_ml1.png');
  }, (el) => {
    const inde = jquery('.menu').children('ul').children('li').index(jquery(el.currentTarget).parent('li'));
    if (!jquery(el.currentTarget).hasClass('xz')) {
      jquery(el.currentTarget).css('color', '#78909c');
      jquery(el.currentTarget).children('.jt_xl').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');
      if (inde === 0) jquery(el.currentTarget).children('.aaa0').find('img').attr('src', '../../../assets/images/sy_ml.png');
      if (inde === 1) jquery(el.currentTarget).children('.aaa').find('img').attr('src', '../../../assets/images/clgl_ml1.png');
      if (inde === 2) jquery(el.currentTarget).children('.aaa1').find('img').attr('src', '../../../assets/images/nrgl_ml.png');
      if (inde === 3) jquery(el.currentTarget).children('.aaa2').find('img').attr('src', '../../../assets/images/zdgl_ml.png');
      if (inde === 4) jquery(el.currentTarget).children('.aaa3').find('img').attr('src', '../../../assets/images/shgl_ml.png');
      if (inde === 5) jquery(el.currentTarget).children('.aaa4').find('img').attr('src', '../../../assets/images/xtgl_ml.png');
    }
  });

  /* 二级菜单*/
  jquery('.ejcasa ul li').click((el) => {
    jquery('.ejcasa ul li').removeClass('lvse');
    jquery(el.currentTarget).addClass('lvse');
  });
  jquery('.ejcasa ul li').hover((el) => {
    jquery(el.currentTarget).addClass('lvss');
  }, (el) => {
    jquery(el.currentTarget).removeClass('lvss');
  });
}
