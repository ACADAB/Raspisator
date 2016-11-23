<head></head>
<body>

	

	<h1>Hello!</h1>


	<form>
		<input type=text id=name value = "<?php echo $_GET['name']  ?>">

	</form>

	<a href = "?name=No name!" id=display> display! </a>

	<h1>
	<?php
		echo $_GET['name'];
	?>	
	</h1>

	<div id = app></div>
	<script src="JS/scripts.min.js"></script>
	<script>
		let displayLink = document.getElementById("display");
		let input = document.getElementById("name");

		displayLink.addEventListener('click',function(){
		displayLink.href = "?name=" + (input.value.length>0?input.value : "No Name!");
});
	</script>
</body>