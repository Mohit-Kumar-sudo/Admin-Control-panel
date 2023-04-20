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
                    console.log(error)
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
            axios.get('http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/', {
                params: {
                    deedCategoryId:id
                }
            })
                .then(function (response) {
                    const deedCategory = response.data.responseData;
                    if (deedCategory) {
                        res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    console.log(error)
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
            axios.get('http://20.204.184.35/sampadaService/common/duty/deedInstruments/', {
                params: {
                    deedTypeId:id
                }
            })
                .then(function (response) {
                    const deedCategory = response.data.responseData;
                    if (deedCategory) {
                        res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
                    } else {
                        res.send({ success: false, msg: 'Failed to Fetch Detail' })
                    }
                }, error => {
                    console.log(error)
                })
        } catch (error) {
            next(error)
        }
    },
  

}



// const createError = require('http-errors')

// module.exports = {

//     getDeedCategory: async(req, res, next) => {
//         try {
//             console.log("Hello World")
//             // const deedCategory = await  axios.get(`http://20.204.184.35/sampadaService/common/duty/allDeedCategory`)
//             const deedCategory = 'Hello World'
//             if (deedCategory) {
//                 res.send({ success: true, msg: 'Detail Fetched', data: deedCategory })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Detail' })
//             }
//         } catch (error) {
//             next(error)
//         }
//     },

//     getDeedTypes: async(req, res, next) => {
//         try {
//             const { id } = req.params
//             if (!id) {
//                 throw createError.BadRequest('Invalid Parameters')
//             }
//             const result = await axios.get(`http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/${id}`)
//             if (result) {
//                 res.send({ success: true, msg: 'Detail Fetched', data: result })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Detail' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     },

//     getInstrument: async(req, res, next) => {
//         try {
//             const { id } = req.params
//             if (!id) {
//                 throw createError.BadRequest('Invalid Parameters')
//             }
//             const result = await axios.get(`http://20.204.184.35/sampadaService/common/duty/deedInstruments/${id}`)
//             if (result) {
//                 res.send({ success: true, msg: 'Detail Fetched', data: result })
//             } else {
//                 res.send({ success: false, msg: 'Failed to Fetch Detail' })
//             }
//         } catch (error) {
//             if (error.isJoi === true)
//                 return next(createError.BadRequest('Bad Request'))
//             next(error)
//         }
//     }
// }


// // All Deed Category: http://20.204.184.35/sampadaService/common/duty/allDeedCategory

// // Deed Types by Category Id: http://20.204.184.35/sampadaService/common/duty/getAllDeedTypeByCategoryId/{deedCategoryId}

// // Deed Instruments by Deed type Id: http://20.204.184.35/sampadaService/common/duty/deedInstruments/{deedTypeId}