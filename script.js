// JavaScript source code
class Step {
	constructor(clue, question, answer) {
		this.clue = clue;
		this.question = question;
		this.answer = answer;
	}
}

var firstStep = new Step("ceci est l'endroit o\371 il faut aller !", "quelle est la r\351ponse \340 la question ?", "reponse");
var secondStep = new Step(" 2 ceci est l'endroit o\371 il faut aller !", " 2 quelle est la r\351ponse \340 la question ?", "reponse2");
var thirdStep = new Step(" 3 ceci est l'endroit o\371 il faut aller !", "pas de question ici, car c'est la derni\350re \351tape !", "a");
var f4Step = new Step("ceci est l'endroit o\371 il faut aller !", "quelle est la r\351ponse \340 la question ?", "reponse");
var f5Step = new Step(" 2 ceci est l'endroit o\371 il faut aller !", " 2 quelle est la r\351ponse \340 la question ?", "reponse2");
var s6Step = new Step(" 3 ceci est l'endroit o\371 il faut aller !", "pas de question ici, car c'est la derni\350re \351tape !", "");

var steps = [firstStep, secondStep, thirdStep, f4Step, f5Step, s6Step];


document.addEventListener('keydown', logKey);

function logKey(e) {
	if (e.code == "Space") {
		localStorage.setItem("myStoredIndex", 0);
	}
}



var index = localStorage.getItem("myStoredIndex");

if(index==null)
	index = 0;

var i;
for (i = 0; i < parseInt(index); i++) {
	displayStep(i);
	displayGoodAnswer(i);
}

displayStep(parseInt(index));


function displayStep(i) {
	var newStep = document.createElement("div");
	newStep.className = "step";

	var newNumber = document.createElement("div");
	newNumber.className = "number";
	newStep.appendChild(newNumber);
	var newClue = document.createElement("div");
	newClue.className = "indice";
	newStep.appendChild(newClue);
	var newQuestion = document.createElement("div");
	newQuestion.className = "question";
	newStep.appendChild(newQuestion);

	var newNumberText = document.createTextNode(i+1);
	newNumber.appendChild(newNumberText);

	var newClueText = document.createTextNode(steps[i].clue);
	newClue.appendChild(newClueText);

	var newQuestionText = document.createTextNode(steps[i].question);
	newQuestion.appendChild(newQuestionText);

	if (i < steps.length-1) {
		var newQuestionInput = document.createElement("input");
		newQuestionInput.type = "text";
		newQuestionInput.name = "txt";
		newQuestionInput.setAttribute("value", "Ta r\351ponse");
		newQuestionInput.setAttribute("onchange", "myFunction(this.value)");
		newQuestionInput.setAttribute("onkeyup", "myFunction(this.value)");
		newQuestion.appendChild(newQuestionInput);
	}

	document.getElementById("stepsContainer").appendChild(newStep);  
}


function displayGoodAnswer(index) {
	var stepToModify = document.getElementById("stepsContainer").children[index];
	var elementToDelete = stepToModify.getElementsByTagName("input")[0];

	var goodAnswer = document.createElement("div");
	var answerText = document.createTextNode(steps[index].answer);
	goodAnswer.className = "goodAnswer";
	goodAnswer.appendChild(answerText);
	elementToDelete.parentNode.appendChild(goodAnswer);
	elementToDelete.remove();
	
}

function myFunction(val) {
	
	if (val == steps[index].answer) {
		index++;
		localStorage.setItem("myStoredIndex", index);
		displayGoodAnswer(index - 1);
		displayStep(index);
	}
}

