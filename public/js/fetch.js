function fetch($) {
    let recentCalculations = $('#recent-calculations');
    let requestConfig = {
        method: 'post',
        url: '/calculator/fetch',
        contentType: 'application/json'
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        recentCalculations.html($(responseMessage));
    });

}

setInterval(function() {
    fetch(window.jQuery) // This will run every 1 second
}, 1000);