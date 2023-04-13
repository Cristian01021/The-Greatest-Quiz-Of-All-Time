let scores=JSON.parse(localStorage.getItem("scores"));
let scoreboard=document.querySelector('#scoreboard')
let clearButton=document.querySelector("#clear");
function displayScores(){
    scores=scores.sort((a,b)=>{
        return b.score-a.score;
    });
    console.log(scores)
    for(let i=0;i<scores.length;i++){
        let scoreEl=document.createElement("li")
        scoreEl.innerHTML=scores[i].userName+": "+scores[i].score;
        scoreboard.appendChild(scoreEl);
    }
}
function clearScores(){
    localStorage.clear();
    scoreboard.innerHTML="";
}
displayScores();
clearButton.addEventListener("click",clearScores);