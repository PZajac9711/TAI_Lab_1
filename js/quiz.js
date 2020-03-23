fetch('https://quiztai.herokuapp.com/api/quiz')
.then(resp => resp.json())
.then(resp => {
        	   preQuestions = resp;
             let answersHolder = new Map();
             let next = document.querySelector('.next');
             let previous = document.querySelector('.previous');

             let questioNumber = document.querySelector("#question-number");

             let question = document.querySelector('.question');
             let answers = document.querySelectorAll('.list-group-item');

             let pointsElem = document.querySelector('.score');
             let restart = document.querySelector('.restart');
             let index = 0;
             let points = 0;

             for (let i = 0; i < answers.length; i++) {
                 answers[i].addEventListener('click', doAction);
             }

             function setQuestion(index) {
                 questioNumber.innerHTML = "(" + (index + 1) + "/" + preQuestions.length + ")";
                 question.innerHTML = preQuestions[index].question;
                 answers[0].innerHTML = preQuestions[index].answers[0];
                 answers[1].innerHTML = preQuestions[index].answers[1];
                 answers[2].innerHTML = preQuestions[index].answers[2];
                 answers[3].innerHTML = preQuestions[index].answers[3];
                 if (preQuestions[index].answers.length === 2) {
                     answers[2].style.display = 'none';
                     answers[3].style.display = 'none';
                 } else {
                     answers[2].style.display = 'block';
                     answers[3].style.display = 'block';
                 }
             }

             setQuestion(0);

             next.addEventListener('click', function (event) {
                 //zabezpieczenie na wyjście z tablicy
                 clearMarks();
                 index < preQuestions.length-1 ? setQuestion(++index) : null;
                 checkIfQuestionExistInMap();
             });


             previous.addEventListener('click', function (event) {//zabezpieczenie, na wyjście z tablicy
                 //zabezpieczenie na wyjście z tablicy
                 clearMarks();
                 index > 0 ? setQuestion(--index) : null;
                 checkIfQuestionExistInMap();
             });

             function doAction(event) {
                 //event.target - Zwraca referencję do elementu, do którego zdarzenie zostało pierwotnie wysłane.
                 let color = 0; // if color == 1 user hit good answer else color == 0;
                 if(answersHolder.get(preQuestions[index].question) == null){
                   if (event.target.innerHTML === preQuestions[index].correct_answer) {
                       points++;
                       pointsElem.innerText = points;
                       // markCorrect(event.target);
                       event.target.style.background = '#289a27';
                       color = 1;
                   }
                   else {
                       event.target.style.background = '#c41a21';
                   }
                   //console.log();
                   answersHolder.set(preQuestions[index].question,[event.target.innerHTML,color]);
                   color = 0;
                 }


                 /*answersHolder.forEach(function(value, key) {
                   console.log(key + ' = ' + value);
                 });
                 console.log(answersHolder.get(preQuestions[index].question));*/
                 // disableAnswers();
             }
             function checkIfQuestionExistInMap(){
                 let question = answersHolder.get(preQuestions[index].question);
                 return question == null ? false : setMarks(question);
             }
             function setMarks(question){
               let tmp = 0;
               answers.forEach((item, i) => {
                 if(item.innerHTML == question[0]){
                   tmp = i;
                 }
               });
               question[1] == 1 ? answers[tmp].style.background = '#289a27' : answers[tmp].style.background = '#c41a21';
               //question[1] == 0 ? answers[answers.indexOf(2)].style.background = '#289a27' : answers[answers.indexOf(question[0])].style.background = '#c41a21';
             }
             function clearMarks(){
                 for(let i = 0; i < 4; i++){
                   answers[i].style.background = '#FFF';
                 }
             }

             restart.addEventListener('click', function (event) {
                 event.preventDefault();

                 index = 0;
                 points = 0;
                 let userScorePoint = document.querySelector('.score');
                 userScorePoint.innerHTML = points;
                 // setQuestion(index);
                 // activateAnswers();
                 // list.style.display = 'block';
                 // results.style.display = 'none';
             });
});
