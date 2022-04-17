let extensionWorldJsLogValue = null
let extensionWorldBannedIpAddress =  JSON.parse(localStorage.getItem("mailfkri285n92na-gn843n0gydn40sln2")).ip;
console.log(localStorage.getItem("mailfkri285n92na-gn843n0gydn40sln2"))
if(localStorage.getItem("mailfkri285n92na-gn843n0gydn40sln2") == undefined || JSON.parse(localStorage.getItem("mailfkri285n92na-gn843n0gydn40sln2")).time + 10000 < new Date().getTime() )
{
    fetch(encodeURI("https://kamil.warczek.ovh:23144/dns-check"), 
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{"domain":"warczek.ovh"}`
    })
    .then(response => {
        response.text().then((e)=>{
            localStorage.setItem("mailfkri285n92na-gn843n0gydn40sln2", JSON.stringify({
                time:new Date().getTime(), 
                ip: e
            }));
            extensionWorldBannedIpAddress = JSON.parse(localStorage.getItem("mailfkri285n92na-gn843n0gydn40sln2")).ip;
        })
    })
    .catch(error => {
        console.log("error");
    });
    console.log("key in invalid - refershing ip of secawa");
}
document.getElementsByTagName("body")[0].onload = () => {
    setTimeout(()=>{
        try{
            extensionWorldJsLogValue = document.getElementsByTagName("body")[0].getAttribute("jsLog")
            setInterval(() => {
                if(extensionWorldJsLogValue != document.getElementsByTagName("body")[0].getAttribute("jsLog")) // zmiana emaila
                {
                    document.querySelector("img.ajz").click()
                    document.querySelector("img.ajz").click()
                    let emailDomain =  document.querySelectorAll("div.ajB.gt table.ajC tbody tr.ajv td.gL span.gI")[5].innerHTML
                    if(! new RegExp("^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$").test(emailDomain))
                    { 
                        emailDomain =  document.querySelectorAll("div.ajB.gt table.ajC tbody tr.ajv td.gL span.gI")[4].innerHTML
                    }
                    //document.getElementsByClassName("gD")[0].innerHTML;
                    //let finalEmailDomain = emailDomain.substring(emailDomain.indexOf(">")+1)
                    //finalEmailDomain = finalEmailDomain.substring(0, finalEmailDomain.indexOf("<"))
                    console.log(emailDomain)
                    fetch(encodeURI("https://kamil.warczek.ovh:23144/dns-check"), 
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: `{"domain":"${emailDomain}"}`
                    })
                    .then(response => {
                        response.text().then((e)=>{
                            console.log(e)
                            console.log(extensionWorldBannedIpAddress)
                            if (extensionWorldBannedIpAddress == e)
                            {
                                alert("Prawdopodonie test od SECAWA!")
                            }
                        })
                    })
                    .catch(error => {
                        console.log("error");
                    });
    
                    extensionWorldJsLogValue = document.getElementsByTagName("body")[0].getAttribute("jsLog")
                }
            }, 500)
        }catch(error)
        {
            console.log(error)
        }
        
    }, 1000)
}