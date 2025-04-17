import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

export default function App() {
  const [activities, setActivies] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }
  const handleCancelSelectedActivity = () => {
    setSelectedActivity(undefined)
  }
  const handleOpenForm = (id?: string) => {
    if (id)
      handleSelectActivity(id);
    else
      handleCancelSelectedActivity();
    setEditMode(true);
  }

  const handleFormClose = () => {
    setEditMode(false);
  }

  const handleSubmitForm = (activity: Activity) => {
    console.log("activity...")
    console.log(activity)
    if (activity.id) {
      setActivies(activities.map(x => x.id === activity.id ? activity : x))
    }
    else {
      const newActivity = { ...activity, id: activities.length.toString() }
      setActivies([...activities, newActivity]);
      setSelectedActivity(newActivity);
    }
    setEditMode(false);
    console.log("Activities...")
    console.log(activities);
  }

  const handleDelete = (id: string) => {
    setActivies(activities.filter(x => x.id !== id));
  }

  return (
    <Box sx={{ backgroundColor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar openForm={handleOpenForm} />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectedActivity}
          selectedActivity={selectedActivity}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          editMode={editMode}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  );
}
