// ==UserScript==
// @name         Check Zoom Release Notes For Recent Updates
// @namespace    http://github.com/tidusx18
// @version      0.0.1
// @description
// @author       Daniel Victoriano <victoriano518@gmail.com>
// @match        https://support.zoom.us/hc/en-us/sections/*Release-Notes
// @run-at       default
// @updateURL    https://github.com/tidusx18/zoom-release-notes/raw/master/CheckZoomReleaseNotes.user.js
// @noframes
// @grant        none
// ==/UserScript==

(function() {

urls = [
'https://support.zoom.us/hc/en-us/articles/201361953-New-Updates-for-Windows',
'https://support.zoom.us/hc/en-us/articles/201361963-New-Updates-for-macOS',
'https://support.zoom.us/hc/en-us/articles/201361943-New-Updates-for-iOS',
'https://support.zoom.us/hc/en-us/articles/201361973-New-Updates-for-Android',
'https://support.zoom.us/hc/en-us/articles/200943489-New-Updates-for-Zoom-Rooms',
'https://support.zoom.us/hc/en-us/articles/115002847183-New-Updates-for-Zoom-Rooms-for-macOS',
'https://support.zoom.us/hc/en-us/articles/115002847143-New-Updates-for-Zoom-Rooms-for-PC',
'https://support.zoom.us/hc/en-us/articles/360001308226-New-Updates-for-Zoom-Rooms-for-Chrome-OS',
'https://support.zoom.us/hc/en-us/articles/115002873466-New-Updates-for-Zoom-Rooms-iPad-Controller',
'https://support.zoom.us/hc/en-us/articles/115002873526-New-Updates-for-Zoom-Rooms-Android-Controller',
'https://support.zoom.us/hc/en-us/articles/115005479026-New-Updates-for-Zoom-Rooms-Windows-Controller',
'https://support.zoom.us/hc/en-us/articles/204758419-New-Updates-for-Web',
'https://support.zoom.us/hc/en-us/articles/205759689-New-Updates-for-Linux',
'https://support.zoom.us/hc/en-us/articles/115005440303-New-Updates-for-Outlook-Web-Add-in-',
'https://support.zoom.us/hc/en-us/articles/203254295-New-Updates-for-Outlook-Plugin',
'https://support.zoom.us/hc/en-us/articles/201361983-New-Updates-for-Cloud-Room-Connector-CRC-',
'https://support.zoom.us/hc/en-us/articles/115002568443-New-Updates-for-Zoom-Connector-for-Cisco-Polycom',
'https://support.zoom.us/hc/en-us/articles/360022782511-New-Updates-For-Zoom-Phone',
'https://support.zoom.us/hc/en-us/articles/115001620786-New-Updates-for-Chrome-OS',
'https://support.zoom.us/hc/en-us/articles/360001321523-New-Updates-for-Cloud',
'https://support.zoom.us/hc/en-us/articles/360031019531-New-Updates-for-Android-for-Intune',
'https://support.zoom.us/hc/en-us/articles/360032585272-New-Updates-for-iOS-for-InTune',
'https://support.zoom.us/hc/en-us/articles/360031020331-New-Updates-for-Zoom-for-Blackberry-UEM-for-iOS',
'https://support.zoom.us/hc/en-us/articles/360030675272-New-Updates-for-Zoom-for-Blackberry-UEM-for-Android',
'https://support.zoom.us/hc/en-us/articles/115002706343-New-Updates-for-Zoom-Scheduler-for-Chrome',
'https://support.zoom.us/hc/en-us/articles/115003471146-New-Updates-for-IBM-Notes-Plugin',
'https://support.zoom.us/hc/en-us/articles/115005531123-New-updates-for-Zoom-Scheduler-for-Firefox',
'https://support.zoom.us/hc/en-us/articles/204488669-New-Updates-for-Skype-for-Business-Plugin-Lync-Plugin-',
'https://support.zoom.us/hc/en-us/articles/115003241506-New-Updates-for-Virtual-Room-Connector-VRC-',
'https://support.zoom.us/hc/en-us/articles/201361993-New-Updates-for-Meeting-Connector',
'https://support.zoom.us/hc/en-us/articles/210313143-New-Updates-for-Recording-Connector',
'https://support.zoom.us/hc/en-us/articles/115003145366-New-Updates-for-Zoom-For-Salesforce',
'https://support.zoom.us/hc/en-us/articles/115003492886-New-Updates-for-AD-Sync-Tool',
'https://support.zoom.us/hc/en-us/articles/360031768011-New-Updates-for-Virtual-Desktop-Infrastructure-VDI-'
]

function checkForUpdate(url) {
	fetch(url)
	    .then(res => res.text())
	    .then(text => {
	        parser = new DOMParser()
	        htmlDocument = parser.parseFromString(text, "text/html")
	        pageText = htmlDocument.documentElement.querySelector(".article-body").innerText
	        today = Date.now()
	        lastReleaseDate = pageText.match(/current.release\n*(.*, 20\d{2})/i)
	        try {
	        	lastReleaseDate = Date.parse(lastReleaseDate[1]) }
	        	catch(err) {
	        		console.log('no date match ', url)
	        	}
	        elapsed = today - lastReleaseDate
	        Math.floor(elapsed / 1000 / 60 / 60 / 24) < 7 // less than X number of days
	        	? console.log(`Release notes updated recently: ${url}`)
	        	: null
	    })
}

for (url of urls) {
	checkForUpdate(url)
}

})();