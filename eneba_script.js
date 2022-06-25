function getVals() {
	let vals = []
	for (w of document.querySelectorAll(".pFaGHa.WpvaUk")) {
		const title = w.children[0].querySelector("div.tUUnLz div.x4MuJo div.lirayz span").textContent
		let regex = title.match(/\d{1,4} TRY/gm)
		if (regex) {
			const priceEur = parseFloat(w.children[1].querySelector("a.oSVLlh div.Lyw0wM span.DTv7Ag span.L5ErLT").textContent.replace("€","").replace(",", "."))
			const priceTRY = regex[0].replace(" TRY", "")
			const rate = (priceEur/priceTRY).toFixed(3)
			const element = w.children[1].querySelector("a.oSVLlh div.Lyw0wM div.iqjN1x")
			vals.push({element, rate})
		}
	}
	return vals;
}

const theVals = getVals()
const max = Math.max(...theVals.map(v => v.rate))
const min = Math.min(...theVals.map(v => v.rate))
theVals.forEach(x => {
	if (x.rate == max) {
		x.element.classList.add("rmax")
	}
	if (x.rate == min) {
		x.element.classList.add("rmin")
	}
	x.element.textContent = ""
	x.element.appendChild(document.createTextNode("Rate: "))
	const rateEl = document.createElement("span")
	rateEl.classList.add("rate")
	rateEl.textContent = x.rate
	x.element.appendChild(rateEl)
})