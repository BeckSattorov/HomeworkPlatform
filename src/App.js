import './App.css';
import { Routes, Route } from 'react-router-dom';
import { User } from './components/User-Dashboard/User';
import { Message } from './components/User-Dashboard/Message';
import { UserHomework } from './components/User-Dashboard/UserHomework'
import { Admin } from './components/Admin-Dashboard/Admin';
import { Home } from './components/web_pages/Home';
import { Login } from './components/web_pages/LogIns';
import { Registration } from './components/web_pages/Registration';
import { CheckHomework } from './components/Admin-Dashboard/CheckHomework';
import { AdminSettings } from './components/Admin-Dashboard/AdminSettings';
import { LiderBoard } from './components/User-Dashboard/LiderBoard';
import { UserDashboard } from './components/User-Dashboard/UserDashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      
      <Route path='user' element={<User />}>
        <Route path='homework' element={<UserHomework />} />
        <Route path='liderboard' element={<LiderBoard />} />
        <Route path='/' element={<UserDashboard />} />
        <Route path='message' element={<Message />} />
      </Route>
      <Route path='admin/@JJKHKJ&&68762hjk&98^78675875/87832778723748974787' element={<Admin />}>
        <Route path='homework' element={<CheckHomework />} />
        <Route path='settings' element={<AdminSettings />} />
        <Route path='message' element={<h1>Message</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
