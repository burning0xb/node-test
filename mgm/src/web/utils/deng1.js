import jquery from 'jquery';

export function deng() {
  jquery('.dl_an').click((el) => {
    const ml = jquery('.yhm').eq(0).find('input').val();
    const mll = jquery('.yhm').eq(1).find('input').val();
    if ( ml === '' || mll === '') {
      jquery(el.currentTarget).siblings('.pd').children('.pada').show();
    } else {
      jquery(el.currentTarget).siblings('.pd').children('.pada').hide();
    }
  });
}
