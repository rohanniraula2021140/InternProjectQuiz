let BASE_URL = 'http://localhost/InternProjectQuiz/';

let patientData = {isPatient: false, patientId: null};
// tests fetched from the database
let testList;
let totalTestList = {tests: [], subTotal: 0, discountP: 0, discount: 0, netTotal: 0};
// User current test
let userCurrentTest = {testId: "", testName: "", unitPrice: ""};
let removePrevId = null;
let editPrevId = null;
let editTest = {isOn: false, id: null};
let editBill = {isOn: false, id: null};

let dataListTestCodes = $('#dataListTestCodes');
let dataListTestNames = $('#dataListTestNames');
let inputNumberUnit = $('#inputNumberUnitPrice');
let inputNumberQty = $('#inputNumberQty');
let inputNumberTotalPrice = $('#inputNumberTotalPrice');
let inputNumberDiscountP = $('#inputNumberDiscountP');
let inputNumberDiscount = $('#inputNumberDiscount');
let inputNumberNetTotal = $('#inputNumberNetTotal');
let inputNumberSubTotal = $('#inputNumberSubTotal');
let btnAddTest = $('#btnAddTest');
let btnClearTest = $('#btnClearTest');

let arrayFormEnabled = [dataListTestCodes, dataListTestNames, inputNumberQty];

let arrayTestFormChild = [dataListTestCodes, dataListTestNames, inputNumberUnit, inputNumberQty, inputNumberTotalPrice];

/**
 * Checks if the param is number or not
 */
const isNumber = (value) => {

	return (value !== "" && !isNaN(value));
}

/**
 * Shows toast
 * @param msg string message to be displayed
 * @param success boolean variable denoting status
 */
const showToast = (msg, success) => {
	$('#toastBody').text(msg);
	$('#liveToastBtn').click();
	let toastHead = $('#toastHead');
	// bg-success
	if (success) {
		toastHead.addClass('bg-success');
		toastHead.removeClass('bg-danger');
	} else {
		toastHead.removeClass('bg-success');
		toastHead.addClass('bg-danger');
	}
}

/**
 * Disable form that are enabled for user
 * @param disable
 */
const disableForm = (disable) => {
	arrayFormEnabled.forEach(function (item) {
		item.prop('disabled', disable);
	});
};

/**
 * Gets parameter from the url
 * @param sParam string param to check
 * @returns {boolean|string|boolean} returns false if not found and string if found
 */
const getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = window.location.search.substring(1),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
		}
	}
	return false;
};

/**
 * Fill the patient detail after cliking submit in patient id
 */
function fillPatientData() {
	const getPatientData = (id, func) => {
		$.ajax({
			url: BASE_URL + 'Patient/getPatient',
			async: false,
			dataType: "JSON",
			data: {id: id},
			type: "GET"
		}).done(function (data) {
			if (data.data != null) {
				func(data.data);
				btnIdSubmit.prop('disabled', true);
				patientData.isPatient = true;
				patientData.patientId = data.data.id;
				console.log(patientData.patientId);
				disableForm(false);
				showToast("Patient Found", true)
			} else {
				disableForm(true);
				showToast("Invalid Patient Id", false)
			}
		});
	};

	/**
	 * fills the data in the required input field
	 * @param patientData
	 */
	let fillData = (patientData) => {
		$("#inputTextName").val(`${patientData.firstname} ${patientData.surname}`);
		$("#inputTextAgeSex").val(`${patientData.age}Y / ${patientData.gender.toUpperCase()}`);
		$("#inputTextMobile").val(`${patientData.mobileNumber}`);
		$("#inputTextDistrict").val(`${patientData.municipalityName}`);
	}

	let btnIdSubmit = $('#btnIdSubmit');
	let inputTextPatientId = $('#inputTextPatientId');
	btnIdSubmit.click(function () {
		if (isNumber(inputTextPatientId.val())) {
			getPatientData(inputTextPatientId.val(), fillData);
		} else {
			showToast("Invalid Patient Id", false);
		}
	});
}

/**
 * Handles the mathematical operation on the bill portion
 */
function handleTestAddition() {
	// On entering Test Code name and unit price must be changed
	dataListTestCodes.change(function () {
		let testCodeFound = false;
		testList.every(function (item) {
			if (item.testId == dataListTestCodes.val()) {
				dataListTestNames.val(item.testName);
				inputNumberUnit.val(item.unitPrice);
				userCurrentTest = {
					...userCurrentTest,
					testId: item.testId,
					testName: item.testName,
					unitPrice: item.unitPrice
				};
				if ('qty' in userCurrentTest) {
					userCurrentTest.totalPrice = userCurrentTest.qty * userCurrentTest.unitPrice;
					inputNumberTotalPrice.val(userCurrentTest.totalPrice);
				}
				testCodeFound = true;
				return false;
			}
			return true;
		});
		if (!testCodeFound) {
			showToast('Invalid Test Code', false);
			dataListTestNames.val(userCurrentTest.testName);
			dataListTestCodes.val(userCurrentTest.testId);
			inputNumberUnit.val(userCurrentTest.unitPrice);
		}

	});

	// On entering test name , code and unit price must be changed
	dataListTestNames.change(function () {
		let testNameFound = false;
		testList.every(function (item) {
			if (item.testName == dataListTestNames.val()) {
				dataListTestCodes.val(item.testId);
				inputNumberUnit.val(item.unitPrice);
				userCurrentTest = {
					...userCurrentTest,
					testId: item.testId,
					testName: item.testName,
					unitPrice: item.unitPrice
				};
				if ('qty' in userCurrentTest) {
					userCurrentTest.totalPrice = userCurrentTest.qty * userCurrentTest.unitPrice;
					inputNumberTotalPrice.val(userCurrentTest.totalPrice);
				}
				testNameFound = true;
				return false;
			}

			return true;
		});
		if (!testNameFound) {
			showToast('Invalid Test Name', false);
			dataListTestNames.val(userCurrentTest.testName);
			dataListTestCodes.val(userCurrentTest.testId);
			inputNumberUnit.val(userCurrentTest.unitPrice);
		}
	})

	inputNumberQty.change(function () {
		if (isNumber(inputNumberQty.val())) {
			if (inputNumberQty.val() > 0) {

				if (dataListTestNames.val() == "") {
					showToast("Select test first.")
					inputNumberQty.val("");
				} else {
					userCurrentTest.qty = inputNumberQty.val();
					userCurrentTest.totalPrice = userCurrentTest.qty * userCurrentTest.unitPrice;
					inputNumberTotalPrice.val(userCurrentTest.totalPrice);
				}
			} else {
				showToast('Invalid qty', false);
				inputNumberQty.val("");
			}
		} else {
			showToast('Invalid qty', false);
			inputNumberQty.val("");
		}
	});

	/**
	 * Changes the net total, subtotal according to d% and damt
	 */
	let changeNetTotal = () => {
		let netTotal = 0;
		totalTestList.tests.forEach(function (item) {
			netTotal += item.totalPrice;
		});
		inputNumberSubTotal.val(netTotal);
		totalTestList.subTotal = netTotal;
		if (totalTestList.discountP != 0) {

			netTotal = netTotal - (totalTestList.discountP / 100 * netTotal) - totalTestList.discount;
		} else {
			netTotal -= totalTestList.discount;
		}
		totalTestList.netTotal = netTotal;
		inputNumberNetTotal.val(totalTestList.netTotal);
	}

	/**
	 * clears the field
	 */
	btnClearTest.click(function () {
		arrayTestFormChild.forEach(function (item) {
			item.val("");
		});
	});

	/**
	 * Validates the form, Saves or edits the test (single or testDatum)
	 */
	btnAddTest.click(function () {
		let formOk = true;
		arrayFormEnabled.every(function (item) {
			if (item.val() == "") {
				showToast(item.attr("name") + " is empty.");
				formOk = false;
				return false;
			}
			;
			return true;
		});
		if (formOk) {
			showToast("added", true);
			if (editTest.isOn) {
				totalTestList.tests[editTest.id] = userCurrentTest;
			} else {
				totalTestList.tests.push(userCurrentTest);
			}
			userCurrentTest = {testId: "", testName: "", unitPrice: ""};
			let curIndex;
			if (editTest.isOn) {
				curIndex = editTest.id;
			} else {
				curIndex = totalTestList.tests.length - 1;
			}


			// Down: Replace using userCurrentEditTest.id
			let tr = `<tr id="trBody${curIndex}" class="userTestTR">`;
			let td = `<td>${curIndex + 1}</td>
						<td>${totalTestList.tests[curIndex].testId}</td>
						<td>${totalTestList.tests[curIndex].testName}</td>
						<td>${totalTestList.tests[curIndex].unitPrice}</td>
						<td>${totalTestList.tests[curIndex].qty}</td>
						<td>${totalTestList.tests[curIndex].totalPrice}</td>
						<td></td>
						<td></td>
						<td></td>
						<td><button value="${curIndex}" class="mb-3 btn btn-warning testEditBtn"><i class="fa-solid fa-pen-to-square"></i></button><button value="${curIndex}" class="testRemoveBtn mb-3 btn btn-danger" style="margin-left: 15%"><i class="fa-solid fa-trash"></i></button></td>`;
			tr += td + `</tr>`;
			// Use below else and replace curIndex to editUserCurrentEditTest.id
			if (editTest.isOn) {
				$(`#trBody${curIndex}`).html(td);
				let index = 0;
				$('.userTestTR').each(function () {

					$(this).prop('id', `trBody${index}`);
					$(this).find('td:first-child').text(++index);
				});
			} else {

				if (curIndex == 0) {
					$('#trHeading').after(tr);
				} else {
					$(`#trBody${curIndex - 1}`).after(tr);
				}
			}
			btnClearTest.trigger("click");
			changeNetTotal();
			editTest.isOn = false;

		}
	});

	/**
	 * Validates and saves the value
	 */
	inputNumberDiscountP.change(function () {
		if (isNumber(inputNumberDiscountP.val())) {
			if (inputNumberDiscountP.val() <= 100 && inputNumberDiscountP.val() >= 0) {
				totalTestList.discountP = inputNumberDiscountP.val();
				changeNetTotal();
			} else {
				showToast('Invalid D%', false);
				inputNumberDiscountP.val("");
				totalTestList.discountP = 0;
				changeNetTotal();
			}

		} else {
			showToast('Invalid D%', false);
			totalTestList.discountP = 0;
			changeNetTotal();
			inputNumberDiscountP.val("");
		}

	});

	/**
	 * validates and saves the value
	 */
	inputNumberDiscount.change(function () {
		if (isNumber(inputNumberDiscount.val())) {
			totalTestList.discount = inputNumberDiscount.val();
			changeNetTotal();
		} else {
			showToast('Invalid discount Amount.', false);
			inputNumberDiscount.val("");
			totalTestList.discount = 0;
			changeNetTotal();
		}
	})

	/**
	 * Prepares the edit the tests
	 */
	$('#tableTest').on('click', '.testEditBtn', function () {
		let id = $(this).val();
		if (editPrevId == null || id != editPrevId) {
			dataListTestCodes.val(totalTestList.tests[id].testId);
			dataListTestNames.val(totalTestList.tests[id].testName);
			inputNumberQty.val(totalTestList.tests[id].qty);
			inputNumberUnit.val(totalTestList.tests[id].unitPrice);
			inputNumberTotalPrice.val(totalTestList.tests[id].totalPrice);
			userCurrentTest = totalTestList.tests[id];
			editTest.isOn = true;
			editTest.id = id;
		}
	});

	/**
	 * Removes the test from the table and repopulates the table in optimised way
	 */
	$('#tableTest').on('click', '.testRemoveBtn', function () {
		let id = $(this).val();
		if (removePrevId == null || id != removePrevId) {
			removePrevId = id;
			totalTestList.tests.splice(id, 1);
			// Delete happened
			let redesignTable = () => {
				$(`#trBody${id}`).remove();
				let index = 0;
				$('.userTestTR').each(function () {

					$(this).prop('id', `trBody${index}`);
					$(this).find('td:first-child').text(++index);
					// alert($(this).find('td:first-child').text());
				})
			};
			redesignTable();
			changeNetTotal();
		}
	});


}

/**
 * Handles the saving bill operation
 */
function handleSaveButton() {
	let saveTotalTestBtn = $('#saveTotalTest');
	/**
	 * Adapts insert and update condition
	 */
	let sendTestDatabase = () => {
		totalTestList.patientId = patientData.patientId;
		let sendGetParam;
		if (editBill.isOn) {
			sendGetParam = {bill: totalTestList, sampleNo: editBill.id}
		} else {
			sendGetParam = {bill: totalTestList}
		}
		$.ajax({
			url: BASE_URL + 'billing/sendBill',
			async: false,
			dataType: "JSON",
			data: sendGetParam,
			type: "POST"
		}).done(function () {
			// Redirects to the list of the bill
			window.location.href = BASE_URL + 'billing/listBills';
		}).fail(function (error) {

		});
	}
	// Sends only when click on save button
	saveTotalTestBtn.click(function () {
		sendTestDatabase();
	});
}


function fillTestForm() {
	let canAdd = true;
	let error;

	/**
	 * Checks the all form are blank or not
	 * @returns {boolean}
	 */
	let isAllFormBlank = () => {
		let isBlank = false;
		arrayTestFormChild.forEach(function (item) {
			if (item.val() === "") {
				return item.attr('name');
			}
		});
		return isBlank;
	};

	/**
	 * Populate the test datalist button
	 * @param data
	 */
	const fillTests = (data) => {
		testList = data;
		data.forEach(function (item) {
			$('#testCodes').append(`<option value="${item.testId}">`);
			$('#testNames').append(`<option value="${item.testName}">`);
		})
	};

	/**
	 * Gets the tests and populates the datalist option
	 */
	let getTests = () => {
		$.ajax({
			url: BASE_URL + "billing/getTests",
			async: false,
			type: "GET",
			data: {},
			dataType: "JSON"
		}).done(function (data) {
			if (data.data != null) {
				fillTests(data.data);
				// disableForm(false);
			} else {

			}
		}).fail(function () {

		});
	}


	getTests(fillTests);
	disableForm(true);

}

/**
 * Handles When the bill is on update
 * @param sampleNo
 */
function handleEdit(type, sampleNo) {
	/**
	 * populates the form as previoulsy
	 * @param data
	 */
	let fillAllData = (data) => {
		let bill = data.bill;
		let tests = data.tests;
		$('#inputTextPatientId').val(bill.patientId);
		$('#btnIdSubmit').trigger('click');
		tests.forEach(function (item) {
			console.log(item.qty);
			dataListTestCodes.val(item.testItems);
			dataListTestCodes.trigger('change');
			inputNumberQty.val(parseInt(item.qty));
			inputNumberQty.trigger('change');
			btnAddTest.trigger('click');

			editBill = {isOn: true, id: bill.sampleNo};
		});
		inputNumberDiscountP.val(parseInt(bill.discountPercent));
		inputNumberDiscount.val(parseInt(bill.discountAmount));
		inputNumberDiscount.trigger('change');
		inputNumberDiscountP.trigger('change');
	}
	// Gets the test with that id
	if (type == 'sampleNo') {
		$.ajax({
			url: BASE_URL + 'billing/getBill',
			async: false,
			data: {id: sampleNo},
			dataType: "JSON",
			type: "GET"
		}).done(function (data) {
			data = data.data;
			fillAllData(data);
		});
	} else if (type == 'patientId') {
		console.log("run");
		$('#inputTextPatientId').val(sampleNo);
		$('#btnIdSubmit').trigger('click');
	}

}

$(document).ready(function () {
	// First fill the related patient data on click GO
	fillPatientData();
	// Fill the datalist with test value
	fillTestForm();

	// Handles the math operation and changes the form value when value is entered
	handleTestAddition();
	// Inserts or updates the bill
	handleSaveButton();

	// If in case of edit, belows handle edit populates the form
	if (getUrlParameter('sampleNo')) {
		handleEdit('sampleNo', getUrlParameter('sampleNo'));
	} else if (getUrlParameter('patientId')) {
		handleEdit('patientId', getUrlParameter('patientId'));
	}

});
