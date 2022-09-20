const MeetingList = ({ meetings }) => {
  return (
    <ul className='meeting-list'>
      {meetings.forEach((meeting) => (
        <li>
          <Meeting key={Date.now()} meeting={meeting} />
        </li>
      ))}
    </ul>
  );
};

const Meeting = ({ meeting }) => {
  return <div className='meeting'>{meeting.title}</div>;
};

export default MeetingList;
