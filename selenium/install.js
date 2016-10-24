const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const selenium = require('selenium-download')

// Download Selenium server and Chromedriver
selenium.ensure(__dirname, error => {
    if (error) {
        console.error(error.stack)
    } else {
    	// Rename so that we don't need to update paths in project configs
        const oldSeleniumPath = path.join(__dirname, 'selenium.jar')
        const newSeleniumPath = path.join(__dirname, 'selenium-server.jar')
        
        fs.rename(oldSeleniumPath, newSeleniumPath, error => {
            if (error) console.log(error)
            return
        })

        mkdirp(path.join(__dirname, 'drivers'))
        const oldChromedriverPath = path.join(__dirname, 'chromedriver')
        const newChromedriverPath = path.join(__dirname, 'drivers', 'chromedriver')

        fs.rename(oldChromedriverPath, newChromedriverPath, error => {
            if (error) console.log(error)
            return
        })
    }
})
