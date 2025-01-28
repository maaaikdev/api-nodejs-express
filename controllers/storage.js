const fs = require('fs')
const { storageModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`
/**
 * Get Data Base List
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async (req, res) => {
    try{
        const data = await storageModel.find({});
        res.send({data})
    }catch(e){
        handleHttpError(res, 'ERROR_GET_ITEMS_STORAGE')
    }
};

/**
 * Get a register
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);
        res.send({data})
    } catch(e) {
        handleHttpError(res, 'ERROR_GET_ITEM_STORAGE')
    }
};

/**
 * Insert a register
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try{
        const { body, file } = req;
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData);
        res.send({ data });
    }catch(e){
        handleHttpError(res, 'ERROR_CREATE_ITEM_STORAGE')
    }
};

/**
 * Delete a register
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        try {
            const { id } = matchedData(req);
            const data = await storageModel.findById(id);
            await storageModel.delete({_id: id}); //SOFT DELETE
            //await storageModel.deleteOne(id); //HARD DELETE
            const { filename } = data;
            const filePath = `${MEDIA_PATH}/${filename}`;
            // unlinkSync() delete physical record
            //fs.unlinkSync(filePath);
            const dataFIle = {
                filePath,
                deleted: 1
            }
            res.send({dataFIle})
        } catch(e) {
            handleHttpError(res, 'ERROR_GET_ITEM_STORAGE')
        }
    } catch(e) {

    }
};

module.exports = { getItems, getItem, createItem, deleteItem  };