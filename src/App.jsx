import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Table = React.lazy(() => import('./pages/Table'));
const TableList = React.lazy(() => import('./pages/TableList'));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Table />} />
                    <Route path="/users/:userId" element={<TableList />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
