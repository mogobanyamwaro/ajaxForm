$(function () {
  // Get the form.
  var form = $('#contact-form');

  // Get the messages div.
  var formMessages = $('.ajax-response');

  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    const f_name = $('#custom_connect').val();
    $('#connectivity').val(f_name);
    const f_name2 = $('#intern_other_input').val();
    $('#intern_other').val(f_name2);
    const f_name3 = $('#custom_amount').val();
    $('#disability').val(f_name3);

    // Serialize the form data.
    var formData = $(form).serialize();
    console.log(formData);

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#contact-form input,#contact-form textarea').val('');
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            'Oops! An error occured and your message could not be sent.'
          );
        }
      });
  });
});
