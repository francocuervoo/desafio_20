
import { promises as fs } from 'fs';

// Singleton para persistencia en File System

class SingletonDaoFS {

  constructor (file) {

    this.file = file
    
    // Chequeo en el contructor si ya existe una instancia de la clase.
    // Si ya existe, devuelve esa misma instancia,
    // con lo cual no permite crear más instancias de esta clase:

    if (SingletonDaoFS.instance) return SingletonDaoFS.instance
  }

  // Los métodos deben tener el mismo nombre en todos los Singletons
  // ya que con ese nombre van a ser llamados desde el Controller
  // aunque la implementación sea distinta para cada forma de persistencia.
  // El asincronismo no sería necesario en este caso
  // pero hay que usarlo para mantener la consistencia entre todos los Singletons:

  async getAll () {

    try {

      const items = await fs.readFile(this.file, 'utf-8');

      return JSON.parse(items)

    } catch (error) { console.log (error) } 
  }

  async getById (id) {
    
    const items = await this.getAll();

    const item = items.find( item => item.id == id);

    if (item) return item
    
    else console.log('Item not found')
  }

  async deleteById (id) {

    const items = await this.getAll();

    const index = items.findIndex( item => item.id == id)

    // findIndex retorna -1 cuando no encuentra nada
    // por eso se debe chequear si index es mayor o igual a 0
    // de lo contrario la funcion retorna un objeto aunque nada haya sido borrado
    if (index >= 0) {

      const itemToDelete = items[index];
    
      items.splice(index, 1);
      
      await this.#saveFile(items);

      return {deleted: itemToDelete}

    } else { console.log('Item not found') }
  }

  async updateById (id, newProps) {

    const items = await this.getAll()

    const index = items.findIndex( item => item.id == id)
    
    // findIndex retorna -1 cuando no encuentra nada
    // por eso se debe chequear si index es mayor o igual a 0:
    if ( index >= 0 ) {

      items[index] = {
      ...items[index],
      ...newProps
      }
    
      await this.#saveFile(items);

      return {updated: items[index]}

    } else { console.log('Item not found') }
  }

  async saveNewItem (item) {

    const items = await this.getAll();

    const lastId = items.length ? items[items.length-1].id : 0;

    item.id = lastId + 1;

    items.push(item);
    
    await this.#saveFile(items);

    return {newItem: item}
  }

  async #saveFile (newArray) {

    try {
    
      await fs.writeFile(this.file, JSON.stringify(newArray, null, 2))
    
    } catch (error) { console.log (error) }
  }
}

export default SingletonDaoFS