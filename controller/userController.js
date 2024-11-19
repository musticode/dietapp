const database = require('mongoose');
const userModel = require('/model/User')


const users = [
    {name : 'test', description :'aa'},
    {name : 'test2', description :'aa'},
    {name : 'test3', description :'aa'}
];

async function getUsers(req, res){
    try {
        //const users = await database.getUsers();
        const userArr = users;
        res.json(userArr);
    }catch (e) {
        res.status(500).send('Interval server error');
    }
}


async function getUserById(req, res){
    try {
        const user = userModel.findById(req.params.id);
    }catch (e) {
        console.log(`Error with username : ${users.id}`);
    }

}


module.exports = {
    getUsers,
}