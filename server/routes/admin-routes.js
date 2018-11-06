const util = require('../utils');
const router = require('express').Router();
const User = require("../models/user-models");
const Team = require("../models/team-models");
const Admin = require("../models/admin-models");
const passport = require("passport");
const levelRestrict = require("../configs/admin-leveling");

router.post('/upsertRoles', passport.authenticate('jwt', {
    session: false
}), levelRestrict.userLevel, (req, res) => {
    Admin.findOne({ adminId: req.body.id }).then((foundAdmin) => {
        if (foundAdmin) {
            var props = Object.keys(req.body);
            props.forEach(function(prop) {
                foundAdmin[prop] = req.body[prop];
            });
            foundAdmin.save().then((savedAdmin) => {
                res.status(200).send({ "message": "Admin saved", admin: savedAdmin });
            }, (err) => {
                res.status(500).send({ "message": "Error saving admin.", "err": err });
            });
        } else {
            new Admin(req.body).save().then((newAdmin) => {
                res.status(200).send({
                    "message": "Admin created",
                    admin: newAdmin
                });
            }, (err) => {
                res.status(500).send({
                    "message": "Error creating admin",
                    "err": err
                })
            })
        }
    }, (err) => {
        res.status(500).send({ "message": "Error finding admin" });
    })
});

module.exports = router;