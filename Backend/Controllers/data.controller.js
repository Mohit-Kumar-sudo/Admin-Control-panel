const createError = require('http-errors')
const mongoose = require('mongoose')
const ModelName = 'Content'
const axios = require('axios');

module.exports = {

    getDeedCategory: async (req, res, next) => {
        try {
            axios.get('http://20.204.184.35/sampadaService/common/duty/allDeedCategory', {
                params: {}
            })
                .then(function (response) {
                    const deedCategory = response.data.responseData;
                    if (deedCategory) {
                        res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    next(error)
                })
        } catch (error) {
            next(error)
        }
    },

    getAllDeedTypeByCategoryId: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            axios.get(`http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/${id}`, {
            })
                .then(function (response) {
                    const deedCategory = response.data;
                    if (deedCategory) {
                        res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    next(error)
                })
        } catch (error) {
            next(error)
        }
    },

    deedInstruments: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            axios.get(`http://20.204.184.35/sampadaService/common/duty/deedInstruments/${id}`, {
            })
                .then(function (response) {
                    const deedCategory = response.data;
                    if (deedCategory) {
                        res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    next(error)
                })
        } catch (error) {
            next(error)
        }
    },

    partyRoles: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            axios.get(`http://20.204.184.35/sampadaService/common/duty/getAllPartyTypeByInstrumentId/${id}`, {
            })
                .then(function (response) {
                    const roles = response.data.responseData;
                    if (roles.length) {
                        res.send({ success: true, msg: 'Detail Fetched', data: roles })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    next(error)
                })
        } catch (error) {
            next(error)
        }
    }
  

}




// // All Deed Category: http://20.204.184.35/sampadaService/common/duty/allDeedCategory

// // Deed Types by Category Id: http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/{deedCategoryId}

// // Deed Instruments by Deed type Id: http://20.204.184.35/sampadaService/common/duty/deedInstruments/{deedTypeId}

// // Party Type: http://20.204.184.35/sampadaService/common/duty/getAllPartyTypeByInstrumentId/{instrumentId}