export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost';
export const USER_SERVICE_API_URL = API_URL ? API_URL + '/user' : 'http://localhost/user';
export const TEAM_SERVICE_API_URL = API_URL ? API_URL + '/team' : 'http://localhost/team';
export const HACKATHON_SERVICE_API_URL = API_URL ? API_URL + '/hackathon' : 'http://localhost/hackathon';

