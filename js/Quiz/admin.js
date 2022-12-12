const TOTAL_QUESTION = 10;
let name_date_array = [];
$(document).ready(function () {
	$('.login-box').hide();
	$('#adminReport').hide();
	setTimeout(function () {
		checkSession();


	}, 3000);
	$('#loginBtn').click(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST", url: window.location.href, data: $('#login_form').serialize(), datatype: "json"
		})
			.done(function (data) {
				data = JSON.parse(data);
				if (!data.success) {
					$('#loginError').html(data.errors);

				} else {
					// if no errors and credentials matched
					$('.container').fadeIn();
					$('.login-box').fadeOut();
					setTimeout(function () {

						removeLoginAndShowAdminTable();
					}, 2000);
				}
			}).fail(function (data) {

		});
	})

})


function checkSession() {
	$.ajax({
		type: "GET", url: window.location.href.replace('/quiz/admin', '/quiz/handleSession'), data: {
			sessionStatus: true
		}, datatype: "json"

	})
		.done(function (data) {

			console.log(data);
			data = JSON.parse(data);
			if (data.success && data.session) {
				removeLoginAndShowAdminTable();
			} else if (data.success && !data.session) {
				$('.login-box').fadeIn();
				$('.container').fadeOut();
			}
		}).fail(function (data) {

	});
}

function removeLoginAndShowAdminTable() {
	$('#loginError').html("");
	$('.login-box').fadeOut();
	$('#svgGraphic').fadeOut();
	$('.container').fadeOut();
	getAdminData();

	$('#adminReport').fadeIn();


}

function logout() {
	$.ajax({
		type: "GET", url: window.location.href.replace('/quiz/admin', '/quiz/handleSession'), data: {
			logout: true
		}, datatype: "JSON"
	}).done(function (data) {
		console.log(data);
		data = JSON.parse(data);
		if (data.success && data.logout) {
			$('.container').show();
			let timeout = setTimeout(function () {
				$('#adminReport').hide();

				$('.container').fadeOut();
				$('#username').val("");
				$('#password').val("");
				$('.login-box').fadeIn();

				clearTimeout(timeout);
			}, 2000);

		} else {

		}

	})
}

function getAdminData() {
	$.ajax({
		type: "GET", url: window.location.href.replace('/quiz/admin', '/quiz/getAdminReport'), datatype: "JSON",
	}).done(function (data) {
		data = JSON.parse(data);
		if (data.success) {
			showAdminData(data.data);
		} else {

		}
	}).fail(function (data) {

	})
}


function showAdminData(playerStatusArray) {
	let table = '<h1><span class="blue"></span>Users Table<span class="blue"></span> <span class="yellow">Admin Portal</pan>\n' + '\t</h1> <button type="button" class="btn btn-outline-danger" style="position: absolute;right:3%" onclick="logout()">Logout</button>\n ' + '<table id="adminTable">';
	table += '<tr>';
	table += '<th>SN</th>';
	table += '<th>Name</th>';
	table += '<th>Total Question</th>';
	table += '<th>(C/A/T)</th>';
	table += '<th>Time</th>';
	table += '<th>Consumed Time</th>';
	table += '<th>View</th>';
	table += '</tr>';
	let counter = 0;
	playerStatusArray.forEach(function (playerItem) {
		counter++;
		name_date_array.push({counter: counter, name: playerItem['name'], date_time: playerItem['date_time']});

		table += '<tr>';
		table += '<td>' + counter + '</td>';
		table += '<td>' + playerItem['name'] + '</td>';
		table += '<td>' + TOTAL_QUESTION + '</td>';

		table += '<td>' + '(' + playerItem['correct'] + '/' + playerItem['attempted'] + '/' + TOTAL_QUESTION + ')' + '</td>';
		table += '<td>' + playerItem['date_time'] + '</td>';
		table += '<td>' + playerItem['total_time'] + '</td>';
		table += '<td>' + '<button value="' + counter + '" class="reportView btn btn-light" >' + '<span></span>' + '<span></span>' + '<span></span>' + '<span></span>' + 'View</button>' + '</div></td>';
		table += '</tr>';

	})

	$('#adminReport').html(table);
	$('.reportView').click(function () {
		let sn = $(this).val();
		name_date_array.forEach(function (name_date_item) {
			if (sn == name_date_item.counter) {
				$('#adminReport').fadeOut();
				$('.container').fadeIn();
				setTimeout(function () {
					$('.container').fadeOut();
					$('#playerSingleData').fadeIn();
					getSingleData(name_date_item.name, name_date_item.date_time);
				}, 1500);

			}
		})
	});

}

function backBtn() {
	$('.container').fadeIn();
	setTimeout(function () {
		$('#playerSingleData').fadeOut();
		$('.container').fadeOut();
		$('#adminReport').fadeIn();
	}, 1500);
}

function showSingleData(playerQuestionArray) {
	$('#playerSingleData').remove();
	$('<div id="playerSingleData" style="display: flex;flex-wrap: wrap"><button onclick="backBtn()" class="btn btn-outline-light" style="position:absolute;right: 1%;top: 1%">Back</button></div>').appendTo('body');
	let playerDiv = $('#playerSingleData');
	playerQuestionArray.forEach(function (playerQuestionItem) {

		let html = "";
		html += '<div id="question"><div id="questionText">' + playerQuestionItem.question + '<i class="fa fa-question" aria-hidden="true"></i>\n</div>';
		html += '<div id="pTimer"> ' + playerQuestionItem.time_spent + 's <i class="fa-solid fa-clock"></i></div>';
		let options = getOptionWithHighlight({
			options: [playerQuestionItem.a, playerQuestionItem.b, playerQuestionItem.c, playerQuestionItem.d],
			correct: playerQuestionItem.correct,
			user_result: playerQuestionItem.user_result
		});
		html += '<div id ="options">' + options + '</div>';
		html += '</div>';
		playerDiv.append(html);

	})
}

/*
	Receive the options and user option and correct option	 user selected blue
						-> if correct color green
						-> if wrong color red

 */
function getOptionWithHighlight(optionObject) {
	let result = "";
	let options = optionObject.options;
	if (optionObject.user_result == "") {
		result += '<div>No option selected <i class="fa fa-ban" aria-hidden="true"></i>\n</div>'
	}
	let optionNameArray = ['a', 'b', 'c', 'd'];
	options.forEach(function (option, index) {
		index = optionNameArray[index];
		result += "<form>";
		if (index == optionObject.user_result) {
			if (optionObject.user_result == optionObject.correct) {
				result += '<label for="option" style="font-size: larger; color: green; font-weight: 800	">' + option + ' <i class="fa-solid fa-check"></i></label>';
				result += '<input type="radio" name="option" style="background-color: green; color: green" checked disabled value="' + option + '"  >';
			} else {
				result += '<label for="option" style="font-size: larger; color: red;">' + option + ' <i class="fa fa-times" aria-hidden="true"></i>\n</label>';
				result += '<input type="radio" style="background-color: red; color: red" name="option" class="red" checked disabled value="' + option + '"  >';
			}
		} else if (index == optionObject.correct) {
			result += '<label for="option" style="font-size: larger; color: green; font-weight: 800	">' + option + ' <i class="fa-solid fa-check"></i></label>';
			result += '<input type="radio" name="option" style="background-color: green; color: green" disabled value="' + option + '"  >';
		} else {
			result += '<label for="option">' + option + '</label>';
			result += '<input type="radio" name="option" disabled value="' + option + '" >';
		}
	});
	result += '</form>';
	return result;

}

function getSingleData(name, date_time) {
	$.ajax({
		type: "POST",
		url: window.location.href.replace('/quiz/admin', '/quiz/getSingleData'),
		data: {name: name, date_time: date_time},
		datatype: "JSON"

	}).done(function (data) {
		data = JSON.parse(data);
		if (data.success) {

			showSingleData(data.data);
		}
	}).fail(function (data) {

	})

}


