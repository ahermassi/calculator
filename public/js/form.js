(function($) {
    var form = $('#form');

    form.submit(function(event) {
        event.preventDefault();
        var firstOperand = $('#first-operand').val(), secondOperand = $('#second-operand').val(),
            operator = $('#operator').val();
        var requestConfig = {
            method: 'POST',
            url: '/calculator',
            contentType: 'application/json',
            data: JSON.stringify({
                firstOperand: firstOperand,
                secondOperand: secondOperand,
                operator: operator
            })
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            $('#form').get(0).reset()
        });

    })

})(window.jQuery);