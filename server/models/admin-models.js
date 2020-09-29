const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    "adminId": String,
    "LOGS": Boolean,
    "TEAM": Boolean,
    "USER": Boolean,
    "DIVISION": Boolean,
    "STANDINGS": Boolean,
    "TOURNAMENT": Boolean,
    "CASTER": Boolean,
    "MATCH": Boolean,
    "ACL": Boolean,
    "SCHEDULEGEN": Boolean,
    "EVENTS": Boolean
        //more as needed
});

const pendingMemberNotes = new Schema({
    "id": String,
    "note": String,
    "timeStamp": Number
});

const pendingMembersSchema = new Schema({
    "teamId": String,
    "teamName": String,
    "userId": String,
    "userName": String,
    "timestamp": Date,
    "notes": [pendingMemberNotes]
});

const pendingAvatarSchema = new Schema({
    'userId': String,
    'displayName': String,
    'fileName': String,
    'timestamp': Date
});


const pendingRankSchema = new Schema({
    'userId': String,
    "year": String,
    "season": String,
    'fileName': String,
    'timestamp': Date
});

const Admin = mongoose.model('admin', adminSchema);
const PendingQueue = mongoose.model('pendingQueue', pendingMembersSchema);
const PendingAvatarQueue = mongoose.model('pendingAvatarQueue', pendingAvatarSchema);
const PendingRankQueue = mongoose.model('pendingRankQueue', pendingRankSchema);

module.exports = {
    AdminLevel: Admin,
    PendingQueue: PendingQueue,
    PendingAvatarQueue: PendingAvatarQueue,
    PendingRankQueue: PendingRankQueue
};