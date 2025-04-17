import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";

type Props = {
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: boolean;
    submitForm: (activit: Activity) => void;
    deleteActivity: (id: string) => void;

}
export default function ActivityDashboard({
    activities, selectedActivity,
    cancelSelectActivity, selectActivity, openForm, closeForm, editMode, submitForm, deleteActivity
}: Props) {
    return (
        <Grid2 container spacing={3}>
            <Grid2 size={7}>
                <ActivityList
                    activities={activities}
                    selectActivity={selectActivity}
                    deleteActivity={deleteActivity}
                />
            </Grid2>
            <Grid2 size={5}>
                {selectedActivity && !editMode &&
                    < ActivityDetails
                        activity={selectedActivity}
                        cancelSelectActivity={cancelSelectActivity}
                        openForm={openForm}
                    />}

                {editMode &&
                    <ActivityForm
                        activity={selectedActivity}
                        closeForm={closeForm}
                        submitForm={submitForm} />}
            </Grid2>
        </Grid2>
    )
}
