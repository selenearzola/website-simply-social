$('#btn-add-user').on('click', function(e) {

  e.preventDefault();


  if(!validateFields()){
   $('.response-message').text('Please fill all the fields.').css('color', '#FF0000').show();   
   return;
    }


  $('.response-message').text('');    
  validateEmail($('#email').val());

});

$('.add-comment').on('click', function(e){
  e.preventDefault();
  $('.modal-comment').toggle();
  $('.modal-overlay').css("display", "block");
});
$('.add-user').on('click', function(e){
  e.preventDefault();
  $('.modal-user').toggle();
  $('.modal-overlay').css("display", "block");
});
$('.close-button').on('click', function(e) {
  e.preventDefault();

  $('.response-message').text('');
  $('form :input').val("");



  $('.modal-user, .modal-comment').hide();
  $('.modal-overlay').css("display", "none");
});


function validateFields(){
  var valid = true;
  $('input').each(function() {
    if ($(this).val().length == 0) {
      valid = false;
      return false;
    }
  });
  
  return  valid;
}



function validateEmail(email) {
  $.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: 'https://bpi.briteverify.com/emails.json',
    data: {
      address: email,
      apikey: '07422695-8c01-4822-a418-9a17fe71f330'
    }
  })
  .done(function( data, textStatus, jqXHR) {
    if(data.status === 'valid') {
      $('.response-message').text('Your user has been created.').css('color', '#00B085').show();
    } else {

      $('.response-message').text('Your email address is not valid, please try another.').css('color', '#FF0000').show();

    }
  }).fail(function(jqXHR, textStatus, errorThrown ) {
          // something went wrong
        });
}
