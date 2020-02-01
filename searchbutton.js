console.log('loading search');

function search() {
    var v1 = {
        id: "1",
        url: "videos/junior.mp4",
        tags: ["#kids","#pizza"],
        transcript: "if your name is junior and you're really handsome come on raise your hand",
        score: 0
      };
    var v2 = {
        id: "2",
        url: "videos/knife.mp4",
        tags: ["#knife","#kids"],
        transcript: "let me see what you have a knife no",
        score: 0
      };
    var v3 = {
        id: "3",
        url: "videos/giraffe.mp4",
        tags: ["#giraffe","#colorado"],
        transcript: "say colorado i'm a giraffe",
        score: 0
      };
    var v4 = {
        id: "4",
        url: "videos/arrow.mp4",
        tags: [],
        transcript: "",
        score: 0
      };
    var v5 = {
        id: "5",
        url: "videos/light.mp4",
        tags: [],
        transcript: "kevin don't kevin kevin kevin kevin watch the light dude",
        score: 0
      };
    var v6 = {
        id: "6",
        url: "videos/chickens.mp4",
        tags: [],
        transcript: "look at all those chickens",
        score: 0
      };
    var vines = [v1,v2,v3,v4,v5,v6];
    var results = [];

    var input = document.getElementById('searchtext').value;
    console.log(input);
    var isTag = input.startsWith("#");
    input.toLowerCase();
    var searchtext = input.split(" ");
    console.log(searchtext);
    if (isTag) {
        for (var j = 0; j < searchtext.length; j++) {
            //searchtext[j] = searchtext[j].subString(1);
            for (var k = 0; k < vines.length; k++) {
                vines[k].tags.forEach(tag => {
                    if (searchtext[j] === tag && !results.includes(vines[k])) {
                        results.push(vines[k]);
                        vines[k].score++;
                        console.log(vines[k].url);
                        console.log(vines[k].score);
                    }
                });
            }
        }
    } else {
        for (var l = 0; l < vines.length; l++) {
            console.log("searching transcript");
            searchtext.forEach(term => {
                if (vines[l].transcript.includes(term) && !results.includes(vines[l])) {
                    vines[l].score++;
                    results.push(vines[l]);
                    console.log(vines[l].url);
                    console.log(vines[l].score);
                    
                }
            });
        }
    }
    var vineresults = "";
    for (var i = 0; i < results.length; i++) {
        results.score.sort();
        vineresults = vineresults + "<video controls width=\"300px\"><source src=\"" + results[i].url + "\"type=\"video/mp4\"></video><br>";
        console.log(results[i].url);
        document.getElementById("results").innerHTML = vineresults;
        results[i].score = 0;
    }
}
