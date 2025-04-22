import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";

type Prop = {
    activities: Activity[];
    selectActivity: (id: string) => void;

}
export default function ActivityList({ activities, selectActivity }: Prop) {

    console.log("Activity list....")
    console.log(activities as Activity[])
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {activities.map(
                activity => (<ActivityCard key={activity.id}
                    activity={activity}
                    selectActivity={selectActivity}
                />))}
        </Box>
    )
}
