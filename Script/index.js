window.onload = () => {
    var username = localStorage.getItem("username");
    let name = document.getElementById("name");
    name.innerText = `Hello,${username}`

    let api = document.getElementById("submit")
    api.onclick = function () {

        let items = document.getElementsByClassName("message");
        let selecteditems = [];

        for (let i = 0; i < items.length; i++) {
            if (items[i].type == 'radio' && items[i].checked == true) {
                selecteditems.push(items[i].value)
            }
        }

        // Extracting the details form API

        const HTTP = new XMLHttpRequest();
        const URL = 'https://opentdb.com/api.php?amount=50&category=9';
        HTTP.open("GET", URL);
        HTTP.send()

        HTTP.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let details = JSON.parse(HTTP.responseText)
                var results = details.results;

                let say = results.filter(el => {
                    if (el.difficulty == selecteditems[0] && el.type == selecteditems[1]) {
                        return el;
                    }
                });

                let final = say.map(el => {
                    el.questions = el.question.replace(".", "?")
                    return { [el.questions]: el.correct_answer, incorrect_answer: el.incorrect_answers }
                });
                console.log(username);
                let json = { username, final }

                //  Storing the selected question in db

                let xhr = new XMLHttpRequest();
                xhr.open('POST', "http:/localhost:8080/questions");
                xhr.setRequestHeader('Content-Type', "application/json");
                xhr.send(JSON.stringify(json))
            }
        }


    }

}
