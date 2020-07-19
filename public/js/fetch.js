function fetch($) {
    var recentCalculations = $('#recent-calculations');
    var requestConfig = {
        method: 'post',
        url: '/calculator/fetch',
        contentType: 'application/json'
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        recentCalculations.html($(responseMessage));
    });

}

setInterval(function() {
    fetch(window.jQuery) // This will run after every 5 seconds
}, 1000);