'use client'

import styles from './userpage.module.scss'
import { useParams } from 'next/navigation'

export default function UserPage() {
    const { id } = useParams()
    return (
        <div>
            Страница юзера с id {id}
        </div>
    )
}