import apiClient from '../../../utils/api-client';
import { Ticket, TicketField } from '../types';

export const getMyTickets = async (): Promise<Ticket[]> => {
  const { data } = await apiClient.get('/tickets/mine');
  return data.tickets;
};

export const getTickets = async (): Promise<Ticket[]> => {
  const { data } = await apiClient.get('/tickets');
  return data.tickets;
};

export const getTicket = async (id: number): Promise<Ticket> => {
  const { data } = await apiClient.get(`/tickets/${id}`);
  return data.ticket;
};

export const deleteTicket = async (id: number): Promise<{ id: number }> => {
  await apiClient.delete(`/tickets/${id}`);
  return { id };
};

export const updateTicket = async ({
  id,
  fields,
}: {
  id: string;
  fields: TicketField;
}): Promise<Ticket> => {
  const { data } = await apiClient.put(`/tickets/${id}`, fields);
  return data.ticket;
};

export const createTicket = async (fields: TicketField): Promise<Ticket> => {
  const { data } = await apiClient.post('/tickets', fields);
  return data.ticket;
};
