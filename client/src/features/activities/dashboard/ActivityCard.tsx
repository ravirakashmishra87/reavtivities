import { Card, CardContent, Typography, CardActions, Button, Chip, Box } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate } from "react-router";

type Props = {
    activity: Activity;
}
export default function ActivityCard({ activity }: Props) {

    const navigate = useNavigate();
    const { deleteActivity } = useActivities()
    console.log("Activity in Activity card...");
    console.log(activity.title);
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardContent>
                <Typography variant="h5">{activity.title} </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1 }}>{activity.date}</Typography>
                <Typography variant="body2">{activity.description} </Typography>
                <Typography variant="subtitle2">{activity.city} / {activity.venue} </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
                <Chip label={activity.category} variant="outlined" />
                <Box display='flex' gap={3}>
                    <Button onClick={() => navigate(`/activities/${activity.id}`)}
                        size="medium" variant="contained"
                    >View</Button>
                    <Button
                        onClick={() => deleteActivity.mutate(activity.id)}
                        disabled={deleteActivity.isPending}
                        size="medium"
                        color="error"
                        variant="contained">Delete</Button>
                </Box>


            </CardActions>

        </Card >
    )
}
