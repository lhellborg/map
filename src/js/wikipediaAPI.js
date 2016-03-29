var wikiRequest = function(name) {
    //Wikipedia JSON-P request
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        name + "&prop=info&inprop=url&rvprop=content&format=json&callback=wikiCallback";


    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function(data) {
            if (data[1].length > 0)

                for (i = 0; i < 1; i++) {
                var name = data[1][i];
                var url = data[3][i];
                $(".wiki-links").append("<li><a href=" + url + " target=_blank>" + name + "</a></li>"); //when clicked on a link a new tab opens
            }
            else {
                $(".wiki-links").append("<li>Sorry, no wikipedia links available</li>");
            }

        }

    }); //.fail() function not compatible with jsonp

};
