var fun_EmailAttempts = 0; // I like to have some fun


$(function () {

    console.log("hey\nif ur snooping around in here i want to formally apologize for all of my code\nits a mess ik\n\notherwise... enjoy the show")
    $('.modal').hide()
    setTimeout(function () {
        $('.modal').show()
    }, 0)

    $('.hover-button').each(function () {
        $('.button-icon').hide()
    })


    $('.hover-button').hover(function () {
        $('.button-icon').show(200)
    }, function () {
        $('.button-icon').hide(200)
    })


    $('.modal-close').click(function () {
        closeForm()
    })
})

function notfiy(text) {

}

function openContactForm() {
    $('.modal').show()
}

function closeForm() {

    $('.modal').css('animation', 'none')
    $('.modal').animate({
        'opacity': 0,
    }, 300, function () {
        $('.modal').hide()
        $('.modal').css('opacity', 1)
        $('form').children().css('opacity', 1);
        $('#contact-loader').addClass('hidden')
    })


}

function clearInputs(inputs) {
    inputs.each(function () {
        $(this).val('')
    })
}


function submit() {
    if (!$('#contact-submit').attr('disabled') || $('#contact-submit').attr('disabled') == 'false') {
        var data = {}
        var inputs = $('form').find('input, textarea')

        inputs.each(function () {
            data[$(this).attr('name')] = $(this).val()
        })
        $('#contact-error').text('')
        $.post('contact.php', data)
            .done(function (returnData) {
                fun_EmailAttempts = 0;
                $('form').children().css('opacity', 0);
                $('#contact-loader').removeClass('hidden')
                $('.full-center-top').css('opacity', 1)
                $('#contact-loader').html('<span class="emphasis">Sent</span>')

                setTimeout(function () {
                    closeForm()
                    $('#contact-submit').removeAttr('disabled')
                    $('#contact-submit').html('Send Email <img class="button-icon" src="Content/SVG/paper-airplane-svgrepo-com.svg">')
                    clearInputs(inputs)
                }, 2000)

            })
            .fail(function (a, b, c) {
                console.log(a, b, c);
                fun_EmailAttempts += 1;
                setTimeout(function () {
                    $('#contact-submit').removeAttr('disabled')
                    $('#contact-submit').html('Send Email <img class="button-icon" src="Content/SVG/paper-airplane-svgrepo-com.svg">')

                    if (fun_EmailAttempts < 3) {
                        $('#contact-error').text(c)
                    } else if (fun_EmailAttempts < 8) {
                        $('#contact-error').text("okay seriously calm down")
                    } else if (fun_EmailAttempts < 13) {
                        $('#contact-error').text("are you okay??")
                    } else if (fun_EmailAttempts < 18) {
                        $('#contact-error').text("get help.")
                    }
                    
                }, 2000)

            })
        $('#contact-submit').attr('disabled', 'true')
        $('#contact-submit').html('<div class="lds-ring"><div></div><div></div><div></div><div></div></div>')
    }

}
