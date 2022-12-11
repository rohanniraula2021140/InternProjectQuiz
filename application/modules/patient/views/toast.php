<button type="button" class="btn btn-primary" id="liveToastBtn" style="display: none">s</button>

<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
	<div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
		<div class="toast-header" id="toastHead">
			<!--			<img src="..." class="rounded me-2" alt="...">-->
			<strong class="me-auto text-light">HMIS</strong>
			<small style="color:white;">0 sec ago</small>
			<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
		</div>
		<div class="toast-body" id="toastBody">

		</div>
	</div>
</div>

<script>
	let toastTrigger = document.getElementById('liveToastBtn')
	let toastLiveExample = document.getElementById('liveToast')
	if (toastTrigger) {
		toastTrigger.addEventListener('click', function () {
			let toast = new bootstrap.Toast(toastLiveExample)

			toast.show()
		})
	}
</script>
