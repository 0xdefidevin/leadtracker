let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")
const exportBtn = document.getElementById("csv-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputEl.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        inputBtn.click();
    }
})

exportBtn.addEventListener("click", function(){    
    //export to csv
    let csvContent = "data:text/csv;charset=utf-8,"

    for (let i=0; i<myLeads.length; i++){
        csvContent += myLeads[i] + "\r\n";
    }

    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    render(myLeads)
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
} 

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function isValidUrl() {
    if (inputEl.value.indexOf('.com') > -1 || inputEl.value.indexOf('www.') > -1 || inputEl.value.indexOf('.io') > -1 || inputEl.value.indexOf('https') > -1) {
        return true
    }
  }

inputBtn.addEventListener("click", function() {
    if (inputEl.value != ""){
        if (isValidUrl()){
            myLeads.push(inputEl.value)
            inputEl.value = ""
            localStorage.setItem("myLeads", JSON.stringify(myLeads) )
            render(myLeads)
        }
    }
})