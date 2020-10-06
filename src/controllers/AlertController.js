const axios = require('axios');
require('dotenv/config');

const alert = (message) => {
    const msg = message;
    async function alert(msg){
        await axios.post(process.env.ROCKET_CHAT, {
            "alias":"Askozia Bot",
            "text":msg
            // "attachments":[{
                //     "title":"Rocket.Chat",
                //     "title_link":"https://rocket.chat",
                //     "text":"Rocket.Chat, the best open source chat",
                //     "image_url":"https://kinsta.com/pt/wp-content/uploads/sites/3/2019/07/encontrar-url-login-wordpress-1024x512.jpg",
                //     "color":"#764FA5"
                // }]
            }).then(function(response){
                console.log(`Send message ${msg} to rocket.chat`)
            }).catch(function(error){
                if(error){
                    // console.log(error)
                    console.log("Erro na mensagem rocket")
                }
            })
            await axios.post(process.env.DISCORD_BOT, {
                content: msg
            }).then(function(response){
                console.log(`Send message ${msg} to discord chat`)
            }).catch(function(error){
                if(error){
                    // console.log(error)
                    console.log("Erro na mensagem discord")
                }
            })
        }
        alert(msg);
        return console.log(`Send ${msg}`);
    }
        
module.exports = {
    alert
}    