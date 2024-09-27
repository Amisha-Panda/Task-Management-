import { HashRouter, Routes, Route, Link } from "react-router-dom";
import ManagementScreen from "./API CALLs/ManagementScreen";
import TransactionScreen from "./API CALLs/TransationScreen";
function App() {
    return (
        <HashRouter>
            <ul className="list-unstyled d-flex justify-content-center gap-5 bg-light p-3">
                <li>
                    <Link  className="text-decoration-none text-dark" to="/">Management</Link>
                </li>
                <li>
                    <Link  className="text-decoration-none text-dark" to="/transaction">Transaction</Link>
                </li>
            </ul>

            <Routes>
                <Route path="/" element={<ManagementScreen />} />
                <Route path="/transaction" element={<TransactionScreen />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
