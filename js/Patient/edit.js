let BASE_URL = 'http://localhost/InternProjectQuiz/';

/**
 * Sends the patient data and redirect on list on success
 * @param patientData
 */
function sendPatientDatabase(patientData) {
	$.ajax({
		url: BASE_URL + 'Patient/addPatient', async: false, dataType: "JSON", data: patientData, type: "POST"
	}).done(function (data) {
		window.location.href = BASE_URL + "Patient/listPatient";
	}).fail(function (error) {
		console.log(error.responseText);
	})
}

/**
 * Validates the form and if success then saves in database
 */
function handleSubmitButton() {
	let editForm = $('#editPatientForm');
	let submitButton = $('#submitBtn');
	let errorField = $('#modalBody');
	/**
	 * Submits the form for validation and sends if fine otherwise show modal.
	 */
	submitButton.click(function (e) {
		e.preventDefault();
		$.ajax({
			url: BASE_URL + 'Patient/verifyForm',
			data: editForm.serialize(),
			datatype: "JSON",
			type: "POST",
			async: false
		}).done(function (data) {
			data = JSON.parse(data);
			if (!data.success) {
				errorField.html(data.errors);
				$('#modalTitle').text('You missed something.');
				$('#modalTriggerBtn').click();
			} else {
				sendPatientDatabase(editForm.serialize());
				$('#cancelBtn').click();
			}
		}).fail(function (error) {
		});
	});
}

/**
 * Sets the current data and time
 */
function setCurrentDateAndTime() {
	let curDateTime = $('#curDateTime');
	let date = new Date();

	curDateTime.val(date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]);
}

/**
 * Populates the drop down for muni, country and province
 */
function handleFormDropDown() {
	let countrySelect = $('#selectCountry');
	let provinceSelect = $('#selectProvince');
	let municipalitySelect = $('#selectMunicipality');

	/**
	 * Resets the drop down
	 * @param select
	 * @param message
	 */
	let resetSelect = (select, message) => {
		select.empty();
		select.append('<option value="0">' + message + '</option>');
	}

	/**
	 * Populates the data after fetching from database
	 * @param param
	 * @param select
	 * @param type
	 */
	let populateData = (param, select, type) => {
		/**
		 * fills the muni, country, province dropdown
		 * @param select
		 * @param data
		 * @param type
		 */
		let fillDropdown = (select, data, type) => {
			select.empty();
			data.forEach(function (item) {
				if (type == "country") {
					select.append(`<option value="${item.countryId}">${item.name}</option>`);
				} else if (type == "province") {
					select.append(`<option value="${item.provinceId}">${item.name}</option>`);
				} else if (type == "municipality") {
					select.append(`<option value="${item.municipalityId}">${item.name}</option>`);
				}
			});
		}

		/**
		 * Handles the get request
		 * @param param
		 * @param select
		 * @param type
		 */
		let getRequest = (param, select, type) => {
			$.ajax({
				url: BASE_URL + 'Patient/getLocations', data: param, type: "GET", dataType: "JSON", async: false
			}).done(function (data) {
				data.data.unshift({id: 0, name: "NONE"});
				fillDropdown(select, data.data, type);
			});
		};

		getRequest(param, select, type);
	}

	populateData({type: "countries"}, countrySelect, "country");
	countrySelect.change(function () {
		if (countrySelect.val() !== "undefined") {
			populateData({type: "provinces", 'countryId': countrySelect.val()}, provinceSelect, "province");
		} else {
			resetSelect(provinceSelect, 'Select country first');
			resetSelect(municipalitySelect, 'Select province first');
		}
	});
	provinceSelect.change(function () {
		if (provinceSelect.val() !== "undefined") {
			populateData({
				type: "municipalities", 'provinceId': provinceSelect.val()
			}, municipalitySelect, "municipality");
		} else {
			resetSelect(municipalitySelect, 'Select province first');
		}
	});
}

/**
 * Populates all part of form on edit
 */
function populateEditForm() {
	/**
	 * Gets
	 * @param id
	 * @param func
	 */
	const getPatientData = (id, func) => {
		$.ajax({
			url: BASE_URL + 'Patient/getPatient', async: false, dataType: "JSON", data: {id: id}, type: "GET"
		}).done(function (data) {
			// if (data.success) {
			func(data.data);
			// } else {
			// TODO show Toast by saying error occurred
			// }
		});
	};

	/**
	 * Fills the patient data including selects
	 * @param data
	 */
	const fillPatientData = (data) => {
		$('#inputTextFirstname').val(data.firstname)
		$('#inputTextSurname').val(data.surname)
		$('#inputNumberAge').val(data.age)
		$(':input[name="patient[gender]"]').each(function () {
			if ($(this).val() == data.gender) {
				$(this).prop('checked', 'true');
			}
		});
		$(':input[name="patient[userLanguage][]"]').each(function () {
			if (data.userLanguage.includes($(this).val())) {
				$(this).prop('checked', true);
			}
		});
		$('#selectCountry option').each(function () {
			if ($(this).val() == data.countryId) {
				$(this).prop('selected', true);
				$('#selectCountry').trigger('change');
				$('#selectProvince option').each(function () {
					if ($(this).val() == data.provinceId) {
						$(this).prop('selected', true);
						$('#selectProvince').trigger('change');
						$('#selectMunicipality option').each(function () {
							if ($(this).val() == data.municipalityId) {
								$(this).prop('selected', true);
							}
						});
					}
				});

			}
		});
		$('#inputTextAddress').val(data.address)
		$('#inputNumberMobileNumber').val(data.mobileNumber)
		$('#inputCurDateTime').val(data.currentDateTime)

	}
	if ($('#patientId').length > 0) {
		getPatientData($('#patientId').val(), fillPatientData);
	}
}

/**
 * TODO WATCH STANDARD PRACTICE IN CONTROLLER
 */
$(document).ready(function () {
	/*
	 Pre loads options and sets current date and time
	 */
	handleSubmitButton();
	setCurrentDateAndTime();
	handleFormDropDown();

	/*
	 Populates the form incase of edit
	 */
	populateEditForm();
});



