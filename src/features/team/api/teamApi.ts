import { invitesApi } from "./invitesApi";
import { teamBaseApi } from "./teamBaseApi";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';

export const teamApi = {
  ...teamBaseApi,
  ...invitesApi,
}