import { useEffect, useState } from 'react';
import axios from 'axios';

const serverURL = `${process.env.REACT_APP_BACKEND_URL}`;

const Form = ({
  formType,
  setFormType,
  setIsLoggedIn,
  name,
  setName,
  email,
  setEmail,
  token,
  setToken,
  phoneNumber,
  setPhoneNumber,
  password,
  setPassword,
  confirmationPassword,
  setConfirmationPassword,
  setGreetingName,
  authToken,
  setAuthToken,
  newPassword,
  setNewPassword,
  user,
  setUser,
  showForm,
  setShowForm,
}) => {
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: '',
  });

  useEffect(() => {
    if (alert.show) {
      const timeoutID = setTimeout(() => {
        setAlert({
          show: false,
          type: '',
          msg: '',
        });
      }, 5000);
      return () => clearTimeout(timeoutID);
    }
  }, [alert.show]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formType === 'signup') {
      if (!(password === confirmationPassword)) {
        setAlert({
          show: true,
          type: 'danger',
          msg: "Passwords don't match",
        });
        return;
      }
      try {
        const res = await axios.post(serverURL + '/auth/register', {
          name,
          email,
          password,
          phoneNumber,
        });
        setAlert({
          show: true,
          type: 'success',
          msg: res.data.msg,
        });
        setFormType('verification');
        console.log(res);
      } catch (err) {
        setAlert({
          show: true,
          type: 'danger',
          msg: err.response.data.msg,
        });
        console.error(err);
      }
    } else if (formType === 'verification') {
      try {
        const res = await axios.get(`${serverURL}/auth/verifyEmail/${token}`);
        setAlert({
          show: true,
          type: 'success',
          msg: res.data.msg,
        });
        console.log(res);
        setIsLoggedIn(true);
        setAuthToken(res.data.authToken);
        setShowForm(false);
      } catch (err) {
        setAlert({
          show: true,
          type: 'danger',
          msg: err.response.data.msg,
        });
        console.error(err);
      }
    } else if (formType === 'login') {
      try {
        const res = await axios.post(`${serverURL}/auth/login/`, {
          email,
          password,
        });
        setAlert({
          show: true,
          type: 'success',
          msg: 'login successful',
        });
        console.log(res);
        setIsLoggedIn(true);
        setAuthToken(res.data.authToken);
        setGreetingName(res.data.user.name);
        setUser(res.data.user);
        setShowForm(false);
      } catch (err) {
        setAlert({
          show: true,
          type: 'danger',
          msg: err.response.data.msg,
        });
        console.error(err);
      }
    } else if (formType === 'edit-profile') {
      try {
        if (name) {
          const res = await axios.patch(`${serverURL}/user/updateName`, {
            name,
            authToken,
          });

          setAlert({
            show: true,
            type: 'success',
            msg: 'changes successful',
          });

          setGreetingName(res.data.user.name);
          setAuthToken(res.data.authToken);
          setUser(res.data.user);
        }
        if (password && newPassword) {
          const res = await axios.patch(`${serverURL}/user/updatePassword`, {
            password,
            newPassword,
            authToken,
          });
          setAlert({
            show: true,
            type: 'success',
            msg: 'changes successful',
          });
          setGreetingName(res.data.user.name);
          setAuthToken(res.data.authToken);
          setUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
      }
    }
    clearAll();
  };

  const clearAll = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setConfirmationPassword('');
    setToken('');
  };
  return (
    showForm && (
      <form
        className='form'
        onSubmit={handleSubmit}
        onReset={clearAll}
        style={{
          marginTop: '10vh',
        }}>
        {alert.show && (
          <div className='form-row'>
            <span className={`form-alert alert-${alert.type}`}>
              {alert.msg}
            </span>
          </div>
        )}
        {(formType === 'signup' || formType === 'edit-profile') && (
          <div className='form-row'>
            <label htmlFor='name' className='form-label'>
              name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='form-input'
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
          </div>
        )}

        {(formType === 'login' || formType === 'signup') && (
          <div className='form-row'>
            <label htmlFor='email' className='form-label'>
              email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='form-input'
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
        )}

        {formType === 'signup' && (
          <div className='form-row'>
            <label htmlFor='phone' className='form-label'>
              phone number
            </label>
            <input
              type='tel'
              name='phoneNumber'
              id='phone'
              className='form-input'
              value={phoneNumber}
              onChange={(evt) => setPhoneNumber(evt.target.value)}
            />
          </div>
        )}

        {(formType === 'login' ||
          formType === 'signup' ||
          formType === 'edit-profile') && (
          <div className='form-row'>
            <label htmlFor='password' className='form-label'>
              password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              className='form-input'
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
        )}

        {formType === 'edit-profile' && (
          <div className='form-row'>
            <label htmlFor='newPassword' className='form-label'>
              new password
            </label>
            <input
              type='password'
              name='newPassword'
              id='newPassword'
              className='form-input'
              value={newPassword}
              onChange={(evt) => setNewPassword(evt.target.value)}
            />
          </div>
        )}

        {formType === 'signup' && (
          <div className='form-row'>
            <label htmlFor='password-confirmation' className='form-label'>
              confirm password
            </label>
            <input
              type='password'
              name='password-confirmation'
              id='password-confirmation'
              className='form-input'
              value={confirmationPassword}
              onChange={(evt) => setConfirmationPassword(evt.target.value)}
            />
          </div>
        )}

        {formType === 'verification' && (
          <div className='form-row'>
            <label htmlFor='token' className='form-label'>
              enter token
            </label>
            <input
              type='text'
              name='token'
              id='token'
              className='form-input'
              value={token}
              onChange={(evt) => setToken(evt.target.value)}
            />
          </div>
        )}

        <div className='form-row btn-container'>
          <button
            className='btn'
            type='submit'
            style={{
              backgroundColor: 'green',
            }}>
            {formType === 'signup'
              ? 'sign up'
              : formType === 'login'
              ? 'login'
              : formType === 'edit-profile'
              ? 'save changes'
              : 'verify'}
          </button>

          <button
            className='btn'
            type='reset'
            style={{
              backgroundColor: 'red',
            }}>
            reset
          </button>
        </div>
      </form>
    )
  );
};

export default Form;
