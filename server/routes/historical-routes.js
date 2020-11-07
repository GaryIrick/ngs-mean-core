const utils = require('../utils');
const router = require('express').Router();
const Archive = require('../models/system-models').archive;
const Schedule = require('../models/schedule-models');
const {
    commonResponseHandler
} = require('./../commonResponseHandler');

router.get('/seasons', (req, res) => {

    commonResponseHandler(req, res, [], [], async(req, res) => {
        const response = {};
        const path = '/history/seasons';
        let query = {
            type: {
                $exists: false
            }
        }
        return Schedule.find(query).then(
            found => {
                response.status = 200;
                response.message = utils.returnMessaging(req.originalUrl, 'Found seasons:', false, found)
                return response;
            },
            err => {
                response.status = 500;
                response.message = utils.returnMessaging(req.originalUrl, 'Error finding seasons:', err)
                return response;
            }
        );
    })

});

router.get('/season/divisions', (req, res) => {

    const path = '/history/season/divisions';

    const requiredParameters = [{
        name: 'season',
        type: 'number'
    }]

    commonResponseHandler(req, res, requiredParameters, [], async(req, res, requiredParameters) => {
        const response = {};

        let season = requiredParameters.season.value;
        let query = {
            season: season,
            type: 'division'
        };
        return Archive.find(query).then(
            found => {
                response.status = 200;
                response.message = utils.returnMessaging(req.originalUrl, 'Found divisions for season ' + season + ':', false, found)
                return response;
            },
            err => {
                response.status = 500;
                response.message = utils.returnMessaging(req.originalUrl, 'Error finding divisions:', err);
                return response;
            }
        );

    })

});

router.get('/season/division', (req, res) => {

    const path = '/history/season/division';

    const requiredParameters = [{
        name: 'season',
        type: 'number'
    }]

    commonResponseHandler(req, res, requiredParameters, [], async(req, res, requiredParameters) => {
        const response = {};

        let season = requiredParameters.season.value;
        let query = {
            '$and': [{
                season: season
            }, {
                type: 'division'
            }]
        };
        return Archive.find(query).then(
            found => {
                response.status = 200;
                response.message = utils.returnMessaging(req.originalUrl, 'Found division for season ' + season + ':', false, found);
                return response;
            },
            err => {
                response.status = 500;
                response.message = utils.returnMessaging(req.originalUrl, 'Error finding division:', err)
                return response;
            }
        );

    })

});

router.post('/season/teams', (req, res) => {

    const path = '/history/season/teams';

    const requiredParameters = [{
        name: 'season',
        type: 'number'
    }, {
        name: 'teams',
        type: 'array'
    }]

    commonResponseHandler(req, res, requiredParameters, [], async(req, res, requiredParameters) => {
        const response = {};

        let season = requiredParameters.season.value;
        let teams = requiredParameters.teams.value;

        let query = {
            '$and': [{
                    season: season
                },
                {
                    type: 'team'
                },
                {
                    'object.teamName': {
                        $in: teams
                    }
                }
            ]
        };


        return Archive.find(query).then(
            found => {
                response.status = 200;
                response.message = utils.returnMessaging(req.originalUrl, 'Found ' + found.length + ' of ' + teams.length + ' teams for season ' + season + ':', false, found);
                return response;
            },
            err => {
                response.status = 500;
                response.message = utils.returnMessaging(req.originalUrl, 'Error finding teams:', err);
                return response
            }
        );
    });

});

module.exports = router;