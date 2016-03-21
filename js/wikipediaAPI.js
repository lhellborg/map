
var wikiRequest = function(name) {
    //Wikipedia JSON-P request
    var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
    name + "&prop=info&inprop=url&rvprop=content&format=json&callback=wikiCallback"

    //error handling when running for too long
    var wikiRequestTimeout = setTimeout(function() {
        $(".wiki-links").text("Sorry, no wikipedia page could be found");
    }, 2000);

    $.ajax({
        url: wikiURL,
        dataType: 'jsonp',
        success: function(data) {

            for (i=0; i < data[3].length; i++) {
                var name = data[1][i];
                var url = data[3][i];
                $(".wiki-links").append("<li><a href="+  url + ">" + name +  "</a></li>");
                if (url != null) {
                    clearTimeout(wikiRequestTimeout);
                }
            }


        }
    });
};
