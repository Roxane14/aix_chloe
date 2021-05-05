// JavaScript source code

const steps = [];

class Step {
	constructor(clue, question, answer) {
		this.clue = clue;
		this.question = question;
		this.answer = answer;
		steps.push(this);
	}
}


new Step(
	"Cette charmante enfant est sans doute sous la douche. Cours la rejoindre !",
	"Quel est le numero correspondant ?",
	"quatre");

new Step(
	"Ou peut-etre a-t-elle voulu rechauffer un bon petit plat, car elle avait faim !",
	"Quel est le numero correspondant ?",
	"deux");

new Step(
	"Ce n'est toujours pas ca... Peut-etre qu'elle s'est assise confortablement dans son canape ?",
	"Quel est le numero correspondant ?",
	"sept");

new Step(
	"Alors c'est surement qu'elle est en train de travailler sur son ordinateur !",
	"Quel est le numero correspondant ?",
	"huit");

new Step(
	"Ou alors, elle est allee fermer a clef la porte d'entree...",
	"Quel est le numero correspondant ?",
	"trois");

new Step(
	"Mais non voyons, c'est evident ! Elle est allee se blottir sous les draps et attend son prince charmant.",
	"Pour lui prouver que tu as bien ete jusqu'au bout, dis-lui le mot magique : brouette",
	"");


document.addEventListener('keydown', logKey);

function logKey(e) {
	if (e.code == "Space") {
		sessionStorage.setItem("myStoredIndex", 0);
	}
}

//var index = sessionStorage.getItem("myStoredIndex");
index = 0;

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
	val = val.toLowerCase();
	val = val.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	if (val == steps[index].answer) {
		index++;
		sessionStorage.setItem("myStoredIndex", index);
		displayGoodAnswer(index - 1);
		displayStep(index);
	}
}

