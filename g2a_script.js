const base = "li[name^=\"Steam Gift Card\"]"
const price = "span[data-locator=zth-price]"
const lis = document.querySelectorAll(base)
const prices = document.querySelectorAll(base + " " + price)
let theVals = []
for (let i = 0; i<lis.length; i++) {
    const x = lis[i]
    const tl_prices = x.getAttribute("name").match(/\d* TL/gm)
    if (tl_prices.length > 0) {   
        const tl_price = Number(tl_prices[0].replace(" TL", ""))
        const eur_price = parseFloat(prices[i].textContent.replace("€ ", ""))
        const rate = (eur_price / tl_price).toFixed(3)
        theVals.push({element: prices[i].parentElement, rate})
        //console.log(tl_price, eur_price, rate)
    }
}


const max = Math.max(...theVals.map(v => v.rate))
const min = Math.min(...theVals.map(v => v.rate))
theVals.forEach(x => {
    x.element.classList.add("parentDiv")
	const rateEl = document.createElement("div")
    const label = document.createElement("span")
    const textComp = document.createElement("span")
    rateEl.classList.add("rate")
    label.textContent = "Rate: "
    label.classList.add("label")
    rateEl.appendChild(label)
    rateEl.appendChild(textComp)
    textComp.textContent = x.rate
    textComp.classList.add("rate")
    if (x.rate == max) {
		textComp.classList.add("rmax")
	}
	if (x.rate == min) {
		textComp.classList.add("rmin")
	}
	x.element.appendChild(rateEl)
})