const express = require("express");
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { getItems, getItem, deleteItem, updateItem, createItem } = require('../controllers/storage');
const { validatorGetItem } = require("../validators/tracks");

/**
 * Get items list
 * @openapi
 * /storage:
 *      get:
 *          tags:
 *              - storage
 *          summary: "List of items"
 *          description: Get list of items
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              '200':
 *                  description: Return list of items
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: "#/components/schemas/storage"
 *              '422':
 *                  description: Validation error              
 * 
 */
router.get("/", getItems);

/**
 * Get detail from storage
 * @openapi
 * /storage/{id}:
 *      get:
 *          tags:
 *              - storage
 *          summary: "Detail Storage"
 *          description: Get detail stored
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *          - name: id
 *            in: path
 *            description: Storage ID to return
 *            required: true
 *            schema:
 *               type: string
 *          responses:
 *                  '200':
 *                      description: "Return objetc successfully"
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/components/schemas/storage'
 *                  '422':
 *                      description: "Validation error"
 * 
 * 
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Delete item from storage
 * @openapi
 * /storage/{id}:
 *      delete:
 *          tags:
 *              - storage
 *          summary: "Delete item"
 *          description: Delete item from storage
 *          security:
 *              bearerAuth: []
 *          parameters:
 *            - name: id
 *              in: path
 *              description: Storage ID to return
 *              required: true
 *              schema:
 *                  type: string
 *          responses:
 *              '201':
 *                  description: Return inserted object on the collection with status'201'
 *              '403':
 *                  description: Doesn't have permissions '403'                  
 *              
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Subir un archivo
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con stado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/", uploadMiddleware.single("myfile"), createItem)

module.exports = router;