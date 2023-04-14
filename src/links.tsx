import PeopleIcon from '@mui/icons-material/People'
import BusinessIcon from '@mui/icons-material/Business'
import TurnedInIcon from '@mui/icons-material/TurnedIn'
import CategoryIcon from '@mui/icons-material/Category'

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
    links: [
        {
            icon: <TurnedInIcon/>,
            title: 'Наборы',
            to: '/kits'
        },
        {
            icon: <CategoryIcon/>,
            title: 'Предметы',
            to: '/items'
        }
    ]
}
