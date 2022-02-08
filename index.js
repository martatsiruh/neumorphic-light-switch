document.addEventListener("DOMContentLoaded", callback);
//DOMContentLoaded– браузер повністю завантажив HTML, і дерево DOM створено,
//але зовнішні ресурси, такі як зображення < img > та таблиці стилів, ще не завантажені.
//DOM готовий, тому обробник може шукати вузли DOM, ініціалізувати інтерфейс.


let slider = document.querySelector("input");

function callback(event) {
	event.preventDefault();
	
	slider.addEventListener("input", adjustSlider);
	adjustSlider(slider);
	
}

function adjustSlider(event) {
	let body = document.body,
		
		switchLightColorMin = 40,
		switchLightColorMax = 100,

		tar = event.target || event,
		//pct = 1(max)-0.01(min)
		pct = +tar.value / +tar.max,
		L1 = pct * (switchLightColorMax - switchLightColorMin) + switchLightColorMin,
		L2 = L1 - 10,
		L3 = L1  - 37,
		L = [L1, L2, L3],
		
		thumbPointerMin = 0,
		thumbPointerMax = 120,
		thumbPointer = pct * (thumbPointerMax - thumbPointerMin) + thumbPointerMin,
		
		constantInd = 90.4,
		constantIndLight = 44.9,
		//icon pointer green/yellow/red
		thumbHSL = `${thumbPointer},${constantInd}%,${constantIndLight}%`;

	console.log(`pct------${pct}`)		
	console.log(`L------${L}`);
	console.log(`thumbPointer-------${thumbPointer}`);
	console.log(`thumbHSL-------${thumbHSL}`);


	// update the slider shade
	L.forEach((light,i) => {
		if (light < 0) 
			light = 0;
			body.style.setProperty(`--l${i + 1}`, `hsl(228,9.8%,${light}%)`);
		
	});
	// update the thumb icon green/yellow/red
	body.style.setProperty(`--p`,`hsl(${thumbHSL})`);
	body.style.setProperty(`--pT`,`hsla(${thumbHSL},0)`);
}