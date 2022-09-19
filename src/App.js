import { useEffect, useState } from 'react';
import Form from './components/Form';
import Navbar from './components/Navbar';

function App() {
  const [formType, setFormType] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [token, setToken] = useState('');
  const [greetingName, setGreetingName] = useState(
    localStorage.getItem('greetingName')
  );
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [newPassword, setNewPassword] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showForm, setShowForm] = useState(true);

  const state = {
    name,
    email,
    phoneNumber,
    password,
    confirmationPassword,
    token,
    setName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setConfirmationPassword,
    setToken,
    formType,
    setFormType,
    isLoggedIn,
    setIsLoggedIn,
    greetingName,
    setGreetingName,
    authToken,
    setAuthToken,
    newPassword,
    setNewPassword,
    user,
    setUser,
    showForm,
    setShowForm,
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('greetingName', isLoggedIn ? greetingName : '');
    if (isLoggedIn) {
      localStorage.setItem('authToken', authToken);
    } else {
      setAuthToken('');
      localStorage.removeItem('authToken');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Navbar {...state} />
      <Form {...state} />
    </>
  );
}

export default App;
