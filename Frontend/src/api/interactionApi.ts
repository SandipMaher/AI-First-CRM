import api from "./axios";

export const createInteraction = async (formData: any) => {
  const payload = {
    hcp_name: formData.hcpName,
    interaction_type: formData.interactionType,
    date: formData.date,
    time: formData.time,
    attendees: formData.attendees,
    topics: formData.topics,
    materials: formData.materials,
    samples: formData.samples,
    sentiment: formData.sentiment,
    outcomes: formData.outcomes,
    follow_up_actions: formData.followUpActions,
  };

  const response = await api.post("/interactions/", payload);

  return response.data;
};

export const assistantChat = async (message: string) => {
  const response = await api.post("/assistant/chat", {
    message,
  });

  return response.data;
};

export const getInteractions = async () => {
  const response = await api.get("/interactions/");
  return response.data;
};

export const getInteraction = async (id: number) => {
  const response = await api.get(`/interactions/${id}`);
  return response.data;
};

export const updateInteraction = async (
  id: number,
  data: any
) => {
  const response = await api.put(`/interactions/${id}`, data);
  return response.data;
};

export const deleteInteraction = async (
  id: number
) => {
  return api.delete(`/interactions/${id}`);
};