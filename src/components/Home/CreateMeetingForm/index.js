import axios from 'axios';
import { useState, useEffect } from 'react';

const serverURL = `${process.env.REACT_APP_BACKEND_URL}/meeting`;

const CreateMeetingForm = ({ authToken, user, isLoggedIn, setIsLoggedIn }) => {
  const [title, setTitle] = useState('');
  const [agenda, setAgenda] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [guest, setGuest] = useState('');
  const [edit, setEdit] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: '',
  });

  useEffect(() => {
    if (alert.show && alert.type === 'success') {
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
    setAlert({
      show: false,
      type: '',
      msg: '',
    });
    if (edit) {
    } else {
      try {
        const res = await axios.post(`${serverURL}/create`, {
          authToken,
          guest,
          time: new Date(time).getTime(),
          duration: duration * 60000, // to convert into milliesconds
          title,
          agenda,
        });

        setAlert({
          show: true,
          type: 'success',
          msg: 'Invite created successfully',
        });
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          if (err.response.data.msg === 'Invalid token.') {
            setIsLoggedIn(false);
          }
        }

        if (err.response.status === 400) {
          if (
            err.response.data.msg ===
            "meeting can't be scheduled at the requested time. please choose from one of the following time intervals"
          ) {
            let msg = err.response.data.msg;
            let { availabeIntervals } = err.response.data;
            availabeIntervals = availabeIntervals.map((timeStamp) => {
              const start = new Date(timeStamp.start).toString();
              const meetDuration = Math.floor(timeStamp.duration / 60000);

              return `at ${start} for at most ${meetDuration} minutes,`;
            });

            for (let i = 0; i < availabeIntervals.length; i++) {
              msg += `\n ${availabeIntervals[i]}`;
            }

            setAlert({
              show: true,
              type: 'danger',
              msg,
            });
            console.log({ availabeIntervals, msg });
          }
        }
      }
    }
  };

  return (
    <form className='create-meeting-form' onSubmit={handleSubmit}>
      {alert.show && (
        <div className='form-row'>
          <span className={`form-alert alert-${alert.type}`}>{alert.msg}</span>
        </div>
      )}

      <div className='form-row'>
        <label htmlFor='title' className='form-label'>
          title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          className='form-input'
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='agenda' className='form-label'>
          agenda
        </label>
        <textarea
          name='agenda'
          id='agenda'
          className='form-textarea'
          value={agenda}
          onChange={(evt) => setAgenda(evt.target.value)}
          rows={3}
          maxLength={500}
          style={{
            resize: 'none',
          }}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='time' className='form-label'>
          time
        </label>
        <input
          type='datetime-local'
          name='time'
          id='time'
          className='form-input'
          value={time}
          onChange={(evt) => {
            setTime(evt.target.value);
          }}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='duration' className='form-label'>
          duration in minutes
        </label>
        <input
          type='number'
          name='duration'
          id='duration'
          className='form-input'
          value={duration}
          min={1}
          max={600}
          onChange={(evt) => {
            setDuration(evt.target.value);
          }}
        />
      </div>

      <div className='form-row'>
        <label htmlFor='guest' className='form-label'>
          guest email
        </label>
        <input
          type='text'
          name='guest'
          id='guest'
          className='form-input'
          value={guest}
          onChange={(evt) => {
            setGuest(evt.target.value);
          }}
        />
      </div>

      <div className='form-row btn-container'>
        <button
          className='btn'
          type='submit'
          style={{
            backgroundColor: 'green',
          }}>
          {edit ? 'edit' : 'create'}
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
  );
};

export default CreateMeetingForm;
