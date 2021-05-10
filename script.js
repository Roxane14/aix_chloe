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
	"Rendez-vous sur une place qui est la moiti\351 d'une demi-heure",
	"Un dieu romain veille sur la fontaine. De qui s'agit-il ?",
	"bacchus");

new Step(
	"Direction \340 pr\351sent le symbole d'une fonction primordiale : celle de gouverner la ville",
	"Quels sont les couleurs du blason de la ville ?",
	"jaune|bleu|rouge");

new Step(
	"Ce lieu de culte semble \352tre vou\351 \340 quelqu'un qui est venu en aide, qui a secouru autrui.",
	"Que tient entre ses bras le personnage central ?",
	"enfant");

new Step(
	"Mon premier est \351gal au nombre de petits cochons\
	Mon second est plus pr\351cieux que l’argent\
	Mon troisi\350me constitue les phrases",
	"En quelle ann\351e un homme fut-il pendu en ces lieux ?",
	"1524");

new Step(
	"Un pr\351dicateur, faisant la morale aux autres, a bien m\351rit\351 sa propre place",
	"Deux horloges bien diff\351rentes ne semblent pas tout \340 fait synchronis\351es... Combien d'ann\351es les s\351parent ?",
	"8");

new Step(
	"Le nom de cet h\364tel est un outil tr\350s pratique pour faire de la couture",
	"Quelle \351tait la profession du commanditaire et architecte de ce lieu ?",
	"collectionneur");

new Step(
	"Rajouter la plus forte carte \340 la fin d'un pr\351nom masculin nous donnera la prochaine \351tape",
	"Combien de visages curieux vous observent en ces lieux ? ",
	"13");

new Step(
	"L'\351poux d'une reine se situe sur cette fontaine",
	"Quel fruit ce personnage embl\351matique a-t-il introduit dans la r\351gion ?",
	"muscat");

new Step(
	"Si l’on veut aller se baigner, hors de question d'avoir de l'eau froide n'est-ce pas ?",
	"Des gens ivres ont d\351truit un animal ici. Lequel ?",
	"triton");

new Step(
	"Un peu moins de 10 armes de guerre meurtri\350res sont pr\351sentes ici",
	"Cette fontaine est tr\350s belle, mais quelque chose d'autre l'est aussi... Quoi donc ?",
	"epoque");

new Step(
	"Continuer tout droit jusqu'\340 la prochaine fontaine",
	"Quels sont les trois animaux qui veillent sur ce lieu ?",
	"poisson|lion|oie");

new Step(
	"Qu'obtient-on lorsque l'on croise la rue Espariat avec la rue de la Couronne ?",
	"Scintillante, j'\351tends mes 12 bras dans toutes les directions. Qui suis-je ?",
	"etoile");

new Step(
	"Mon premier est au nombre de sept dans une semaine\
	Mon second permet la mastication\
	Mon tout est un parc",
	"De quelle ville venait l'homme en l'honneur duquel fut construit le boulodrome ?",
	"paris");

new Step(
	"Il faut \340 pr\351sent se diriger vers l'h\364tel le plus proche du cin\351ma «Le Renoir»",
	"Quelle ville italienne sera bient\364t à l'honneur en ces lieux ?",
	"venise");

new Step(
	"Quatre mamiph\350res aquatiques, gracieux et bondissants, sont situ\351s \340 notre avant-derni\350re \351tape",
	"Quel \351tait l'ancien nom de cette place ?",
	"mazarino");

new Step(
	"Un petit pays europ\351en insulaire au large de l’Italie sera le point final de cette qu\352te",
	"Quelle est la couleur pr\351dominante des portes par ici ?",
	"rouge");

new Step(
	"F\351licitations, vous avez atteint la derni\350re étape !",
	"Vous pouvez \340 pr\351sent rentrer chez vous avec le code suivant : 462",
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
	if (checkAnswer(val, steps[index].answer)) {
		index++;
		sessionStorage.setItem("myStoredIndex", index);
		displayGoodAnswer(index - 1);
		displayStep(index);
	}
}

function checkAnswer(val, answer) {
	const words = answer.split('|');
	for (i in words) {
		if (!val.includes(words[i]))
			return false;
	}
	return true;
}

