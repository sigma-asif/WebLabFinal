// backend/models/Item.js
const pool = require('../config/db');

class Item {
  static async findAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(itemData) {
    try {
      const { name, description } = itemData;
      const [result] = await pool.query(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description]
      );
      return { id: result.insertId, name, description };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, itemData) {
    try {
      const { name, description } = itemData;
      await pool.query(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id]
      );
      return { id, name, description };
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM items WHERE id = ?', [id]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Item;