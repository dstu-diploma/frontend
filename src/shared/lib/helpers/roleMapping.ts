const roleMap: Record<string, string> = {
    'user': 'Участник',
    'admin': 'Администратор',
    'organizer': 'Организатор'
}

export const mapRole = (roleKey: string): string => {
    return roleKey in roleMap ? roleMap[roleKey] : roleKey
}