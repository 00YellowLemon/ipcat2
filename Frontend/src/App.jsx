import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul className="pagination">
            <li>
              <Link to="/">Submit Data</Link>
            </li>
            <li>
              <Link to="/view">View Data</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/view">
            <ViewData />
          </Route>
          <Route path="/">
            <SubmitDataForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function SubmitDataForm() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    dateOfDeath: '',
    content: '',
    author: '',
    slug: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/add-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        setFormData({
          name: '',
          dateOfBirth: '',
          dateOfDeath: '',
          content: '',
          author: '',
          slug: ''
        });
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Submit Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Death:</label>
          <input type="date" name="dateOfDeath" value={formData.dateOfDeath} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Slug:</label>
          <input type="text" name="slug" value={formData.slug} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ViewData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/fetch-data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="view-data">
      <h2>View Submitted Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Date of Death</th>
            <th>Content</th>
            <th>Author</th>
            <th>Slug</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dateOfBirth}</td>
              <td>{item.dateOfDeath}</td>
              <td>{item.content}</td>
              <td>{item.author}</td>
              <td>{item.slug}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
