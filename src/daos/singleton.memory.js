// Singleton para persistencia en memoria

class SingletonDaoMemory {

    constructor (array) {
  
      this.array = array;
  
      // Chequeo en el contructor si ya existe una instancia de la clase.
      // Si ya existe, devuelve esa misma instancia,
      // con lo cual no permite crear más instancias de esta clase:
  
      if (SingletonDaoMemory.instance) return SingletonDaoMemory.instance
    }
    
    // Los métodos deben tener el mismo nombre en todos los Singletons
    // ya que con ese nombre van a ser llamados desde el Controller
    // aunque la implementación sea distinta para cada forma de persistencia.
    // El asincronismo no sería necesario en este caso
    // pero hay que usarlo para mantener la consistencia entre todos los Singletons:
  
    async getAll () {
  
      return this.array
    }
  
    async getById (id) {
  
      const item = this.array.find( item => item.id == id)
  
      if (item) return item
      // No es neceario usar else ya que si item es true la ejecución del método finaliza en el return
      console.log('Item not found')
    }
  
    async deleteById (id) {
  
      const items = this.array;
  
      const index = this.array.findIndex( item => item.id == id)
  
      if ( index >= 0 ) {
  
        const itemToDelete = items[index];
  
        items.splice(index, 1)
  
        return {deleted: itemToDelete}
  
      } 
      console.log('Item not found')
    }
  
    async updateById (id, newProps) {
  
      const items = this.array;
  
      const index = this.array.findIndex( item => item.id == id)
  
      if ( index >= 0 ) {
  
        items[index] = {
          ...items[index],
          ...newProps
        }
        return {updated: items[index]}
      }
      console.log('Item not found') 
    }
  
    async saveNewItem (item) {
  
      const items = this.array;
  
      const lastId = items.length ? items[items.length-1].id : 0;
  
      item.id = lastId + 1;
  
      this.array.push(item);
  
      return {newItem: item}
    }
  }
  
  
  export default SingletonDaoMemory