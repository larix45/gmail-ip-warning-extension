let extensionWorldJsLogValue = null

document.getElementsByTagName("body")[0].onload = () => {
    setTimeout(()=>{
        extensionWorldJsLogValue = document.getElementsByTagName("body")[0].getAttribute("jsLog")
        setInterval(() => {
            if(extensionWorldJsLogValue != document.getElementsByTagName("body")[0].getAttribute("jsLog")) // zmiana emaila
            {
                let emailDomain = document.getElementsByClassName("gD")[0].innerHTML;
                let finalEmailDomain = emailDomain.substring(emailDomain.indexOf("@")+1)
                finalEmailDomain = finalEmailDomain.substring(0, finalEmailDomain.indexOf("<"))
                console.log(finalEmailDomain)
                fetch(encodeURI("http://localhost:23144/dns-check"), 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: `{"domain":"${finalEmailDomain}"}`
                })
                .then(response => {
                    response.text().then((e)=>{
                        console.log(e)
                        if (e == '"52.29.128.240"')
                        {
                            console.log("SPAM")
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
    }, 1000)
}