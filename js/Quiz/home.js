let interval;
let timeout;
let currentQuestion;
const TIME_PER_QUESTION = 20;
let userName;
let dateTimeStarted;
let spinnerClone;
let nameCardClone;
let numberArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
let counter = 0;

/**
 * TODO : Add Timer Movable Indicator
 * TODO : Make layouts like in NILE Slides
 *
 *
 * Clears the local storage firsts
 * Handles the name form
 * Disables the back button
 * Handles the back button click : Fetches the question by decreasing the counter; Removes the disabled prop of button
 * Handles the next button click : Fetches the question by increasing the counter; Removes the disabled prop of button
 */
$(document).ready(function () {
	localStorage.clear();
	// $('#question').hide();
	setTimeout(function () {
		$('#spinner').fadeOut();
		spinnerClone = $('#spinner').clone();
		$('#spinner').remove();
	}, 3000);
	setTimeout(function () {
		$('#nameCard').fadeIn();
	}, 3500);
	nameSubmitBtnClickHandler();
	$('#backBtn').attr('disabled', true);
	$('#backBtn').click(function (e) {
		// Sets the question to local storage
		handleQuestionLocalStorage(numberArray[counter]);
		disableRadioButton(false);
		e.preventDefault();
		// Fetching the question after setting to local storage
		if (--counter >= 0 && counter < 10) {
			console.log("	backBtn  " + counter);

			fetchQuestion(numberArray[counter]);
		}


		handleBtnVisibility(counter);
	})
	$('#nextBtn').click(function (e) {

		if (!$('input[name="option"]').prop("checked")) {
			pushToDatabase();
		}

		handleQuestionLocalStorage(numberArray[counter]);
		disableRadioButton(false);

		e.preventDefault();
		if (++counter < 10 && counter > 0) {

			fetchQuestion(numberArray[counter]);
		}

		handleBtnVisibility(counter);
	});

	$('input[name="option"]').click(function () {
		const optionCategories = {
			a: currentQuestion.option.a,
			b: currentQuestion.option.b,
			c: currentQuestion.option.c,
			d: currentQuestion.option.d
		};
		for (let optionCategoriesKey in optionCategories) {
			if ($(this).val() == optionCategories[optionCategoriesKey]) {
				currentQuestion.userData.optionSelected = optionCategoriesKey;
				pushToDatabase();
			}
		}

	});
})

function tickIconHandler() {
	$('#tickIcon').click(function () {
		$('#question').fadeOut();
		$('#tickIcon').fadeOut();
		$('body').append(spinnerClone);
		setTimeout(function () {

		$('#spinner').fadeIn();
		}, 500);

		setTimeout(function () {
			console.log("rohan");
			$('#name').val("");
			$('body').append(nameCardClone);
			$('#spinner').fadeOut();
			$('#spinner').remove();
			$('#name').val("");
			$('#nameCard').fadeIn();
			counter = 0;
			localStorage.clear();
			nameSubmitBtnClickHandler();
		}, 2000);
	});

}


function nameSubmitBtnClickHandler() {
	$('#run').click(function (e) {
		e.preventDefault();
		userName = $('#name').val();
		$.ajax({
			type: "POST", url: window.location + "/index", data: $('#run_form').serialize(), datatype: "json"
		}).done(function (data) {
			data = JSON.parse(data);
			if (data.success) {
				nameCardClone = $('#nameCard').clone();
				$('#nameCard').remove();
				$('.validationErrors').innerHTML = "";
				$('body').append(spinnerClone);
				setTimeout(function () {
					$('#spinner').fadeOut();
					$('#spinner').remove();
					$('#question').fadeIn();
					dateTimeStarted = formatDate();
					fetchQuestion(numberArray[counter]);
					$('#tickIcon').fadeIn();
					tickIconHandler();
				}, 1500);
			} else {
				data = data.errors;
				data = data.replace('<p>', '').replace('</p>', '');
				data = data.split(" ");
				let words = "";
				data.forEach(function (word) {
					words += '<span>' + word + '</span>';
				});

				$('.validationErrors').html(words);
			}
		}).fail(function () {
		});
	});
}

function pushToDatabase() {


	$.ajax({
		type: "POST",
		data: {
			name: userName,
			question_id: currentQuestion.question.id,
			user_result: currentQuestion.userData.optionSelected,
			time_spent: currentQuestion.userData.timeSpent,
			date_time: dateTimeStarted
		},
		url: window.location.href.replace('/quiz/index', '/quiz/saveAnswer')
	}).done(function (data) {
		data = JSON.parse(data);
		if (data.success) {
		} else {
		}
	})
}

/**
 * Displays the questions in the screen
 * Starts the timer
 * @param objQuestion
 */
function displayQuestion(objQuestion) {

	startTimer(TIME_PER_QUESTION - currentQuestion.userData.timeSpent);
	checkRadioButton();
	let question = objQuestion.question;
	let options = objQuestion.option;

	$('#questionText').html('<p>' + question.question + '?</p>');

	$('#labelOption1').text(options.a);
	$('#labelOption2').text(options.b);
	$('#labelOption3').text(options.c);
	$('#labelOption4').text(options.d);

	$('#option1').val(options.a);
	$('#option2').val(options.b);
	$('#option3').val(options.c);
	$('#option4').val(options.d);
}

/**
 * Handles Next and Back Button visibility
 * @param counter int question counter
 */
function handleBtnVisibility(counter) {
	if (counter > 8) {
		$('#nextBtn').attr('disabled', true);
	} else {
		$('#nextBtn').attr('disabled', false);
	}
	if (counter <= 0) {
		$('#backBtn').attr('disabled', true);
	} else {
		$('#backBtn').attr('disabled', false);
	}
}


/**
 * Fetches question from database or local storage
 * Stores to local storage if brought from database
 * @param counter
 */
function fetchQuestion(counter) {
	// Question with add on prop will be fetched if exists
	console.log('fetch Question  ' + counter);
	let answer = getQuestionExistLocalStorage(counter);
	if (!(answer != undefined && answer.counter == counter)) {
		$.ajax({
			type: "GET",
			data: {id: counter}, url: (window.location.href).replace('/quiz/index', '/quiz/display')
		}).done(function (data) {
			data = JSON.parse(data);
			// Adding the add-on prop : UserData and Counter to raw question data

			data.userData = {
				timeSpent: 0, optionSelected: null
			};
			data.counter = counter;
			currentQuestion = data;
			displayQuestion(data, counter);
		})
			.fail(function (error) {
				alert(error);
			});
	} else {
		// Get question from local storage
		currentQuestion = answer;
		displayQuestion(answer, counter);
	}
}

/**
 * Handles pushing the question to the local storage
 * @param obj object question object having question and option as properties
 * @param counter counter of the question
 */
function handleQuestionLocalStorage(counter) {
	// Adding the property to the receiving object

	if (localStorage.getItem('quiz') != undefined) {
		// Getting the quiz array
		let quiz = localStorage.getItem('quiz');
		quiz = JSON.parse(quiz);
		let found = false;
		quiz = quiz.map(function (quizItem) {
			if (quizItem.counter == counter) {
				found = true;
				return currentQuestion;
			}
			return quizItem;
		})
		if (!found) quiz.push(currentQuestion);
		// Pushing the object with add on prop to quiz
		localStorage.setItem('quiz', JSON.stringify(quiz));
	} else {
		// Adding blank array if quiz doesn't exist in local storage
		let quiz = [];
		/// Adding the question with add on userdata and counter
		quiz.push(currentQuestion);
		localStorage.setItem('quiz', JSON.stringify(quiz));
	}
}

/**
 * Gets the question from localstorage if exists
 * @param counter
 * @returns {boolean|*}
 */
function getQuestionExistLocalStorage(counter) {
	if (localStorage.getItem('quiz') != undefined) {
		let quiz = localStorage.getItem('quiz');
		quiz = JSON.parse(quiz);

		return quiz.find(function (data) {
			return data.counter == counter;
		})
	}

	return false;
}

/**
 * Starts and show timer and disables the radio button when timer finishes
 * @param num
 */
function startTimer(num) {
	let orgNum = num;
	clearInterval(interval);
	clearTimeout(timeout);
	changeTimeInBrowser(num);
	interval = setInterval(function () {
		changeTimeInBrowser(--num);
		currentQuestion.userData.timeSpent = TIME_PER_QUESTION - num;
	}, 1000);
	timeout = setTimeout(function () {
		clearInterval(interval);
		clearTimeout(timeout);
		disableRadioButton(true);
	}, orgNum * 1000);

}

/**
 * Changes the disability of a radio according to visible param
 * @param visible
 */
function disableRadioButton(isDisabled) {
	$(':input[name="option"]').prop('disabled', isDisabled);
}


/**
 * Checks the radio button according to the option
 * @param option
 */
function checkRadioButton() {
	let optionChecked = currentQuestion.userData.optionSelected;
	if (optionChecked == 'a') {
		$('#option1').prop('checked', true);
	} else if (optionChecked == 'b') {
		$('#option2').prop('checked', true);
	} else if (optionChecked == 'c') {
		$('#option3').prop('checked', true);
	} else if (optionChecked == 'd') {
		$('#option4').prop('checked', true);
	} else checkAllRadioButton(false);

}

/**
 * Checks or Unchecks all the Radio button according to the param
 * @param visible
 */
function checkAllRadioButton(visible) {
	$('input[name="option"]').prop('checked', visible);

}

/**
 * Changes the timer in the browser as the num param
 * @param num
 */
function changeTimeInBrowser(num) {
	if (num <= 0) {
		$('#pTimer').text("Time up.");
	} else {

		$('#pTimer').html(num + 's<i class=\"fas fa-spinner fa-pulse\"></i>')
	}
}

/**
 * Converts the date in YYYY-MM-DD
 */
function formatDate() {
	return new Date().toISOString().slice(0, 19).replace('T', ' ');
}


/**
 * Shuffle Array
 * @param array
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
