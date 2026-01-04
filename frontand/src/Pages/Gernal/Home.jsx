import React, { useState, useEffect } from 'react'; // 1. Import Hooks
import axios from 'axios';
import VideoReel from '../../components/VideoReel';
import '../../styles/Reels.css';

const Home = () => {
  // 2. Create a "State" to hold the data (starts as empty list)
  const [realsData, setRealsData] = useState([]);

  // 3. Use useEffect to fetch data automatically when page opens
  useEffect(() => {
    const fetchReels = async () => {
      try {
        // Call your Backend
        const response = await axios.get(
          'http://localhost:3000/api/food',
          { withCredentials: true } 
        );

        // Save the data into the state
        setRealsData(response.data);
        console.log("Data loaded:", response.data);
      } catch (error) {
        console.error("Error loading reels:", error);
      }
    };

    fetchReels(); // Run the function
  }, []); // [] means "run only once on mount"

    return (
    <div className="reels-container">
      {realsData.length > 0 ? (
        realsData.map((reel) => (
          <VideoReel 
            // 👇 1. ID matches standard MongoDB
            key={reel._id} 

            // 👇 2. Map 'name' from DB to the UI
            // Note: Since your DB doesn't have "shopName" yet, we use the food name here
            shopName={reel.name} 

            // 👇 3. Map 'description' (This matches perfectly)
            description={reel.description} 

            // 👇 4. CRITICAL FIX: Use 'Video' with Capital V (matches your DB)
            videoSrc={reel.Video} 
          />
        ))
      ) : (
        <div style={{color: 'white', textAlign: 'center', paddingTop: '50vh'}}>
           <h2>Loading Reels...</h2>
           {/* If this stays too long, it means the list is empty */}
        </div>
      )}
    </div>
  );
};

export default Home;