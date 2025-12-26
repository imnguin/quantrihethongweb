import Add from './Add';
import Edit from './Edit';
import Search from './Search'

const User = [
    {
        path : '/User',
        component : Search
    },
    {
        path : '/User/Add',
        component : Add
    },
    {
        path : '/User/Edit/:id',
        component : Edit
    },

]
export default User;