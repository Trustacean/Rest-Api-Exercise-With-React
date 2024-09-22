import { useEffect, useState } from "react";

// AIzaSyAYryQGn5wi08bQ6-lgJMZOZIdeu6y67tI
const key = 'AIzaSyAYryQGn5wi08bQ6-lgJMZOZIdeu6y67tI';
export default function YoutubeProfile() {
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UC3E7Qnk-ByYZ5K6Q9ezW7-g&key=${key}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.items.length > 0) {
          const channelData = data.items[0];
          setSubscriberCount(channelData.statistics.subscriberCount);
          setChannelName(channelData.snippet.title);
          setJoinedDate(channelData.snippet.publishedAt.split('T')[0]);
          setProfilePicture(channelData.snippet.thumbnails.default.url);
        }
      });
  }, []);

  return (
    <div className="d-flex flex-column align-items-center border border-2 p-3">
      <div className="d-flex align-items-center">
        <img className="p-2" src={profilePicture} alt={channelName} />
        <h1 className="fw-bold px-3">{channelName || 'Loading...'}</h1>
      </div>
      <p>Subscriber Count: {subscriberCount ? subscriberCount : 'Loading...'}</p>
      <p>Joined: {joinedDate || 'Loading...'}</p>
    </div>
  );
}