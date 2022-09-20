import CreateMeetingForm from './CreateMeetingForm';
import MeetingList from './MeetingList';

const Home = ({ authToken, user, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className='home'>
      <section className='create-meeting-form-container'>
        <CreateMeetingForm
          {...{ authToken, user, isLoggedIn, setIsLoggedIn }}
        />
      </section>
      <MeetingList />
    </div>
  );
};

export default Home;
