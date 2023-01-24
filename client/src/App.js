import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AddTask,
  AllTasks,
  ProfilePage,
  SharedLayout,
  Stats,
  ProtectedRoute,
} from "./pages/Dashboard";
import { Welcome, Error, Register } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="ny-opgave" element={<AddTask />} />
            <Route path="profil" element={<ProfilePage />} />
            <Route path="alle-opgaver" element={<AllTasks />} />
          </Route>
          <Route element={<Register />} path="/login" />
          <Route element={<Welcome />} path="/velkommen" />
          <Route element={<Error />} path="*" />
      </Routes>
    </Router>
  );
}

export default App;
