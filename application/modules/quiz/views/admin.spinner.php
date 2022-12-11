<link rel="stylesheet" href="<?php echo base_url() ?>css/Quiz/spinner.css">
<div class='loader-container'>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
	<div></div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svgGraphic">
	<defs>
		<filter id="gooey">
			<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
			<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" result="goo" />
			<feBlend in="SourceGraphic" in2="goo" />
		</filter>
	</defs>
</svg>
