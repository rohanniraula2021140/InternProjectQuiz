let BASE_URL = 'http://localhost/InternProjectQuiz/';
const showList = () => {
	/**
	 * Refresh the page automatically
	 */
	const refreshPage = () => {
		location.reload();
	}

	/**
	 * Get the bill
	 * @param url
	 * @param param
	 * @param func
	 */
	const getBillData = (url, param, func) => {
		$.ajax({
			url: BASE_URL + url,
			data: param,
			dataType: "JSON",
			async: false,
			type: "GET"
		}).done(function (data) {
			func(data);
		});
	}

	/**
	 * To show the list of the bill in the table
	 * @param data
	 */
	const showTable = (data) => {
		let tr = "";
		data.data.forEach(function (item, index) {
			tr += `<tr>
						<td>${index + 1}</td>
						<td>${item.billingDate}</td>
						<td>${item.firstname} ${item.surname}</td>
						<td>${item.sampleNo}</td>
						<td>${item.subTotal}</td>
						<td>${item.discountPercent}% / Rs.${item.discountAmount}</td>
						<td>${item.netTotal}</td>
						<td><a href="${BASE_URL}billing/edit?sampleNo=${item.sampleNo}" type="button" class="btn btn-outline-warning mb-3">Edit</a><button class="btn mb-3 btn-outline-info viewBtn" value="${item.sampleNo}">View</button><button class="btn mb-3 btn-danger removeBtn" value="${item.sampleNo}">Remove</button></td>
					</tr>`;
		});
		$('#trHeadBill').after(tr);
	}

	/**
	 * To show the detailed view of the bill with all the tests
	 * @param data
	 */
	let showModal = (data) => {
		console.log(data);
		let wholeData = data.data;
		data = wholeData.bill;
		let table = `<table class="table table-hover">
					<tr><td>Billing Date</td><td>${data.billingDate}</td></tr>
					<tr><td>Sample No</td><td>${data.sampleNo}</td></tr>
					<tr><td>Sub total</td><td>${data.subTotal}</td></tr>
					<tr><td>D% / DAmt</td><td>${data.discountPercent}% / Rs.${data.discountAmount}</td></tr>
					<tr><td>Net Total</td><td>${data.netTotal}</td></tr>`;
		wholeData.tests.forEach(function (item, index) {
			table += `<tr><td></td><td></td></tr>`;
			table += `<tr><td colspan="2">Test: ${index + 1}</td></tr>`
			table += `<tr><td>Test Code</td><td>${item.testItems}</td></tr>`
			table += `<tr><td>Test Name</td><td>${item.testName}</td></tr>`
			table += `<tr><td>Qty</td><td>${item.qty}</td></tr>`
			table += `<tr><td>Unit Price</td><td>${item.unitPrice}</td></tr>`
			table += `<tr><td>Total Price</td><td>${item.price}</td></tr>`
		});
		table += '</table>';
		$('#modalTitle').text('View Bill');
		$('#modalBody').html(table);
		$('#modalTriggerBtn').click();
	}

	// STarts here
	getBillData("billing/getBill", {}, showTable);
	$('#billTable').on('click', '.viewBtn', function () {
		// console.log('view Clicked')
		getBillData("billing/getBill", {id: $(this).val()}, showModal);
	});
	$('#billTable').on('click', '.removeBtn', function () {

		getBillData("billing/removeBill", {id: $(this).val()}, refreshPage);
	});

}

// show toast
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


// Showing the bill list to the user
$(document).ready(function () {
	showList();
})
