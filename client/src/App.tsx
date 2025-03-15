import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function App() {
  const [activities, setActivies] = useState<Activity[]>([]);

  // useEffect(() => {
  //   fetch('https://localhost:5001/api/activity')
  //     .then((Response) => Response.json())
  //     .then((data) => setActivies(data));
  // }, []);
  useEffect(() => {
    axios
      .get<Activity[]>('https://localhost:5001/api/activity')
      .then((response) => setActivies(response.data));
  }, []);

  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}
