/* jslint browser:true */
/* global SpeechSynthesisUtterance */
/* global webkitSpeechRecognition */
/* global chrome */

function speak(text) {    
  var msg = new SpeechSynthesisUtterance();    
  msg.text = text;
  window.speechSynthesis.speak(msg);
}

// running the morse service

var encryptedCaptcha;

function getCaptcha() {
	speak('The system will now use Morse Code to deliver Captcha. Please hold onto your device and wait for a second')
	var secret = "secret-key";
	var captcha = Morse.generateCaptcha(secret);
	console.log(captcha.toString());
	encryptedCaptcha = captcha;

	document.getElementById('captcha-morse').innerHTML = '<br>' + captcha + '<br>';
	document.getElementById('captcha-btn').style = "display: none";

	var encCaptcha = document.getElementById('captcha-morse').innerText;

	setTimeout(function() {
		Morse.vibrateCaptcha(captcha, secret);
	}, 7000);
}

function validate() {
	var secret = "secret-key";
	var captchaValue = document.getElementById('captcha-inp').value;
	var captchaMorse = document.getElementById('captcha-morse');

	if(Morse.validateCaptcha(captchaValue, secret, encryptedCaptcha)) {
		console.log('validated');
		var validateBtn = document.getElementById('validate-btn');
		var captchaIpFld = document.getElementById('captcha-inp');
		validateBtn.className = "success";
		captchaMorse.style.color = "green"
		validateBtn.innerText = "Success";
		validateBtn.disabled = true;
		captchaIpFld.disabled = true;
		speak('Encrypted signature matched. Captcha Validation Successful! You may submit the form.');
		var submitBtn = document.getElementById('submitBtn');
		submitBtn.disabled = false;
	} else {
		console.log('oops!');
		captchaMorse.style.color = "red";
		speak('Captcha validation failed!');
	}
}


function submitForm() {
	speak('Thank you for submitting the form!');
	window.location.replace('/done.html');
}