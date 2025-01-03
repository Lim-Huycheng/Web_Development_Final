const db = require("../config/database");

class Product {
    static async getAll(){
        const [rows] = await db.query('SELECT * FROM products');
        return rows;
    }

    static async getRecent() {
      const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC LIMIT 5');
      return rows;
    }

    static async create(data){
        const result = await db.query("INSERT INTO products (name,price, description,image) VALUE (?,?,?,?)",[data.name, data.price,data.description,data.image]);
        return result;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, data) {
        const result = await db.query('UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?', [data.name, data.price,data.description,data.image, id]);
        return result;
      }
    
    static async delete(id) {
        const result = await db.query('DELETE FROM products WHERE id = ?', [id]);
        return result;
      }

      static async search(searchTerm) {
        const [rows] = await db.query(
          "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?",
          [`%${searchTerm}%`, `%${searchTerm}%`]
        );
        return rows;
      }
}


module.exports = Product;