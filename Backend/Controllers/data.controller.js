const createError = require('http-errors')
const mongoose = require('mongoose')
const ModelName = 'Content'
const axios = require('axios');
const multer  = require('multer')
const upload = multer().single("file");

module.exports = {

    getDeedCategory: async (req, res, next) => {
        try {
            axios.get('https://ersuat2.mp.gov.in/sampadaService/common/duty/allDeedCategory', {
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
            axios.get(`https://ersuat2.mp.gov.in/sampadaService/common/duty/getAllDeedTypeByCategoryId/${id}`, {
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
            axios.get(`https://ersuat2.mp.gov.in/sampadaService/common/duty/deedInstruments/${id}`, {
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
            axios.get(`https://ersuat2.mp.gov.in/sampadaService/common/duty/getAllPartyTypeByInstrumentId/${id}`, {
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
    },

    userAuthenticate: async (req, res, next) => {
        try {
            upload(req, res, function (err) {
                if (err) {
                    return res.status(501).json({ error: err })
                }
                const data = req.body
                if (data) {
                    if (data.userType == "department") {
                        res.redirect('http://20.198.103.152/admin');
                        res.send({ success: true, message: "Good to go" })
                    } else {
                        res.send({ success: false, message: "This user is not Authorised" })
                    }
                }
            })
        } catch (error) {
            next(error)
        }
    }
}




// All Deed Category: https://ersuat2.mp.gov.in/sampadaService/common/duty/allDeedCategory

// Deed Types by Category Id: https://ersuat2.mp.gov.in/sampadaService/common/duty/getAllDeedTypeByCategoryId/{deedCategoryId}

// Deed Instruments by Deed type Id: https://ersuat2.mp.gov.in/sampadaService/common/duty/deedInstruments/{deedTypeId}

// Party Type: https://ersuat2.mp.gov.in/sampadaService/common/duty/getAllPartyTypeByInstrumentId/{instrumentId}

// Token Verify http://20.204.184.35/sampadaGateway/department/get_department_user_profile