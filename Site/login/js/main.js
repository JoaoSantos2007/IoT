
	(function ($) {

		"use strict";

		var fullHeight = function () {

			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});

		};
		fullHeight();

		// const firebaseConfig = {
		// 	apiKey: "AIzaSyDOCg6kqirThQKx3R6zd5VNphTqbbuA1Rc",
		// 	authDomain: "fir-crud-e99a4.firebaseapp.com",
		// 	projectId: "fir-crud-e99a4",
		// 	storageBucket: "fir-crud-e99a4.appspot.com",
		// 	messagingSenderId: "319998441027",
		// 	appId: "1:319998441027:web:01e4f3fe3d2a57dd3c46f6",
		// 	measurementId: "G-7437FP6V3J"
		// };
		
		// //Inicializa o Firebase com a constante contendo as credenciais do Firebase
		// firebase.initializeApp(firebaseConfig)

		$(".toggle-password").click(function () {
			// password = window.document.getElementById("password-field")
			// email = window.document.getElementById("email-field")
			// window.alert(password)
			// window.alert(email)
			// firebase.auth().signInWithEmailAndPassword(email, password)
			// 	.then(function (firebaseUser) {
			// 		// Success 
			// 		window.location.href = ("/Site/index.html")
			// 	})
			// 	.catch(function (error) {
			// 		// Error Handling
			// 		window.alert("ERRO")
			// 	});
	  $(this).toggleClass("fa-eye fa-eye-slash");
		var input = $($(this).attr("toggle"));
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

}) (jQuery);
