const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, maxLength: 255, required: true},
    decription: {type: String, maxLength: 600},
    image: {type: String, maxLength: 255},
    videoId: {type: String, required: true},
    level: {type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true }
}, {
    timestamps: true,
});

//add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
});

module.exports = mongoose.model('Course', Course);