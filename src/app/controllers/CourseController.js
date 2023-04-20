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
                res.redirect('/me/stored/courses')
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
        Course.deleteById(req.params.id)
            .then(() => res.redirect(`back`))
            .catch(next)
    }

    //[PATCH] /:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect(`back`))
            .catch(next)
    }

    //[DELETE] /:id/destroy
    destroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    //[GET] /
    default(req,res, next) {
        res.redirect('/me/stored/courses')
    }

    //[POST] /courses/handle-form-handle
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.deleteById({ $in: req.body.courseIds })
                    .then(() => res.redirect(`back`))
                    .catch(next)

                break;
            case 'restore':
                Course.restore({ $in: req.body.courseIds })
                    .then(() => res.redirect(`back`))
                    .catch(next)

                break;
            case 'destroy':
                Course.deleteOne({ $in: req.body.courseIds })
                    .then(() => res.redirect('back'))
                    .catch(next)

                break;
            default: 
                res.json({message: 'Action invalid'})
        }
    }
}

module.exports = new CourseController();