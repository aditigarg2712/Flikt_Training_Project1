// import { GoogleOAuthProvider } from '@react-oauth/google';
// import React from 'react'
// import ReactDOM from 'react-dom'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.render(
//   <GoogleOAuthProvider clientId="http://592591028694-egmg1g3ejcgb6luf8o3rn17n32rtf2hh.apps.googleusercontent.com">
//       <React.StrictMode>
//           <App />
//       </React.StrictMode>
//   </GoogleOAuthProvider>,
//   document.getElementById('root')
// );
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Use createRoot to render your application
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="592591028694-egmg1g3ejcgb6luf8o3rn17n32rtf2hh.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
