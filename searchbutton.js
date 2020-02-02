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
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
          event.preventDefault();
        document.getElementById("searchbutton").click();
      }
    });
    var isTag = input.startsWith("#");
    input.toLowerCase();
    var searchtext = input.split(" ");
    //console.log(searchtext);


    if (isTag) {
      console.log("tag");
      var options = {
        shouldSort: true,
        //includeScore: true,
        threshold: 0.3,
        keys: ['tags'],   // keys to search in
        //id: 'id'                     // return a list of identifiers only
      }
        /*for (var j = 0; j < searchtext.length; j++) {
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
        }*/

    } else {
      console.log("desc");
        /*for (var l = 0; l < vines.length; l++) {
            console.log("searching transcript");
            searchtext.forEach(term => {
                if (vines[l].transcript.includes(term) && !results.includes(vines[l])) {
                    vines[l].score++;
                    results.push(vines[l]);
                    console.log(vines[l].url);
                    console.log(vines[l].score);

                }
            });*/
            var options = {
              shouldSort: true,
              //includeScore: true,
              threshold: 0.6,
              keys: ['transcript'],   // keys to search in
              //id: 'id'                     // return a list of identifiers only
            }


        }
        var f = new Fuse(vines, options);
        var results = f.search(input);
        console.log(results);
        console.log(results[0]);


        var vineresults = "";
        for (var i = 0; i < results.length; i++) {
          console.log(results[i].url);
          vineresults = vineresults + "<video controls width=\"300px\"><source src=\"" + results[i].url + "\"type=\"video/mp4\"></video><br>";
          document.getElementById("results").innerHTML = vineresults;
            //results[i].score = 0;
        }
    }
