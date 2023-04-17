const createError = require('http-errors')
const axios = require('axios')

module.exports = {

    getDeedCategory: async(req, res, next) => {
        try {
            const deedCategory = await  axios.get(`http://20.204.184.35/sampadaService/common/duty/allDeedCategory`)
            if (deedCategory) {
                res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }
        } catch (error) {
            next(error)
        }
    },

    getDeedTypes: async(req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            const result = await axios.get(`http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/${id}`)
            if (result) {
                res.send({ success: true, msg: 'Detail Fetched', data: result })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    },

    getInstrument: async(req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            const result = await axios.get(`http://20.204.184.35/sampadaService/common/duty/deedInstruments/${id}`)
            if (result) {
                res.send({ success: true, msg: 'Detail Fetched', data: result })
            } else {
                res.send({ success: false, msg: 'Failed to Fetch Detail' })
            }
        } catch (error) {
            if (error.isJoi === true)
                return next(createError.BadRequest('Bad Request'))
            next(error)
        }
    }
}


// All Deed Category: http://20.204.184.35/sampadaService/common/duty/allDeedCategory

// Deed Types by Category Id: http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/{deedCategoryId}

// Deed Instruments by Deed type Id: http://20.204.184.35/sampadaService/common/duty/deedInstruments/{deedTypeId}