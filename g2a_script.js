const data = []
for (card of document.querySelector(".indexes__StyledList-wklrsw-191.indexes__StyledListDesktopGrid-wklrsw-192.iYEHRj.iECvsK").children) {
    const sel = card.querySelector("h3")
    if (sel != null && typeof sel.textContent == "string" && sel.textContent.match(/Steam Gift Card \d* TL ([\-]?)([\s]?)Steam Key (\-?)([\s]?)TURKEY/gm)) {
        const tl_prices = sel.textContent.match(/\d* TL/gm)
        if (tl_prices.length > 0) {   
            const tl_price = Number(tl_prices[0].replace(" TL", ""))
            const eur_prices = card.querySelector(".indexes__PriceCurrentBase-wklrsw-86.iPgINw").textContent.match(/[+-]?([0-9]*[.])?[0-9]+/gm)
            if (eur_prices.length > 0) {
                const eur_price = Number(eur_prices[0])
                const to_add_element = card.querySelector(".indexes__PriceCurrent-wklrsw-85.indexes__StyledPriceCurrent-wklrsw-123.hqNkFR.jYHyzM")
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