import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateMeetingForm from './CreateMeetingForm';
import MeetingList from './MeetingList';

const Home = ({ authToken, user, isLoggedIn, setIsLoggedIn }) => {
  const [meetings, setMeetings] = useState([]);
  const [showMeetings, setShowMeetings] = useState(true);

  const fetchMeetings = async () => {
    try {
      let newMeetings = (
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/meeting/get`, {
          authToken,
        })
      ).data.meetings.concat(
        (
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/meeting/invites`,
            {
              authToken,
            }
          )
        ).data.meetings
      );

      setMeetings(newMeetings);
      console.log({ newMeetings });
      console.log({ meetings });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className='home'>
      <section className='create-meeting-form-container'>
        <CreateMeetingForm
          {...{ authToken, user, isLoggedIn, setIsLoggedIn }}
        />
      </section>
      <MeetingList {...{ meetings }} />
    </div>
  );
};

export default Home;
