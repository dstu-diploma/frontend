export const roleMap: Record<string, string> = {
  user: 'Участник',
  admin: 'Администратор',
  organizer: 'Организатор',
  helper: 'Тех.поддержка',
  jury: 'Член жюри',
} as const

export type RoleMapValues = (typeof roleMap)[keyof typeof roleMap]

export const mapRole = (roleKey: string): string => {
  return roleKey in roleMap ? roleMap[roleKey] : roleKey
}

export const mapRoleKey = (role: string): string => {
  return Object.keys(roleMap).find(key => roleMap[key] === role) || role
}
