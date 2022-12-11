<title>Save Bill</title>
<script type="module" src="<?php echo base_url("js/Billing/edit.js") ?>"></script>
<h2></h2>

<div class="d-flex flex-row">
	<div class="input-group mb-3 w-25">
		<span class="input-group-text">Patient Id</span>
		<input type="number" class="form-control" placeholder="Enter here" id="inputTextPatientId" value="">
		<button class="btn btn-primary" type="button" id="btnIdSubmit">OK</button>
	</div>
	<div class="input-group mb-3 m-1" style="width: 25%">
		<span class="input-group-text">Name</span>
		<input type="text" class="form-control" id="inputTextName" disabled>
	</div>
	<div class="input-group mb-3 m-1" style="width: 15%">
		<span class="input-group-text">Age/Sex</span>
		<input type="text" class="form-control" id="inputTextAgeSex" disabled>
	</div>
	<div class="input-group mb-3 m-1" style="width: 20%">
		<span class="input-group-text">Mobile</span>
		<input type="text" class="form-control" id="inputTextMobile" disabled>
	</div>
	<div class="input-group mb-3 m-1" style="width: 20%">
		<span class="input-group-text">District</span>
		<input type="text" class="form-control" id="inputTextDistrict" disabled>
	</div>
	<!--	TODO Datalist, auto complete -->
	<!--	TODO multiple datalist working on combination -->

</div>


<div class="d-flex flex-row m-1">
	<div class="mb-3" style="width: 8%;margin-left: 5%">
		<input class="form-control" list="testCodes" autocomplete="off" name="Test Code" id="dataListTestCodes"
			   placeholder="Test Code">
		<datalist id="testCodes">
		</datalist>
	</div>
	<div class="mb-3" style="width: 20%; margin-left: 5px;">
		<input class="form-control" list="testNames" autocomplete="off" name="Test name" id="dataListTestNames"
			   placeholder="Test Name">
		<datalist id="testNames">
		</datalist>
	</div>

	<div class="mb-3 " style="width: 8%;margin-left:15px;">
		<input type="number" class="form-control" placeholder="Unit Price" name="Unit price" id="inputNumberUnitPrice"
			   disabled>
	</div>
	<div class="mb-3 " style="width: 6%;margin-left:15px;">
		<input type="number" class="form-control" placeholder="Qty" id="inputNumberQty" name="Qty">
	</div>
	<div class="mb-3 " style="width: 9%;margin-left:15px;">
		<input type="text" class="form-control" placeholder="Total Price" id="inputNumberTotalPrice" name="Total price"
			   disabled>
	</div>

	<button class="mb-3 btn btn-outline-warning" style="margin-left: 1%" id="btnClearTest"><i
				class="fa-solid fa-delete-left"></i></button>
	<button class="mb-3 btn btn-success" style="margin-left: 1%" id="btnAddTest"><i class="fa-solid fa-plus"></i>
	</button>
</div>
<table class="table table-bordered" id="tableTest">
	<tr id="trHeading">

		<th style="width: 3%">SN</th>
		<th style="width:7%">Test Code</th>
		<th style="width:15%">Test Name</th>
		<th style="width:8%">Unit Price</th>
		<th style="width:5%">Qty</th>
		<th style="width:9%">Total Price</th>
		<th style="width:5%">Discount %</th>
		<th style="width:9%">Discount</th>
		<th style="width:10%">Net Total</th>
		<th style="width:11%">Actions</th>
	</tr>


	<tr id="trTotal">
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td></td>
		<td>
			<div class="mb-3">
				<input type="number" class="form-control" placeholder="Sub Total" id="inputNumberSubTotal" disabled>
			</div>
		</td>
		<td>
			<div class="mb-3">
				<input type="number" class="form-control" placeholder="Dis %" id="inputNumberDiscountP">
			</div>

		</td>
		<td>
			<div class="mb-3">
				<input type="number" class="form-control" placeholder="Discount" id="inputNumberDiscount">
			</div>

		</td>
		<td>
			<div class="mb-3">
				<input type="number" class="form-control" placeholder="Net Total" id="inputNumberNetTotal" disabled>
			</div>
		</td>
		<td>
			<div class="mb-3">
				<a class="btn btn-outline-danger" href="<?php echo base_url('Patient/billing/listBills'); ?>"
				   id="cancelTest"><i class="fa-solid fa-delete-left"></i></a>
				<button id="saveTotalTest" class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i></button>
			</div>
		</td>
	</tr>
</table>




