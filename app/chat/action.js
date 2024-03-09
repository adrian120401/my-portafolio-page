export const sendMessage = async(conversationId, token, text, id) => {
    const data = {
        "locale": "en-EN",
        "type": "message",
        "from": {
            "id": id
        },
        "text": text
    }

    await fetch(`https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
    {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export const listener = (streamUrl, callbackMessage) => {

    const webSocket = new WebSocket(streamUrl)

    webSocket.onopen = () => {
        console.log('Established connection');
    }

    webSocket.onmessage = (event) => {
        if(event.data !== ''){
            const data = JSON.parse(event.data)
            const activities = data.activities[0]
            let text = activities.text
            if(activities.attachments){
                text = activities.attachments[0].content.text
            }
            const id = activities.id
            const owner = activities.from.id == 'adrian-bot-bot' ? 'bot' : 'user'
            if(!activities.inputHint){
                callbackMessage({text, id, owner})
            }
        }
    }

    webSocket.onclose = () => {
        console.log('Closed connection')
    }

    return webSocket
}