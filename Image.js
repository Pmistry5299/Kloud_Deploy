// src/Image.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import './image.css';
import Dashboard from './dashboard'; 
import loadingGif from './loading.gif';

const Image = () => {
  const [provider, setProvider] = useState('aws');
  const [regions, setRegions] = useState([]);
  const [imageTypes, setImageTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    imageName: '',
    size: '',
    imageRegion: '',
    imageType: '',
    provider: '',
  });

  const navigate = useNavigate();
  const location = useLocation(); // useLocation is imported separately
  const [installWordpress, setInstallWordpress] = useState(false); // New state for checkbox
  const [wordpressPath, setWordpressPath] = useState(''); // New state for WordPress installation path
  const token = location.state?.token;

  // Use the token in your API requests if needed
  const headers = {
    Authorization: `Token ${token}`,
    'Content-Type': 'application/json',
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'imageRegion') {
      const selectedRegion = regions.find((region) => region.slug === value);
      setSizes(selectedRegion ? selectedRegion.sizes : []);
    }
  };
  const handleCheckboxChange = () => {
    setInstallWordpress(!installWordpress);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Use the updated token here
      const updatedToken = localStorage.getItem('token');

      setLoading(true);
      // Update the headers with the new token
      const updatedHeaders = {
        Authorization: `Token ${updatedToken}`,
        'Content-Type': 'application/json',
      };
  
      if (provider === 'aws') {
        const postData = {
          name: formData.imageName,
          region: "nyc1",
          size: "s-1vcpu-1gb",
          image: "ubuntu-22-04-x64",
          status: "creating",
          provider: "aws"
        };
  
        console.log('Form Data before submit:', postData);
        const response = await axios.post('http://10.173.39.250:8000/server/', postData, { headers });
        let responses = "{ip: '54.152.195.145', id: 'i-0c1169d9aab5ae9f6'}";
       // Update the response data in the state\
        setResponseData(response);
        console.log('API Response:', response);

        const ip = response.data.ip;
        const id = response.data.id;
        const name = response.data.name;
        console.log("wdasdf",ip);
        
        if (id && installWordpress) {
          // // If checkbox is true, run additional GET request
          const wordpressResponse = await axios.get(`http://10.173.39.250:8000/application/install/?id=${id}`);
          console.log('WordPress API Response:', wordpressResponse.data);
          if (wordpressResponse.status === 200 && wordpressResponse.data.install) {
            // Proceed to load the dashboard
            navigate('/dashboard', { state: { ip, id, name } });
          } else {
            console.error('WordPress installation failed:', wordpressResponse.data);
          }
        } else {
          console.error('Server creation failed or WordPress installation is not requested.');
        }

        // if (response) {
        //   // If registration is successful and you have a token, navigate to the Image page
        //   navigate('/dashboard', { state: { ip,id,name } });
        // }
      }
  
      if (provider === 'digitalocean') {
        const postData = {
          name: formData.imageName,
          region: formData.imageRegion,
          size: formData.size,
          image: formData.imageType,
          provider: 'do',
          status: 'creating',
        };
  
        console.log('Form Data before submit:', postData);
        const response = await axios.post('http://10.173.39.250:8000/server/', postData, { headers });

          setResponseData(response.data);
          console.log('API Response image:', response.data);
          
        const ip = response.data.ip;
        const id = response.data.id;
        const name = response.data.name;
        console.log("wdasdf",ip);
        
        if (id && installWordpress) {
          // // If checkbox is true, run additional GET request
          const wordpressResponse = await axios.get(`http://10.173.39.250:8000/application/install/?instance_id=${id}`, { headers });
          console.log('WordPress API Response:', wordpressResponse.data);
          if (wordpressResponse.status === 200 && wordpressResponse.data.install) {
            // Proceed to load the dashboard
            navigate('/dashboard', { state: { ip, id, name } });
          } else {
            console.error('WordPress installation failed:', wordpressResponse.data);
          }
        } else {
          console.error('Server creation failed or WordPress installation is not requested.');
        }

          // navigate('/dashboard', { state: { response: response.data } });


      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally {
      setLoading(false); // Set loading to false after receiving the response
    }
  };
  
  const handleLogout = () => {
    // You can clear the token or perform any other logout-related tasks here
    // For now, let's navigate to the login page
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      // Simulate getting the token from local storage or context

      if (provider === 'digitalocean') {
        try {
          const regionsResponse = await axios.get('http://10.173.39.250:8000/digitalocean/get_region/', {
            headers,
          });
          setRegions(regionsResponse.data);

          if (regionsResponse.data.length > 0) {
            const defaultRegion = regionsResponse.data[0].slug;
            setFormData((prevData) => ({ ...prevData, imageRegion: defaultRegion }));
            const selectedRegion = regions.find((region) => region.slug === defaultRegion);
            setSizes(selectedRegion ? selectedRegion.sizes : []);
          }

          const imageTypesResponse = await axios.get('http://10.173.39.250:8000/digitalocean/get_images/', {
            headers,
          });
          setImageTypes(imageTypesResponse.data);

          if (imageTypesResponse.data.length > 0) {
            const defaultImageType = imageTypesResponse.data[0].image_slug;
            setFormData((prevData) => ({ ...prevData, imageType: defaultImageType }));
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [provider, token]);

  return (
    <div className="App" >
     {loading ? (
       <div className="loading-page">
       <h1>Please wait...</h1>
       <img src={loadingGif} alt="Loading" />
       <p>Loading...</p>
     </div>
    ) : (
      <>
      <h1 style={{ color: provider === 'aws' ? '#4caf50' : '#007bff' }}>Cloud deploy</h1>
      <label>
        Provider:
        <select value={provider} onChange={(e) => setProvider(e.target.value)}>
          <option value="aws">AWS</option>
          <option value="digitalocean">DigitalOcean</option>
        </select>
      </label>

      <form onSubmit={handleSubmit}>
        <label>
          Image Name:
          <input type="text" name="imageName" style={{ color: provider === 'aws' ? '#4caf50' : '#007bff' }} onChange={handleInputChange} />
        </label>

        <label>
          Image Region:
          {regions.length > 0 ? (
            <select name="imageRegion" value={formData.imageRegion} onChange={handleInputChange}>
              {regions.map((region) => (
                <option key={region.slug} value={region.slug}>
                  {region.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Choose Digital Ocean</p>
          )}
        </label>

        <label>
          Size:
          {sizes.length > 0 ? (
            <select name="size" onChange={handleInputChange}>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          ) : (
            <p>Select region to load sizes</p>
          )}
        </label>

        <label>
          Image Type:
          {imageTypes.length > 0 ? (
            <select name="imageType" value={formData.imageType} onChange={handleInputChange}>
              {imageTypes.map((imageType) => (
                <option key={imageType.image_slug} value={imageType.image_slug}>
                  {imageType.name}
                </option>
              ))}
            </select>
          ) : (
            <p>Choose Digital Ocean</p>
          )}
        </label>

        <label>
          Install WordPress:
          <input
            type="checkbox"
            checked={installWordpress}
            onChange={handleCheckboxChange}
          />
        </label>
        {/* {installWordpress && (
          <label>
            Install WordPress :
            <input
              type="text"
              name="wordpressPath"
              value={wordpressPath}
              onChange={(e) => setWordpressPath(e.target.value)}
            />
          </label>
        )} */}

        <button type="submit" style={{ backgroundColor: provider === 'aws' ? '#4caf50' : '#007bff' }}>Submit</button>
      </form>
      <button id="logoutButton" onClick={handleLogout}> Logout </button>
      {responseData && <Dashboard response={responseData} />}
            </>
    )}
    </div>
  );
};

export default Image;