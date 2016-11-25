import jquery from 'jquery';

export function loginFuc() {
  jquery('.delu_xl').click((el) => {
    const Isok = jquery(el.currentTarget).hasClass('xs');
    if (Isok) {
      jquery('.dl_zuxe').hide();
      jquery(el.currentTarget).removeClass('xs');
    } else {
      jquery('.dl_zuxe').show();
      jquery(el.currentTarget).addClass('xs');
    }
  });

  jquery('body').click(() => {
    jquery('.dl_zuxe').hide();
  });
  jquery('.dl_ml').click((ev) => {
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

  jquery('.dl_zuxe ul li').click((el) => {
    jquery(el.currentTarget).addClass('active').siblings().removeClass('active');
  });

  jquery('.delu_xl').click(() => {
    const bian = jquery('.delu_xl').find('img').attr('src').indexOf('xl_wxz_hui.png');
    if (bian > 0) {
      jquery('.delu_xl').find('img').attr('src', '../../../assets/images/yjcd_xl.png');
    } else {
      jquery('.delu_xl').find('img').attr('src', '../../../assets/images/xl_wxz_hui.png');
    }
  });
}
