import { Route, Routes } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";

function User() {
    return (
        <Routes>
            <Route path="/usernav" element={UserNavbar} />
        </Routes>
    );
};

export default User;