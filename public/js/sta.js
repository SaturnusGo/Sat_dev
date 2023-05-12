function toggleAnimations() {
  if ($('.loading').hasClass('visible')) {
    $('.loading').css('z-index', '9998');
    $('.saturnusgo').css('z-index', '9999').removeClass('hidden').addClass('visible blur-transition');
    setTimeout(() => {
      $('.loading').removeClass('visible').addClass('hidden');
      setTimeout(() => {
        $('.loading').remove();
      }, 1000);
    }, 1500);
  } else {
    $('.saturnusgo').css('z-index', '9998');
    $('.loading').css('z-index', '9999').removeClass('hidden').addClass('visible blur-transition');
    setTimeout(() => {
      $('.saturnusgo').removeClass('visible').addClass('hidden');
      setTimeout(() => {
        $('.saturnusgo').remove();
      }, 1000);
    }, 1500);
  }
}

$(window).on('load', function() {
  $('.loading').removeClass('hidden').addClass('visible blur-transition');
  setInterval(toggleAnimations, 2500);
  setTimeout(() => {
    $('.loading, .saturnusgo').remove();
  }, 6500);
});
