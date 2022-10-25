var allText = Array.from(document.querySelectorAll("[class^=project-info]"))
var cards = Array.from(document.querySelectorAll(".card"))

cards.forEach((c, i) => {
	console.log("height: ", i, ": ", c.clientHeight)
})

allText.forEach((p, index) => {
	console.log(index, ": ", p.innerHTML.length)
	if (p.innerHTML.length > 300) {
		insertCollapseButton(index)
	}
});

function insertCollapseButton(index) {
	allText[index].innerHTML = [allText[index].innerHTML.slice(0,225), '<span class="dots-'+index+'">... </span><span class="more-'+index+'">', allText[index].innerHTML.slice(225), '</span> <button class="readBtn" id="myBtn-'+index+'">Read more</button>'].join('')
}

var dots = Array.from(document.querySelectorAll("[class^=dots]"));
var moreText = Array.from(document.querySelectorAll("[class^=more]"));
var btnText = Array.from(document.querySelectorAll(".readBtn"));

btnText.forEach((btn, index) => {
	console.log("BTN: ", btn)
	btn.addEventListener("click", showHide)
});

function showHide(e) {
	console.log("E: ", e.target.id.split("-")[1])
	console.log("DOTS: ", dots)
	console.log("DOTS[0]: ", dots[0].classList)
	console.log("TEXT: ", moreText)
	
	dot = dots.filter(d => d.classList.value.split("-")[1] == e.target.id.split("-")[1])[0];
	text = moreText.filter(t => t.classList.value.split("-")[1] == e.target.id.split("-")[1])[0];
	
	console.log("DOT: ", dot)
	console.log("TEXT: ", text)

	if (dot.style.display === "none") {
		dot.style.display = "inline";
		this.innerHTML = "Read more";
		text.style.display = "none";
	} else {
		dot.style.display = "none";
		this.innerHTML = "Read less";
		text.style.display = "inline";
	}
}

