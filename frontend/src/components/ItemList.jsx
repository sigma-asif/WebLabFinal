// frontend/src/components/ItemList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, deleteItem } from '../services/api';

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getAllItems();
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        fetchItems(); // Refresh the list
      } catch (err) {
        setError('Failed to delete item');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Items List</h2>
        <Link to="/add" className="btn btn-success">Add New Item</Link>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info">No items found. Add some items!</div>
      ) : (
        <div className="row">
          {items.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card item-card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description || 'No description'}</p>
                  <div className="d-flex">
                    <Link to={`/edit/${item.id}`} className="btn btn-primary">Edit</Link>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Created: {new Date(item.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ItemList;