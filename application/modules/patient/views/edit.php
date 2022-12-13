<title>Save Patient</title>
<link rel="stylesheet" href="<?= str_replace('/index.php', '', base_url('css/Patient/edit.css')) ?>">
<script src="<?= str_replace('/index.php', '', base_url('js/Patient/edit.js')) ?>"></script>

<?= form_open('', array('id' => 'editPatientForm')); ?>

<?php
if (isset($patData)) {
	echo '<input type="hidden" name="patient[id]" id="patientId" value ="' . $patData->id . '">';
}
?>

<h3>Save Patient</h3>

<!--	Name input:text-->
<div class="input-group mb-3 w-50">
	<span class="input-group-text">Name</span>
	<input type="text" class="form-control" name="patient[firstname]" id="inputTextFirstname" placeholder="First Name"
		   value="">
	<input type="text" class="form-control" name="patient[surname]" id="inputTextSurname" placeholder="Last Name"
		   value="">
</div>

<!--	Age Input :number-->
<div class="input-group mb-3 w-25">
	<span class="input-group-text">Age</span>
	<input type="text" class="form-control" name="patient[age]" id="inputNumberAge" placeholder="Age"
		   value="">
</div>

<!--	Gender Radio button-->
<div class="form-check w-25">
	<input type="radio" class="form-check-input" id="radioGenderMale" name="patient[gender]"
		   value="m">Male
	<label class="form-check-label" for="radioGenderMale"></label>
</div>
<div class="form-check w-25">
	<input type="radio" class="form-check-input" id="radioGenderFemale" name="patient[gender]"
		   value="f">Female
	<label class="form-check-label" for="radioGenderFemale"></label>
</div>
<div class="form-check w-25">
	<input type="radio" class="form-check-input" id="radioGenderOther" name="patient[gender]"
		   value="o">Other
	<label class="form-check-label" for="radioGenderOther"></label>
</div>

<!--Language Check Box	-->

<div class="form-check w-25">
	<input type="checkbox" class="form-check-input" id="checkBoxLangEng" name="patient[userLanguage][]"
		   value="english">
	<label class="form-check-label" for="checkBoxLangEng">English</label>
</div>
<div class="form-check w-25">
	<input type="checkbox" class="form-check-input" id="checkBoxLangNep" name="patient[userLanguage][]"
		   value="nepali">
	<label class="form-check-label" for="checkBoxLangNep">Nepali</label>
</div>
<div class="form-check w-25">
	<input type="checkbox" class="form-check-input" id="checkBoxLangHin" name="patient[userLanguage][]"
		   value="hindi">
	<label class="form-check-label" for="checkBoxLangHin">Hindi</label>
</div>

<!--Country Dropdown	-->
<label for="selectCountry" class="form-label" style="text-align: center">Select Country:</label>
<select class="form-select w-25" id="selectCountry" name="patient[countryId]" id="selectCountry">
</select>
<!-- Province Dropdown -->
<label for="selectProvince" cla ss="form-label" style="text-align: center;">Select Province:</label>
<select class="form-select w-25" id="selectProvince" name="patient[provinceId]">
	<option value="0">Select country first</option>
</select>
<!-- Municipality Dropdown -->
<label for="selectMunicipality" class="form-label" style="text-align: center;">Select Municipality:</label>
<select class="form-select w-25" id="selectMunicipality" name="patient[municipalityId]">
	<option value="0">Select province first</option>
</select>

<!--Address input: text-->
<div class="input-group mb-3 w-50 mt-4">
	<span class="input-group-text">Address</span>
	<input type="text" class="form-control" name="patient[address]" id="inputTextAddress" placeholder="Address"
		   value="">
</div>

<!--Mobile Number input: text-->
<div class="input-group mb-3 w-50 mt-4">
	<span class="input-group-text">Mobile Number</span>
	<input type="text" class="form-control" name="patient[mobileNumber]" id="inputNumberMobileNumber"
		   input="inputNumberMobNum" placeholder="Mobile number"
		   value="">
</div>

<!--Mobile Number input: text-->
	<input type="hidden"  class="form-control" name="patient[currentDateTime]" id="inputCurDateTime"
		   placeholder="date" value=""
		   id="curDateTime">

<a class="btn btn-outline-danger mt-4" href="<?php echo base_url('Patient/listPatient'); ?>" id="cancelBtn">Cancel</a>
<button type="button" class="btn btn-outline-success m-auto mt-4" id="submitBtn">Add Patient</button>

<?= form_close(); ?>
