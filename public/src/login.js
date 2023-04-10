function match()
{
	let error = document.getElementById("error")
	let pass = document.getElementsByName("password")
	let cpass = document.getElementsByName("cpassword")

	if(pass === cpass)
	{
		error.innerHTML="matched"
	}
	else
	{
		// error.innerHTML="enter same password"
	}
}