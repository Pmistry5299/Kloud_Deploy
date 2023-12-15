// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './dashboard.css';

// const Dashboard = () => {
//   const location = useLocation();

//   const ip = location?.state?.ip;
//   const id = location?.state?.id;
//   const name = location?.state?.name;
//   console.log('Dashboard component location:', ip);
//   console.log('Dashboard component location:', id);
//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <ul>
//       <li  className="dashboard-item">Name: {name}</li>
//         <li className="dashboard-item"><strong>IP:</strong> <a href={`http://${ip}`} target="_blank" rel="noopener noreferrer">{ip}</a></li>
//         <li className="dashboard-item">Id: {id}</li>
        
//       </ul>
//     </div>
//   );
// };


// export default Dashboard;

import React from 'react';
import { useLocation } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const ip = location?.state?.ip;
  const id = location?.state?.id;
  const name = location?.state?.name;

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-content">
        <ul>
          <li className="dashboard-item">Name: {name}</li>
          <li className="dashboard-item">
            <strong>IP:</strong>{' '}
            <a href={`http://${ip}`} target="_blank" rel="noopener noreferrer">
              {ip}
            </a>
          </li>
          <li className="dashboard-item">Id: {id}</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
