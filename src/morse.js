
var Morse = {

	morseCode: {
		'A': ".-",
		'B': "-...",
		'C': "-.-.",
		'D': "-..",
		'E': ".",
		'F': "..-.",
		'G': "--.",
		'H': "....",
		'I': "..",
		'J': ".---",
		'K': "-.-",
		'L': ".-..",
		'M': "--",
		'N': "-.",
		'O': "---",
		'P': ".--.",
		'Q': "--.-",
		'R': ".-.",
		'S': "...",
		'T': "-",
		'U': "..-",
		'V': "...-",
		'W': ".--",
		'X': "-..-",
		'Y': "-.--",
		'Z': "--..",
	},
    generateMorseCode: function(captcha) {

    	/*
    	generates Morse Code for the incoming Captcha
    	*/

    	captcha = captcha.toUpperCase();
    	var result = "";
    	for (var i = 0; i < captcha.length; i++) {
    		var letter = captcha[i];
    		result += this.morseCode[letter] + " ";
    	}
    	return result.trim();
    },
    vibrate: function(morseCaptcha) {

    	/*
    	Generates a vibrating pattern and vibrates the
    	browser to transmit the Morse Code
    	*/

    	var pattern = [];
    	var dot = 200, dash = 500, gapNormal = 222, gapLetter = 800;
    	for(var i = 0; i < morseCaptcha.length; i++) {
    		switch (morseCaptcha[i]) {
    			case '.':
	    			pattern.push(dot);
	    			pattern.push(gapNormal);
	    			break;
	    		case '-':
	    			pattern.push(dash);
	    			pattern.push(gapNormal);
	    			break;
	    		case ' ':
	    			pattern.push(0);
	    			pattern.push(gapLetter);
	    			break;
    		}
    	}
    	console.log(pattern);
    	window.navigator.vibrate(pattern)
    },
    vibrateCaptcha: function(captcha, secretKey) {

    	/*
    	Vibrates the encrypted Captcha
    	*/

    	var decryptedCaptcha = CryptoJS.AES.decrypt(captcha, secretKey);

    	decryptedCaptcha = decryptedCaptcha.toString(CryptoJS.enc.Utf8);

    	this.vibrate(
    		this.generateMorseCode(
    			decryptedCaptcha
    			));

    	return true;
    },
    generateCaptcha: function(secretKey) {

    	/*
    	Generates a Captcha and returns the encrypted form
    	using AES encryption
    	*/

    	var captcha = "";
    	var captchaLength = 1;
    	for(var i = 0; i < captchaLength; i++) {
    		captcha += String.fromCharCode(
    			97 + Math.floor(
    				Math.random()*26));
    	}
    	captcha = captcha.toUpperCase();
    	// console.log(captcha);
    	return CryptoJS.AES.encrypt(
    		captcha, secretKey);
    },
    validateCaptcha(captcha, secretKey, encryptedCaptcha) {

    	/*
    	Validates if the captcha is correct or not
    	*/

    	return (
    		CryptoJS.AES.decrypt(encryptedCaptcha, secretKey).toString(CryptoJS.enc.Utf8) === captcha
    	);
    }

};
