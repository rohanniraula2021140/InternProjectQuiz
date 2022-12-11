<div class="validationErrors"></div>
<div class="login-box">
	<h2>Welcome</h2>

	<?php echo form_open("", array('id' => 'run_form')); ?>
	<div class="user-box">
		<input type="text" name="user[name]" id="name" required="">
		<label for="name">Name</label>
	</div>
	<a href="" id="run">
		<span></span>
		<span></span>
		<span></span>
		<span></span>
		Run
	</a>
	<?php form_close(); ?>
</div>
