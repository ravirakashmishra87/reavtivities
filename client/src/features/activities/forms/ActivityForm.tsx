import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { FormEvent } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";

export default function ActivityForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(event);

        const formData = new FormData(event.currentTarget);
        const data: { [key: string]: FormDataEntryValue } = {};

        formData.forEach((value, key) => {
            data[key] = value;
        })

        if (activity) {
            data.id = activity.id
            await updateActivity.mutateAsync(data as unknown as Activity)
            navigate(`/activities/${activity.id}`)
        }
        else {
            createActivity.mutate(data as unknown as Activity, {
                onSuccess: (id) => {
                    navigate(`/activities/${id}`)
                }
            })
        }
    }
    if (isLoadingActivity) return (<Typography>Loading Activity..</Typography>)
    return (
        <Paper sx={{ borderRadius: 3, padding: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">{activity ? 'Update ' : 'Create '}Activity</Typography>
            <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection='column' gap={3}>
                <TextField name='Title' label='Title' defaultValue={activity?.title} />
                <TextField name='Description' label='Description' multiline rows={3} defaultValue={activity?.description} />
                <TextField name='Category' label='Category' defaultValue={activity?.category} />
                <TextField name='Date' label='Date' type="date"
                    defaultValue={activity?.date
                        ? new Date(activity.date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                    } />
                <TextField name='City' label='City' defaultValue={activity?.city} />
                <TextField name='Venue' label='Venue' defaultValue={activity?.venue} />
                <Box display='flex' justifyContent='end' gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>

                </Box>
            </Box>

        </Paper>
    )
}
