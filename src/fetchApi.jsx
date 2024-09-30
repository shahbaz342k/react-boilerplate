import axios from 'axios';

const fetchData = async () => {
  try {
    const response = await axios.get('https://api.example.com/data', {
      headers: {
        'Authorization': 'Bearer YOUR_TOKEN', // Example of passing an Authorization token
        'Content-Type': 'application/json',   // Example of specifying the Content-Type
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();
