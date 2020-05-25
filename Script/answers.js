window.onload = () => {
    var username = localStorage.getItem("username");
    let name = document.getElementById("name");
    name.innerText = `Hello,${username}`

    let play = document.getElementById("play");

    play.onclick = function () {
        const HTTP = new XMLHttpRequest();

        HTTP.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let details = JSON.parse(HTTP.responseText)
                No_que =details[0].Questions.length;
                console.log(No_que)
                let ques = details.reduce((acc, curr) => {
                    return curr.Questions
                }, {})


                let quiz = ques.map((q, i) => {

                    let Answer = Object.values(q)[1];
                    let Currans = Answer.concat([Object.values(q)[0]])
                    //  Simple Reverse shuffle algorithm

                    let shuffle = Currans.sort(() => Math.random() - 0.5);

                    let whole = document.getElementById("card-container")
                    let mark = document.getElementById("circle");
                    let perfect = document.createElement("h4");

                    let card = document.createElement('div');
                    card.className = 'card';

                    let cardheader = document.createElement('div');
                    cardheader.className = 'card-header';

                    let cardbody = document.createElement('div');
                    cardbody.className = 'card-body';

                    let cardtitle = document.createElement('h5');
                    cardtitle.innerText = Object.keys(q)[0]

                    Currans.forEach((a) => {
   
                        let button = document.createElement("button");
                        button.innerText = a;
                        button.className = "button";
                        button.value = a;
                        card.appendChild(cardbody)
                        cardbody.appendChild(button)
                        whole.appendChild(card)
                        mark.appendChild(perfect)

                        count = 1;
                        scores = [];
                        button.onclick = function () {
                            a == (Object.values(q)[0]) ? button.style.color = "green" : button.style.color = "red";
                            //   let score =  button.style.color =="green" ? count++ :false;
                            if (button.style.color == "green") {
                                scores.push(count++);

                            }
                            check()
                        }

                        let score = document.getElementById("score")
                        score.onclick = function () {

                            perfect.innerText = `${scores[scores.length - 1]}/${No_que}`
                            let scor = `${scores[scores.length - 1]}/${No_que}`
                            console.log(scor)

                            let xhr = new XMLHttpRequest();
                            xhr.open("POST", "http://localhost:8080/scores", true);
                            xhr.setRequestHeader("Content-type", "application/json");
                            xhr.send(JSON.stringify({ username, scor }));
                            score.disabled = "disabled";


                        }

                        function check() {
                            let value = document.getElementsByClassName("button")
                            answers = (Object.values(value))

                            answers.forEach(function (i) {
                                if (i.value === Object.values(q)[0]) {
                                    answers[answers.indexOf(i)].style.color = "green";
                                    answers[answers.indexOf(i)].disabled = "disabled";

                                }
                            })
                        }

                    })

                    cardheader.appendChild(cardtitle)
                    card.appendChild(cardheader)
                    card.appendChild(cardbody)
                    whole.appendChild(card)

                })


            }
        }
        HTTP.open("GET", "http://localhost:8080/answers", true)
        HTTP.send()

        play.disabled = "disabled";

    }

}