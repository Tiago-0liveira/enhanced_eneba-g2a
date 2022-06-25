const data = []
for (card of document.querySelectorAll("ul[class*=indexes__StyledList] li[class*=indexes__ProductCardStyledWrapper]")) {
    const sel = card.querySelector("h3")
    if (sel != null && typeof sel.textContent == "string" && sel.textContent.match(/\d+ TL/gm)) {
        const tl_prices = sel.textContent.match(/\d* TL/gm)
        if (tl_prices.length > 0) {   
            const tl_price = Number(tl_prices[0].replace(" TL", ""))
            if (card.children != undefined && card.children.length > 0) {
                const eur_prices = card.children[1].querySelector("div > div > span > span").textContent.match(/[+-]?([0-9]*[.])?[0-9]+/gm)
                if (eur_prices.length > 0) {
                    const eur_price = Number(eur_prices[0])
                    const to_add_element = card.children[1].querySelector("div > div > span")
                    const rate_el = document.createElement("span")
                    rate_el.style.paddingLeft = "6px"
                    rate_el.style.color = "grey"
                    rate_el.style.fontFamily = "monospace"
                    rate_el.style.fontSize = "13px"
    
                    const rate = (eur_price/tl_price).toFixed(3)
                    rate_el.textContent = "Rate: "
                    const rate_span = document.createElement("span")
                    rate_span.style.fontSize = "18px"
                    rate_span.style.fontWeight = "bold"
                    rate_span.textContent = rate
                    rate_el.appendChild(rate_span)
                    to_add_element.appendChild(rate_el)
                    data.push({
                        rate,
                        rate_span
                    })
    
                }
            }
        }
    }
}
console.log(`data -> `, data)
const min = Math.min(...data.map(d => d.rate))
const max = Math.max(...data.map(d => d.rate))

data.forEach(e => {
	console.log(e)
	if (min == e.rate) {
		e.rate_span.style.color = "#5DDB00"
	} else if (max == e.rate) {
		e.rate_span.style.color = "#E70000"
	}
})