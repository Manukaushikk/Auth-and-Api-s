// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import routeConfig from './routes/routes';
import Loading from './components/LoadingSpinner'; // Create a loading component for lazy loading

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}> {/* Show loading while components are being loaded */}
        <Routes>
          {routeConfig.map(({ path, element, isPublic }, index) => (
            <Route
              key={index}
              path={path}
              element={element}
            />
          ))}
          <Route path="*" element={<Navigate to="/unauthorized" />} /> {/* Redirect to unauthorized for any unknown routes */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
