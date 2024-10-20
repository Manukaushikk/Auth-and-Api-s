// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import allRoutes from './routes/routes';
import Loading from './components/LoadingSpinner'; // Create a loading component for lazy loading

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {allRoutes.map(({ path, element, children, isPublic }, index) => (
            <Route key={index} path={path} element={element}>
              {children &&
                children.map((child, idx) => (
                  <Route
                    key={idx}
                    path={child.path}
                    element={child.element}
                  />
                ))}
            </Route>
          ))}
          {/* Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/notfound" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
