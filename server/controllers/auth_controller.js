const users = require('../models/users');

let id = 0;

module.exports = {
    login: (req, res, next) => {
        if (req.body.username === users.username && req.body.password === users.password){
            req.session.user.username = users.username 
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send({ message: 'An error occurred.' });
        }
    },

    register: (req, res, next) => {
        users.push(id, req.body.username, req.body.password);
        id++;
        req.session.user.username = req.body.username;
        console.log(req.session.user);
        res.status(200).send(req.session.user);
    },

    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user);
    }
}