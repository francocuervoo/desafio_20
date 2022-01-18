

// Singleton para persistencia en MongoDB

class SingletonDaoMongo {

    constructor (model) { 
      
      this.model = model;
  
      // Chequeo en el contructor si ya existe una instancia de la clase.
      // Si ya existe, devuelve esa misma instancia,
      // con lo cual no permite crear más instancias de esta clase:
  
      if (SingletonDaoMongo.instance) return SingletonDaoMongo.instance
    }
  
    // Los métodos deben tener el mismo nombre en todos los Singletons
    // ya que con ese nombre van a ser llamados desde el Controller
    // aunque la implementación sea distinta para cada forma de persistencia.
    // El asincronismo no sería necesario en este caso
    // pero hay que usarlo para mantener la consistencia entre todos los Singletons:
  
    async getAll() {
  
      try {
  
        return await this.model.find()
  
      } catch (err) { console.log(err) }
    }
  
    async getById (id) {
  
      try {
  
        return await this.model.findById(id)
        
      } catch (err) { console.log(err) }
    }
  
    async deleteById (id) {
  
      try {
  
        return await this.model.findByIdAndDelete(id)
  
      } catch (err) { console.log(err) }
    }
  
    async updateById (id, newProps) {
  
      try {
        // Para que retorne el documento actualizado: {new: true}     
        return await this.model.findByIdAndUpdate(
          id, 
          {...newProps}, 
          {new: true}
        )
  
      } catch (err) { console.log (err) }
    }
  
    async saveNewItem (item) {
  
      try {
  
        return await this.model.create(item)
  
      } catch (err) { console.log(err) }
    }
  }
  
  export default SingletonDaoMongo
  
  
  
  
  