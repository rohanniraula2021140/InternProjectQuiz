<h2>Login</h2>
<?php echo form_open("", array('id' => 'login_form')); ?>
<div id="loginError"></div>

<div class="user-box">
	<label for="username">Username:</label><br>
	<?php echo form_input('login[username]', '', ['type' => 'text', 'id' => 'username']); ?>
</div>

<div class="user-box">
	<label for="password">Password: </label><br>
	<?php echo form_password('login[password]', '', ['type' => 'password', 'id' => 'password']); ?>
</div>

<button id="loginBtn" type="button" class="specialBtn" name="loginButton">
	<span></span>
	<span></span>
	<span></span>
	<span></span>
	Login
</button>
<?php echo form_close(); ?>
