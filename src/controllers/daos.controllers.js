

import { type } from '../utils/minimist.util.js';

import DaoFactory from '../daos/dao.factory.js';

// Crear una instancia del Singleton a traves de la Factory
// El tipo de persistencia (type) le viene de la linea de comandos en package.json a traves de minimist
let dao = new DaoFactory(type);

// Los controllers son los mismos para todas las formas de persistencia
// con lo cual si se cambia la persistencia no es necesario refactorizarlos
// solo hay que agregar un nuevo Singleton.

export const getItems = async (req, res) => {

  try {
    // Para que los controllers funcionen, los metodos del DAO deben tener el mismo nombre en todos los DAOs
    // En este caso: getAll(), getById(), deleteById(), updateById(), etc.

    const items = await dao.getAll()
    if (items) res.status(200).send(items)
    else throw {error: 'Items not found'}

  } catch (err) { res.status(400).send(err) }
}

export const getItemById = async (req, res) => {

  const { id } = req.params;

  try {
  
    const item = await dao.getById(id)
    if (item) res.status(200).send(item)
    else throw {error: 'Item not found'}

  } catch (err) { res.status(400).send(err) }
}

export const deleteItem = async (req, res) => {

  const { id } = req.params;

  try {
  
    const deleted = await dao.deleteById(id)
    if (deleted) res.status(200).send(deleted)
    else throw {error: 'Item not found'}

  } catch (err) { res.status(400).send(err) }
}

export const updateItem = async (req, res) => {

  const { body, params: {id} } = req;

  try {
  
    const updated = await dao.updateById(id, body)
    if (updated) res.status(200).send(updated)
    else throw {error: 'Item not found'}

  } catch (err) { res.status(400).send(err) }
}

export const saveItem = async (req, res) => {

  const { body } = req;

  try {
    
    const newItem = await dao.saveNewItem(body)
    if (newItem) res.status(200).send(newItem)
    else throw {error: 'Error saving item'}

  } catch (err) { res.status(400).send(err) }
}
