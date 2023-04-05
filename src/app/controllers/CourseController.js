const Course = require('../models/Course');
const { multipleMongooseOnject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController{

    //[GET] /courses/:slug
    show(req,res,next) {

        Course.findOne({ slug: req.params.slug})
            .then((course) => {
                res.render('courses/show', course);
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save()
            .then(() => {
                res.redirect('/')
            })
            .catch(next => {
                res.send('ERROR')
            })
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next)
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.findByIdAndUpdate(req.params.id, req.body) 
            .then(() => res.redirect(`/me/stored/courses`))
            .catch(next)
    }

    //[DELETE] /courses/:id
    delete(req, res, next) {
        Course.findByIdAndDelete(req.params.id)
            .then(() => res.redirect(`back`))
            .catch(next)
    }

}

module.exports = new CourseController();