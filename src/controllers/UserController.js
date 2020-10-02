const getUsers = require('request');
require('dotenv/config');


module.exports = {
    async getUsers(request, response){
        // const product = await Product.findByIdAndRemove(request.params.id);
        // return response.status(200).send('removed');
        await getUsers(process.env.ASKOZIA_GET_ALL_EXTENSIONS, function (error, res, body) {  
            allUsers = JSON.parse(body)
            if (!error && response.statusCode == 200) {
                return response.json(allUsers);
            } else {
                return
            }
        })
    }
}