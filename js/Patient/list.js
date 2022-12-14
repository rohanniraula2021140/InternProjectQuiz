let BASE_URL = 'http://localhost/InternProjectQuiz/';
let tableHead = '<tr>' + '<th>SN</th>' + '<th>PatientId</th>' + '<th>Patient Name</th>' + '<th>Age/Gender</th>' + '<th>Municipality</th>' + '<th>Address</th>' + '<th>Registered Date</th>' + '<th>Actions</th>' + '</tr>';

/**
 * Gets the db data from the url
 * @param url: url for the ajax
 * @param param: param for the ajax
 * @param func: function to implement when request succeeds
 */
let getDBData = (url, param, func) => {
	$.ajax({
		url: BASE_URL + url, data: param, dataType: "JSON", type: "GET", async: false
	}).done(function (response) {
		func(response.data);
	}).fail(function(response) {
		console.log(response.responseText);
	});
};

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
 * Show the patient data on click view on list
 * @param data
 */
let showPatientData = (data) => {

	/**
	 * Create the table to show inside the modal
	 * @param item: single patient data
	 * @param index: index of the patient (Used inside the array)
	 *
	 */
	let createTableRow = (item, index) => {
		return `<tr>
					<td>${index}</td>
					<td>${item.id}</td>
					<td>${item.firstname} ${item.surname}</td>
					<td>${item.age}Y / ${item.gender}</td>
					<td>${item.municipalityName}</td>
					<td>${item.address}</td>
					<td>${item.currentDateTime}</td>
					<td><button class="btn btn-warning viewBtn" value="${item.id}">View</button> <a class="btn btn-info editBtn" href="${BASE_URL}patient/edit?id=${item.id}">Edit</a><a class="btn btn-success m-1 addBill" href="${BASE_URL}billing/edit?patientId=${item.id}">Billing</a></td>
				</tr>`;
	}

	/**
	 * Shows the modal with patient data
	 * @param data
	 */
	let showModal = (data) => {
		let table = `<table class="table table-hover">
						<tr><td>Patient Id</td><td>${data.id}</td></tr>
						<tr><td>Name</td><td>${data.firstname} ${data.surname}</td></tr>
						<tr><td>Age</td><td>${data.age}</td></tr>
						<tr><td>Gender</td><td>${data.gender}</td></tr>
						<tr><td>Municipality</td><td>${data.municipalityName}</td></tr>
						<tr><td>Province</td><td>${data.provinceName}</td></tr>
						<tr><td>Country</td><td>${data.countryName}</td></tr>
						<tr><td>Date</td><td>${data.currentDateTime}</td></tr>
						<tr><td>Address</td><td>${data.address}</td></tr>
						<tr><td>Mobile Number</td><td>${data.mobileNumber}</td></tr>
						<tr><td>User Languages</td><td>${data.userLanguage}</td></tr>						
					 </table>`;
		$('#modalTitle').text(`${data.firstname} ${data.surname}`);
		$('#modalBody').html(table);
		$('#modalTriggerBtn').click();
	}


	if (data.length > 0) {
		$('#patientTable tr').remove();
		$('#patientTable').append(tableHead);
		data.forEach(function (item, index) {
			$('#patientTable').append(createTableRow(item, index + 1));
		});
	} else {
		$('#patientTable').append();
	}

	$('.viewBtn').click(function () {
		getDBData("/Patient/getPatient", {id: $(this).val()}, showModal);
	});
}

/**
 * Implemented search button click
 */
$(document).ready(function () {
	$('#searchBtn').click(function (data) {
		// if number
		if (!isNaN($('#inputSearch').val())) {
			getDBData("Patient/getPatient", {num: $('#inputSearch').val()}, showPatientData);
		}
		// if not blank
		else if ($('#inputSearch').val() != "") {
			getDBData("Patient/getPatient", {text: $('#inputSearch').val()}, showPatientData);
		}
	});
	getDBData("Patient/getPatient", {}, showPatientData);
	if ($('#toastBody').text() !== "") {
		console.log($('#toastBody').text())
		showToast($('#toastBody').text(), true);
	}
});
