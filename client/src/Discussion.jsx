import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function Discussion() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState([]);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editType, setEditType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    try {
      const response = await axios.get('https://discuss-24w6.onrender.com/api/discussion');
      setDiscussions(response.data.discussions);
    } catch (error) {
      console.error('Error fetching discussions:', error);
    }
  };

  const handleAddUsername = async () => {
    if (!username.trim()) {
      toast.error('Please enter a message before sending.');
      return;
    }

    try {
      await axios.post('https://discuss-24w6.onrender.com/api/discussion', { username });
      toast.success('User send successfully');
      setUsername('');
      fetchDiscussions();
    } catch (error) {
      console.error('Error adding username:', error);
      toast.error('Error adding username');
    }
  };

  const handleAddMessage = async () => {
    if (!message.trim()) {
      toast.error('Please enter a message before sending.');
      return;
    }

    try {
      await axios.post('https://discuss-24w6.onrender.com/api/discussion', { message });
      toast.success('Client send successfully');
      setMessage('');
      fetchDiscussions();
    } catch (error) {
      console.error('Error adding message:', error);
      toast.error('Error adding message');
    }
  };


  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`https://discuss-24w6.onrender.com/api/discussion/${id}`);
      toast.dark('deleted successfully');
      fetchDiscussions();
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Error deleting message');
    }
  };

  const handleEdit = (id, type) => {
    setEditingMessageId(id);
    setEditType(type);
  };

  const handleEditUser = async () => {
    try {
      await axios.put(`https://discuss-24w6.onrender.com/api/discussion/${editingMessageId}`, { username });
      toast.info('User edited successfully');
      fetchDiscussions();
      setEditingMessageId(null);
      setEditType(null);
      setUsername(''); // Clear the username after editing
    } catch (error) {
      console.error('Error editing username:', error);
      toast.error('Error editing username');
    }
  };

  const handleEditClient = async () => {
    try {
      await axios.put(`https://discuss-24w6.onrender.com/api/discussion/${editingMessageId}`, { message });
      toast.info('Client edited successfully');
      fetchDiscussions();
      setEditingMessageId(null);
      setEditType(null);
      setMessage(''); // Clear the message after editing
    } catch (error) {
      console.error('Error editing message:', error);
      toast.error('Error editing message');
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');

    if (confirmed) {
      navigate('/signup');
    }
  };

  return (
    <div style={{ color: 'whitesmoke' }}>
      <video src="./video/diss.mp4" autoPlay loop muted></video>
      <h5 className='h1'style={{color:"Menu"}}>Discussion Board  <button className='btn' onClick={handleLogout} style={{ position: 'absolute', right: '3%', borderRadius: '1rem', color: "whitesmoke" }}>
        Logout
      </button></h5>
     
      <div className='one'>
        <label style={{ fontWeight: 'bold', margin: '1%', color: 'white' }}>User:</label>
        <textarea
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required // Adding the required attribute
        />
        <br />
        <button
          style={{ fontFamily: 'sans-serif', border: 'none', borderRadius: '20rem', backgroundColor: 'lightgreen' }}
          onClick={handleAddUsername}
        >
          SEND
        </button>
      </div>
      <div className='two'>
        <label style={{ fontWeight: 'bold', margin: '1%', color: 'white' }}>Client:</label>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required // Adding the required attribute
        />
        <br />
        <button
          style={{ fontFamily: 'sans-serif', border: 'none', borderRadius: '20rem', backgroundColor: 'lightgreen' }}
          onClick={handleAddMessage}
        >
          SEND
        </button>
      </div>
      <div>
        <h4 style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}> <span style={{color:"RED"}}>C</span><span style={{color:"YELLOW"}}>R</span><span style={{color:"PINK"}}>U</span>D</h4>
        <ul>
          {discussions.map((item) => (
            <li key={item._id}>
              <strong>USER.. <span style={{fontFamily:"serif",textDecoration:"underline", fontSize:"xx-large", color:"yellow"}}>{item.username}</span></strong> <strong> CLIENT.. <span style={{fontFamily:"serif",color:"darkorange", textDecoration:"underline", fontSize:"xx-large"}}>{item.message}</span> </strong>

              {''}

              <button className='btn1' onClick={() => handleDeleteMessage(item._id)}>
                Delete
              </button>
              <button className='btn2' onClick={() => handleEdit(item._id, 'USER')}>
                Edit USER
              </button>
              <button className='btn3' onClick={() => handleEdit(item._id, 'CLIENT')}>
                Edit CLIENT
              </button>

              {editingMessageId === item._id && (
                <>
                  <br />
                  {editType === 'USER' && (
                    <div className='one'>
                      <label style={{ fontWeight: 'bold', margin: '1%', color: 'white' }}>Edit USER:</label>
                      <textarea
                        type="text"
                        defaultValue={item.username}
                        onChange={(e) => setUsername(e.target.value)}
                        required // Adding the required attribute
                      />
                      <button onClick={handleEditUser} style={{ fontFamily: 'sans-serif', border: 'none', borderRadius: '40rem', backgroundColor: 'lightgreen' }}>Save Edit</button>
                    </div>
                  )}
                  {editType === 'CLIENT' && (
                    <div className='two'>
                      <label style={{ fontWeight: 'bold', margin: '1%', color: 'white' }}>Edit CLIENT:</label>
                      <textarea
                        type="text"
                        defaultValue={item.message}
                        onChange={(e) => setMessage(e.target.value)}
                        required // Adding the required attribute
                      />
                      <button onClick={handleEditClient} style={{ fontFamily: 'sans-serif', border: 'none', borderRadius: '40rem', backgroundColor: 'lightgreen' }}>Save Edit</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Discussion;
