chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		let eneba_mat = tab.url.match(/https:\/\/www\.eneba\.com\/*.*/gm)
		let g2a_mat = tab.url.match(/https:\/\/www\.g2a\.com\/*.*/gm)
		if (eneba_mat != null && eneba_mat.length > 0) {
			chrome.scripting.executeScript({
				target: {tabId: tabId},
				files: ["eneba_script.js"],
			},	
			() => { 
				console.log("script executed")
			});
			chrome.scripting.insertCSS({
				target: {tabId: tabId},
				files: ["eneba_style.css"],
			})
		} else if (g2a_mat != null && g2a_mat.length > 0) {
			chrome.scripting.executeScript({
				target: {tabId: tabId},
				files: ["g2a_script.js"],
			},	
			() => { 
				console.log("script executed")
			});
			chrome.scripting.insertCSS({
				target: {tabId: tabId},
				files: ["g2a_style.css"],
			})
		}
	}
})


