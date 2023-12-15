import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const discussionTimer = setTimeout(() => {
      // Redirect to Discussion page after 3 seconds
      navigate('/discussion');
    }, 5000);

    return () => clearTimeout(discussionTimer);
  }, [navigate]);

  return (
    <div>
         <video src="./video/welcome.mp4" autoPlay loop muted></video>
     
      {/* Add any content you want to display on the welcome page */}
    </div>
  );
}

export default Welcome;