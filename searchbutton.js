
var { search, suggest, regex } = require('puzzy-search');
function search() {
    var v1 = JSON.parse({
        "id": "1",
        "url": "videos/junior.mp4",
        "tags": ["kids","pizza"],
        "dialogue": "if your name is junior and you're really handsome come on raise your hand"
      });
    var v2 = JSON.parse({
        "id": "2",
        "url": "videos/knife.mp4",
        "tags": ["knife","kids"],
        "dialogue": "let me see what you have a knife no"
      });
    var v3 = JSON.parse({
        "id": "3",
        "url": "videos/giraffe.mp4",
        "tags": ["giraffe","colorado"],
        "dialogue": "say colorado i'm a giraffe"
      });
    var v4 = JSON.parse({
        "id": "4",
        "url": "videos/arrow.mp4",
        "tags": [],
        "dialogue": ""
      });
    var v5 = JSON.parse({
        "id": "5",
        "url": "videos/light.mp4",
        "tags": [],
        "dialogue": "kevin don't kevin kevin kevin kevin watch the light dude"
      });
    var v6 = ({
        "id": "6",
        "url": "videos/chickens.mp4",
        "tags": [],
        "dialogue": "look at all those chickens"
      });
    var vines = [v1,v2,v3,v4,v5,v6];
    var v1tags = ["kids", "pizza"];
    var v2tags = ["knife", "kids"];
    var v3tags = ["giraffe", "colorado"];

    var is = search("tirde", "i'm tired");
    if (is) {
        console.log(is);
    }
    
    var tags = [v1tags, v2tags, v3tags];
    var results = [];
<<<<<<< HEAD

    var input = document.getElementById('searchtext').value;
    var isTag = input.startsWith("#");
    input.toLowerCase();
    var searchtext = input.split();
    if (isTag) {
        for (var j = 0; j < searchtext.size(); j++) {
            searchtext[j] = searchtext[j].subStr(1);
            for (var k = 0; k < vines.size(); k++) {
                vines[k].tags.array.forEach(tag => {
                    if (searchtext[j] === tag && !results.includes(vines[k])) {
                        results.push(vines[k]);
                    }
                });
            }
        }
    }
    for (var i = 0; i < results.size(); i++) {
        var innerHTML = "<video><source src=" + results[i].url + "type=\"video/mp4\"></video><br>";
        document.getElementById("results").appendChild = innerHTML;
    }
    
=======
    document.getElementById("results").innerHTML = "<video controls><source src=\"videos/junior.mp4\" type=\"video/mp4\"></video>";
>>>>>>> afd06fb7722547771d6c9ee52a1489f48895be9e
}
