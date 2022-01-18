

import SingletonDaoMemory from './singleton.memory.js';
import SingletonDaoFS from './singleton.fs.js';
import SingletonDaoMongo from './singleton.dao.mongo.js';

import { mongoConnect } from '../db.js';

import { productsArray } from '../data/item.js';
import { productModel } from '../models/product.model.js';
const productsFile = './src/data/items.json';


class DaoFactory {

  // Es más directo usar el contructor de la Factory para crear el Singleton.
  // De esta forma no es necesario llamar a un método dentro de la clase para crear una instancia
  // Al instanciar DaoFactory uno de los tres Singletons es instanciado 
  // según el parámetro que se le pase al constructor.
  // Pero si prefieren pueden usar un método dentro de la clase.

  constructor (type) {

    // No es necesario declarar el parámetro como propiedad de la clase (this.type = type)
    // porque no es usado en los métodos, solo en el constructor.
    // Para chequear type pueden usar if/else o switch/case, es lo mismo:

    if (type == 'fs') {
      return new SingletonDaoFS(productsFile)
    }

    else if (type == 'mongo') {
      mongoConnect()
      return new SingletonDaoMongo(productModel)
    }

    // Si no se le pasa ningún parámetro usa el DAO de persistencia en memoria como default:
    else {
      return new SingletonDaoMemory(productsArray)
    }
  }
}

export default DaoFactory
