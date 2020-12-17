
let email;
let signInButton;
let errorlabel;
/* -------------------------------------------------------------------------- */
function ValidateEmail(inputText)
{
	var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(inputText.match(mailformat))
	{
		return true;
	}
	else
	{
		errorlabel.innerHTML = "invalid emailaddress"
		email.setAttribute('style', "border-color: red;");
		return false;
	}
}
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
const getDOMElements = function() {
	email = document.querySelector('.js-email-input');
	signInButton = document.querySelector('.js-sign-in-button');
	errorlabel = document.querySelector('.js-error_label');
};
/* -------------------------------------------------------------------------- */
const enableListeners = function() {
	signInButton.addEventListener('submit', function(e) {
		if(ValidateEmail(email.value))
		{
			return true
		}
		else{
			e.preventDefault()
		}
	});
};
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function() {
	console.log('DOM loaded!');
	getDOMElements();
	enableListeners();
});
/* -------------------------------------------------------------------------- */
