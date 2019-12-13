
var datasets = new Array(9);
FillDataset(0);

function fadeTextTo(str)
{
      $('#close').fadeOut('slow').promise().done(function() {
          $('#wordbox').text(str);
        $('#close').fadeIn('slow');
    });
}


function getText(str){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', str, true);
    request.overrideMimeType("text/plain");
    request.send(null);
    return request;
    
}

function FillDataset(index)
{
    if(index < 9)
    {
        var lol = 'gen'+(index*25)+'.txt'
        console.log(lol)
        request = getText(lol);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    console.log(index)
                    datasets[index] = request.responseText
                    console.log(datasets[index])
                    FillDataset(index+1)
                }
            }
        }
    }
    else
    {
        $('#wordbox').text("");
        $("#button").removeAttr("disabled");          
    }
}

function PickRandomWord(frm) {
// Generate a random number between 1 and NumberOfWords
var i = ((document.getElementById("tempInput").value*100)/25);
populate(i)
}


function updateTextInput(ids, val) {
    document.getElementById(ids).value=val; 
  }

function populate(index)
{
    outer_text = datasets[index].split('\n');    // you can adjust the manner of parsing the received file (regexp)

    var rnd = Math.ceil(Math.random() * outer_text.length)
    var text = outer_text[rnd]
    // Display the word inside the text box
    fadeTextTo(text)
}