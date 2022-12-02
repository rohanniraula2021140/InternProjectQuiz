<link rel="stylesheet" href="<?php echo base_url() ?>css/Quiz/home.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
	  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
	  integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
	  crossorigin="anonymous" referrerpolicy="no-referrer"/>

<div id="spinner">

	<?php require_once ('home.spinner.html.php');?>

</div>

<div id="nameCard" style="display: none">
	<?php require_once ('home.name.form.html.php');?>
</div>

<i class="fa-solid fa-check" id="tickIcon" style="display:none;position: absolute;left: 95%;top:5%; color:white; font-size: 34px"></i>
<div id="question" style="display: none">
	<?php require_once ('home.question.form.html.php');?>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script src="<?php echo base_url(); ?>js/Quiz/home.js"></script>
