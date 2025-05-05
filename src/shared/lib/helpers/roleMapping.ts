const roleMap: Record<string, string> = {
    'user': 'Участник',
    'admin': 'Администратор',
    'organizer': 'Организатор',
    'helper': 'Техническая поддержка',
    'jury': 'Член жюри'
}

export const mapRole = (roleKey: string): string => {
    return roleKey in roleMap ? roleMap[roleKey] : roleKey
}