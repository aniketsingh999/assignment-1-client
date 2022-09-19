const Navbar = ({
  greetingName,
  formType,
  setFormType,
  isLoggedIn,
  setIsLoggedIn,
  setGreetingName,
  setShowForm,
}) => {
  return (
    <div className='navbar'>
      <div className='title'>
        <span className='navbar-title'>
          {isLoggedIn ? `hello ${greetingName}` : formType}
        </span>
        <div className='title-underline'></div>
      </div>
      <div className='btn-container'>
        {!isLoggedIn && (
          <>
            <button
              className={`btn ${formType !== 'login' && 'btn-hipster'}`}
              onClick={() => setFormType('login')}>
              login
            </button>
            <button
              className={`btn ${formType !== 'signup' && 'btn-hipster'}`}
              onClick={() => setFormType('signup')}>
              sign up
            </button>
            <button
              className={`btn ${formType !== 'verification' && 'btn-hipster'}`}
              onClick={() => setFormType('verification')}>
              Verify Account
            </button>
          </>
        )}

        {isLoggedIn && (
          <>
            <button
              className={`btn`}
              onClick={() => {
                setIsLoggedIn(false);
                setGreetingName('');
                setFormType('login');
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('greetingName');
              }}>
              logout
            </button>

            <button
              className={`btn`}
              onClick={() => {
                setFormType('edit-profile');
                setShowForm(true);
              }}>
              edit profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
