const app = { 
    messagesZone: document.querySelector('.messagesFeed'),
    inputZone : document.querySelector('.inputZone'),
    btnSendMessage : document.querySelector('.sendMessage'),

    otherMessageClone : document.querySelector('#otherMessage'),
    
    init() {
        API.btnSendMessage.addEventListener('click', API.sendMessageToAPI);
        API.getAllMessagesAPI();
    },

    refreshMessages () {
        
    },

    makeMessageInDom (json, position) {
        const messageTemplate= document.querySelector('#message');
        const yourMessageClone = document.importNode;(messageTemplate.contains, true);
        if (json.position === "yourMessage") {
            yourMessageClone.classlist.add = "yourMessage"
        } else {
            yourMessageClone.classlist.add = "otherMessage" 
        }
        yourMessageClone.dataset.id = json.id;
        yourMessageClone.querySelector('[slot="author"]').content = json.author;
        yourMessageClone.querySelector('[slot="content"]').content = json.content;
    }
}

const API = {
    async getAllMessagesAPI() {
        try {
            const rep = await fetch(
			`https://pierrofeu.alwaysdata.net/api/message`,
			// 'http://localhost:3000/api/message',
            )
            const json = rep.json()
            if (!rep.ok) {
                throw json
            }
            return json
        } catch (error) {
            console.log(error);
            return error
        }
    }, 

    async sendMessageToAPI(json) {
        try {
            const rep = await fetch(
                `https://pierrofeu.alwaysdata.net/api/message`,
                // 'http://localhost:3000/api/message', 
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                      },
                    body: json
                }
            )
        } catch (error) {
            console.log(error);
            return error
        }
    }


}