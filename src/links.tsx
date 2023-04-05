import PeopleIcon from '@mui/icons-material/People'
import BusinessIcon from '@mui/icons-material/Business'

interface IRoleLinks {
    heading: string
    prefix: string
    links: Links
}

export const adminLinks: IRoleLinks = {
    heading: 'Администратор',
    prefix: '/admin',
    links: [
        {
            icon: <PeopleIcon/>,
            title: 'Пользователи',
            to: '/users',
        },
        {
            icon: <BusinessIcon/>,
            title: 'Департаменты',
            to: '/departments'
        }
    ]
}

export const directorLinks: IRoleLinks = {
    heading: 'Директор Департамента',
    prefix: '/director',
    links: []
}
