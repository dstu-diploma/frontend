import { invitesApi } from "./invitesApi";
import { teamBaseApi } from "./teamBaseApi";
import { hackathonTeamsApi } from "./hackathonTeamsApi";
import { adminTeamApi } from "./admin";

export const teamApi = {
  ...teamBaseApi,
  ...invitesApi,
  ...hackathonTeamsApi,
  ...adminTeamApi,
}