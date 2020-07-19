function validateInput(input, errorSpan) {
    let isValid = true;
    if (!input) {
        isValid = false;
        errorSpan.removeAttr('hidden');
        errorSpan.text('Field can\'t be empty');
    }

    else if (!$.isNumeric(input)) {
        isValid = false;
        errorSpan.removeAttr('hidden');
        errorSpan.text('Operand has to be a number');
    }
    return isValid;
}

(function($) {

    let form = $('#form'), firstOperandError = $('#first-operand-error'),
        secondOperandError = $('#second-operand-error');

    form.submit(function(event) {

        event.preventDefault();
        firstOperandError.attr('hidden', true);
        secondOperandError.attr('hidden', true);
        let firstOperand = $('#first-operand').val(), secondOperand = $('#second-operand').val(),
            operator = $('input[name=operator]:checked').val();

        let firstOperandValid = validateInput(firstOperand, firstOperandError);
        let secondOperandValid = validateInput(secondOperand, secondOperandError);

        if(firstOperandValid && secondOperandValid) {
            firstOperandError.attr('hidden', true);
            secondOperandError.attr('hidden', true);
            let requestConfig = {
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
        }
    })

})(window.jQuery);