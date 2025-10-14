$(function() {

	// Get the form.
	var form = $('#contact-form');

	// Get the messages div.
	var formMessages = $('.form-messege');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

});
function CRMPostLocal(crm1, crm2, crm3, crm4, crm5) {
    // Generate a secure random QUERY_ID
    let crm6 = "T" + crypto.randomUUID();

    let postD = {
        name: crm1,
        email_from: crm2,
        mobile: crm3,
        phone: crm3,
        city: crm4,
        contact_name: crm5,
        QUERY_ID: crm6
    };

    $.ajax({
        url: 'https://crm.marutair.com/marutAir/lead/add',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(postD),
        success: function(data) {
            if (data != null) {
                _ITBObject = data;
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}


function PostDataLocal(objForm) {
    var ctype = "";
    var frmCtrlValue = '';
    var frmCtrlName = '';
    var IsCheckBox = false;
    var IsRadioBtn = false;
    var Bol_IsOk = true;
    var isButton = false;
    var IsMandatory = false;
    var formobj = objForm.elements.length;
    var formCtrl = null;
    var _extdata = [];
    var _extTempData = "";
    var ilop = 0;
    var FieldArr = new Array();

    for (var i = 0; i < formobj; i++) {
        isButton = false;
        formCtrl = objForm.elements[i];
        IsMandatory = formCtrl.getAttribute('ismandatory');

        if (IsMandatory == '' || IsMandatory == null) {
            IsMandatory = true;
        }
        if (formCtrl.type == 'checkbox') {
            IsCheckBox = formCtrl.checked;
        }
        if (formCtrl.type == 'radio') {
            IsRadioBtn = formCtrl.checked;
        }
        if (formCtrl.type == 'button' || formCtrl.type == 'submit') {
            isButton = true;
        }
        if (isButton == false) {
            frmCtrlValue = formCtrl.value;
            frmCtrlName = formCtrl.name;
            if (frmCtrlName.toLowerCase() == "ctype") { ctype = formCtrl.value; }
            if (IsMandatory == true) {
                if (frmCtrlValue == '' || frmCtrlValue == null) {
                    Bol_IsOk = false;
                    alert(frmCtrlName + ' ' + "field is  required");
                    break;
                }
            }

            if (frmCtrlName.toLowerCase() != "ctype") {
                _extTempData = _extTempData + formCtrl.name + "," + formCtrl.value + "^";
                if (frmCtrlName == 'name')
								                {
								                    crm1 = frmCtrlValue;
								                    crm5 = crm1;
								                    crm6 = "naresh@indiantradebird.com";
								                }
								                else if (frmCtrlName == 'mail') {
								                    crm2 = frmCtrlValue;
								                }
								                else if (frmCtrlName == 'subj') {
								                    crm3 = frmCtrlValue;
								                }
								                else if (frmCtrlName == 'location') {
								                    crm4 = frmCtrlValue;
                }
            }
        }
    }
 if (Bol_IsOk == true) {
    _extdata = _extTempData.substring(0, (_extTempData.length - 1));

    if (ctype == 'I1148') {
        // Safe, unique random ID (no linter warning)
        crm6 = Date.now().toString() + Math.floor(Math.random() * 10000);

        CRMPostLocal(crm1, crm2, crm3, crm4, crm5, crm6);
    }

    AjaxPost(_extdata, ctype);
}

}
