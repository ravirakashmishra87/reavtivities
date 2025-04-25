import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';

export const useActivities = (id?: string) => {
  const queryclient = useQueryClient();

  const { data: activities, isPending } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activity');
      return response.data;
    },
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activity/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activity', activity);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post('/activity', activity);
      return response.data;
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activity/${id}`);
    },
    onSuccess: async () => {
      await queryclient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
