import { Link } from 'react-router-dom';
import { logOut } from '../../utilities/users-service';

export default function NavBar({setUser, user}){
    function handleLogOut() {
        logOut();
        setUser(null);
    }
    return(
        <>
            <nav>
                <Link to="/movies">View Movies</Link>
                &nbsp; | &nbsp;
                <Link to="/movies/new">Add a Film</Link>
                &nbsp; | &nbsp;
                <span>Welcome, {user.name}</span>
                &nbsp; | &nbsp;
                &nbsp;&nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
            </nav>
        </>
    )
}