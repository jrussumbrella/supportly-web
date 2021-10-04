import apiClient from '../../../utils/api-client';
import { Ticket } from '../types/index';

export const getMyTickets = async (): Promise<Ticket[]> => {
  const { data } = await apiClient.get('/tickets/me');
  return data.data;
};