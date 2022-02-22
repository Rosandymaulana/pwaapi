$(document).ready(function () {

    var _url = "https://my-json-server.typicode.com/Rosandymaulana/pwaapi/products"

    var dataResults = ''
    var catResults = ''
    var categories = []

    $.get(_url, function (data) {
        $.each(data, function (key, items) {

            _cat = items.category

            dataResults += "<div>"
                + "<h3>" + items.name + "</h3>"
                + "<p>" + _cat + "</p>"
            "<div>";

            if ($.inArray(_cat, categories) == -1) {
                categories.push(_cat)
                catResults += "<option value'" + _cat + "'>" + _cat + "</option>"
            }
        })

        $('#products').html(dataResults)
        $('#cat_select').html("<option value='all'>semua</option>" + catResults)
    })

    //Function Filter
    $("#cat_select").on('change', function () {
        updateProducts($(this).val())
    })

    function updateProducts(cat) {

        var dataResults = ''
        var _newUrl = _url

        if (cat != 'all')
            _newUrl = _url + "?category=" + cat

        $.get(_newUrl, function (data) {
            $.each(data, function (key, items) {

                _cat = items.category

                dataResults += "<div>"
                    + "<h3>" + items.name + "</h3>"
                    + "<p>" + _cat + "</p>"
                "<div>";
            })

            $('#products').html(dataResults)
        })

    }

})// end document ready jquery


//PWA
if ('serviceWorker' in navigator) { //pengecekan apakah sudah disupport/belom
    window.addEventListener('load', function () { //load data
        navigator.serviceWorker.register('/serviceworker.js').then(function (registration) { //disarankan di route jangan subFolder(sw/serviceworker)
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);//berhasil
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);//error
        });
    });
}




