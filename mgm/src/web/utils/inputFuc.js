import jquery from 'jquery';

export function inputStyle() {
  jquery('.inout input').focus((el) => {
    jquery(el.target).parent().siblings('img').attr('src', '../../../assets/images/sjmc_input.png');
    jquery(el.target).parents('.sjmcinput').siblings('.sjmcinput').find('img').attr('src', '../../../assets/images/hdmc_input.png');
    jquery(el.target).parents('.yiha').siblings('.yiha').children('.sjmcinput').find('img').attr('src', '../../../assets/images/hdmc_input.png');
  });
}

export function selectStyle() {
  jquery('.select-zhong').on('click', (el) => {
    jquery('.jt_top').hide();
    jquery('.inout').children('img').attr('src', '../../../assets/images/hdmc_input.png');
    const Isok = jquery(el.target).children('.option-box').is(':hidden');
    if (Isok) {
      jquery('.select .option-box').hide();
      jquery(el.target).children('.option-box').show();
      jquery(el.target).siblings('.jt_top').show();
      jquery(el.target).siblings().find('.inout').hide();
      jquery(el.target).parents('.inout').children('img').attr('src', '../../../assets/images/sjmc_input_s.png');
    } else {
      jquery(el.target).children('.option-box').hide();
      jquery(el.target).parents('.inout').children('img').attr('src', '../../../assets/images/sjmc_input_s.png');
    }
  });
  jquery('.select-zhong .option-box-zhong .option').on('click', (el) => {
    jquery(el.target).addClass('selected').siblings('.option').removeClass('selected');
    const txt = jquery(el.target).text(); // 给选中的文本赋值
    jquery(el.target).parent().siblings('.selected-box').text(txt); // 选中的文本提交到输入框中
    jquery(el.target).parents('.option-box').css('display', 'none'); // UL隐藏
  });

  jquery('body').click(() => {
    jquery('.select .option-box').hide();
    jquery('.jt_top').hide();
  });
  jquery('.select').click((ev) => {
    console.log(333);
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
