<div id="questionText">

</div>
<div id="timer">
	<p id="pTimer"></p>
</div>

<?php echo form_open("", array()); ?>

<label for="option1" id="labelOption1"></label>
<?php echo form_radio('option', '', false, ['id' => 'option1']); ?>
<label for="option2" id="labelOption2"></label>
<?php echo form_radio('option', '', false, ['id' => 'option2']); ?>
<label for="option3" id="labelOption3"></label>
<?php echo form_radio('option', '', false, ['id' => 'option3']); ?>
<label for="option4" id="labelOption4"></label>
<?php echo form_radio('option', '', false, ['id' => 'option4']); ?>
<div id="quiz_form">
	<!--		<input type="button" value="back" id="backBtn">-->
	<button id="backBtn">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		Back
	</button>
	<button id="nextBtn">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		Next
	</button>

</div>
<?php form_close(); ?>
