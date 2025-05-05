import { invitesApi } from "./invitesApi";
import { teamBaseApi } from "./teamBaseApi";

export const teamApi = {
  ...teamBaseApi,
  ...invitesApi,
}