



$("#contact-form-main").submit((e) => {

  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbwnYT-ukW1KzWPlahOeZ3Ym8zFz14ou_5go9ovxpA/exec",
    data: $("#contact-form-main").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-enquiry").css("display", "block");
      $('#contact-form-main')[0].reset();
      fadeOut(".success-message-enquiry");
    },
    error: function(err) {
      $(".error-message-enquriy").css("display", "block");
      fadeOut(".error-message-enquriy");
    }
  })
})

$("#complaint-form-main").submit((e) => {
  e.preventDefault()
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbzvQ7Ra4BJjuTiAHq9hhSe0yjyMgysh2_NZlhom-w/exec",
    data: $("#complaint-form-main").serialize(),
    type: "POST",
    success: function(response) {
      $(".success-message-complaint").css("display", "block");
      $('#complaint-form-main')[0].reset();
      fadeOut(".success-message-complaint");
    },
    error: function(err) {
      $(".error-message-complaint").css("display", "block");
      fadeOut(".error-message-complaint");
    }
  })
})

function fadeOut(className) {
  setTimeout(function(){
    $(className).css("display", "none");
  }, 6000);
}

$(".enquiry-submit").click(function() {

    $('.contact-form').css('pointer-events', 'none');
    $('.contact-form').css('opacity', '0.6');

    setTimeout(function(){
      $('.contact-form').css('pointer-events', 'auto');
      $('.contact-form').css('opacity', '1');
    }, 4000);
});

$(".complaint-submit").click(function() {

    $('.contact-form').css('pointer-events', 'none');
    $('.contact-form').css('opacity', '0.6');

    setTimeout(function(){
      $('.contact-form').css('pointer-events', 'auto');
      $('.contact-form').css('opacity', '1');
    }, 4000);
});
