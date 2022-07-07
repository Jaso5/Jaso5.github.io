var news;
var insert = document.getElementsByName("main")//document.getElementById("news-goes-here");

function import_news(location) {
    news = JSON.parse(get_json(location));

    for (i = 0; i < news.content.length; i++) {
        console.log(news.content[i].title)

        var item = document.createElement("section");

        var img = document.createElement("img");
        var text = document.createElement("p");
        var link = document.createElement("a");

        img.src = news.content[i].image;
        text.innerText = news.content[i].preview;

        link.href = news.content[i].link;
        link.innerText = "Read More"
                
        item.appendChild( img )
        item.appendChild( text )
        item.appendChild( link )

        insert[0].appendChild(item);
    }
}

function get_json(location) {
    var request = new XMLHttpRequest;
    request.open("GET", location, false);
    request.send(null)
    return request.responseText
}