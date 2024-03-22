// Pure Javascript

var $desempeno 			= document.querySelector(".form-check-inline #desempeno")			.parentElement.querySelector("span");
var $crecimiento 				= document.querySelector(".form-check-inline #crecimiento")				.parentElement.querySelector("span");
var $innovacion 			= document.querySelector(".form-check-inline #innovacion")			.parentElement.querySelector("span");
var $sst 			= document.querySelector(".form-check-inline #sst")			.parentElement.querySelector("span");
var $bienestar 				= document.querySelector(".form-check-inline #bienestar")				.parentElement.querySelector("span");
var $competencias 			= document.querySelector(".form-check-inline #competencias")			.parentElement.querySelector("span");
var $formacion 	= document.querySelector(".form-check-inline #formacion")	.parentElement.querySelector("span");
var $copasst 	= document.querySelector(".form-check-inline #copasst")	.parentElement.querySelector("span");
var $antiguedad 	= document.querySelector(".form-check-inline #antiguedad")	.parentElement.querySelector("span");
var $mercadeo 	= document.querySelector(".form-check-inline #mercadeo")	.parentElement.querySelector("span");

var txt_content = document.querySelector(".form-check-inline span").textContent;


document.addEventListener("DOMContentLoaded", function(event) {
	console.log("OH ! It's ON ! " + txt_content);

	$desempeno		.style.backgroundImage = "url('01.jpg')";
	$crecimiento				.style.backgroundImage = "url('02.jpg')";
	$innovacion		.style.backgroundImage = "url('03.jpg')";
	$sst			.style.backgroundImage = "url('04.jpg')";
	$bienestar				.style.backgroundImage = "url('05.jpg')";
	$competencias		.style.backgroundImage = "url('06.jpg')";
	$formacion.style.backgroundImage = "url('07.jpg')";
	$copasst.style.backgroundImage = "url('08.jpg')";
	$antiguedad.style.backgroundImage = "url('09.jpg')";
	$mercadeo.style.backgroundImage = "url('10.jpg')";

});

const form = document.querySelector("form");
const correctCheckboxes = ["desempeno", "crecimiento", "innovacion", "sst", "bienestar", "competencias" ];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedCheckboxes = [...form.elements].filter(el => el.checked).map(el => el.name);
  if (selectedCheckboxes.length !== correctCheckboxes.length || !selectedCheckboxes.every(checkbox => correctCheckboxes.includes(checkbox))) {
    alert("Sigue intentando");
  } else {
    alert("¡Felicidades, lo lograste!");
  }
});
