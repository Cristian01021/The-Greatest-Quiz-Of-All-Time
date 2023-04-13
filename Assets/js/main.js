let startButton=document.querySelector("#startButton");
let startPage=document.querySelector("#start");
let questionPage=document.querySelector("#question");
let endPage=document.querySelector("#endScreen");
let question=document.querySelector("#questionTitle");
let answersDiv=document.querySelector("#answers");
let timer=document.querySelector("#time");
let finalScore=document.querySelector("#finalScore");
let userName=document.querySelector("#initials");
let submitScore=document.querySelector("#submit");
let secondsLeft=45;
let timerInterval;
//questions about the best anime 
let questionNumber=0;
let questions =["Who is in charge of protecting the citizens from titans?",
"Where are the main characters from?",
"Who is the inheriter of the armored titan?",
"This character is known for his raw ability, strength and fight coordination",
"Who is the female titan"];
let ansA;
let ansB;
let ansC;
let ansD;
let ansButton
let answers=[
["Survery Corps  (correct)","Military Police","Garrison","Titan Corps"],
["Wall Rose","Shiganshina  (correct)","Trost","Liberio"],
["Don't Care!","Is This Anime?","Reiner Braun  (correct)","Levi Ackerman"],
["Jean Kirstein","Dot Pixis","Erwin Smith","Levi Ackerman   (correct)"],
["Annie Leonhart  (correct)","Sasha Blouse","Historia","Gabi Braun"]];

function startQuiz(){
    startPage.setAttribute("class","hide");
    questionPage.setAttribute("class", "onScreen");
    displayQuestion();
    setTime();

}
function createAnswerChoice(){
    
    ansA=document.createElement("button");
    ansB=document.createElement("button");
    ansC=document.createElement("button");
    ansD=document.createElement("button");

    ansA.setAttribute("class","answerChoice");
    ansB.setAttribute("class","answerChoice");
    ansC.setAttribute("class","answerChoice");
    ansD.setAttribute("class","answerChoice");

    ansA.setAttribute("style","background-color:White");
    ansB.setAttribute("style","background-color:White");
    ansC.setAttribute("style","background-color:White");
    ansD.setAttribute("style","background-color:White");


    ansA.textContent=answers[questionNumber][0];
    ansB.textContent=answers[questionNumber][1];
    ansC.textContent=answers[questionNumber][2];
    ansD.textContent=answers[questionNumber][3];

    isSetCorrect(ansA);
    isSetCorrect(ansB);
    isSetCorrect(ansC);
    isSetCorrect(ansD);

}
function isSetCorrect(ans){
    let ansTxtStorage;

    if(ans.textContent.includes("(correct)")){
        ansTxtStorage = ans.textContent.split('  ');
        ans.textContent=ansTxtStorage[0];
       ans.setAttribute("correct","true");
    }

}
function displayQuestion(){
    removeAllChildNodes(answersDiv);
    question.textContent=questions[questionNumber];
    createAnswerChoice()
    answersDiv.appendChild(ansA);
    answersDiv.appendChild(ansB);
    answersDiv.appendChild(ansC);
    answersDiv.appendChild(ansD);

    ansButton=document.querySelectorAll(".answerChoice");
    
    questionNumber++;

    for(let i=0; i<ansButton.length;i++)
    {
        ansButton[i].addEventListener("click",onChooseAnswer);
    }
 
}
function correctOrIncorrect(event){
    let verdict=document.createElement("h2");
    verdict.setAttribute("id","verdict");
    if(event.currentTarget.getAttribute("correct")==="true"){
        verdict.textContent="CORRECT"
    }  
    else{
        verdict.textContent="INCORRECT"
        secondsLeft-=15;
    }
    
    answersDiv.appendChild(verdict);
}
function onChooseAnswer(event){
    if (questionNumber<questions.length){
        removeAllChildNodes(answersDiv);
        correctOrIncorrect(event);
        setTimeout(displayQuestion,1000);
        
    }
    else{
        removeAllChildNodes(answersDiv);
        correctOrIncorrect(event);
        setTimeout(gameOver,1000);
    }
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function gameOver(){
    clearInterval(timerInterval);
    questionPage.setAttribute("class","hide");
    endPage.setAttribute("class","onScreen");
    finalScore.textContent=secondsLeft;
    submitScore.addEventListener("click",function(){
        let allScores = JSON.parse(localStorage.getItem("score")) || [];
        let userObject = {
            userName: userName.value,
            score: secondsLeft
        }
        allScores.push(userObject);
        localStorage.setItem("score", JSON.stringify(allScores))
        window.location.href="./score.html";
    })
    
}
function setTime(){
    timerInterval=setInterval(function(){
        secondsLeft--;
        timer.textContent=secondsLeft;
        if(secondsLeft<=0){
            clearInterval(timerInterval);
            runOutOfTime();
        }

    },1000);
}
function runOutOfTime(){
    let timesUp=document.createElement("h2");
    timesUp.setAttribute("id","timesUp");
    timesUp.textContent="Times Up";
    removeAllChildNodes(answersDiv);
    answersDiv.appendChild(timesUp);
    setTimeout(gameOver,1500);
}

startButton.addEventListener("click",startQuiz);