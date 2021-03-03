import Link from 'next/link';
import { useApolloClient } from '@apollo/client';
import { useLoggedQuery , useLogoutMutation} from "../../generated/graphql";
export const Navbar:React.VFC = () => {
    
    const { data, loading } = useLoggedQuery();
    
    let nav = null;

    if(!data?.isLogged){
        nav = (   <nav>
            <ul>
            <li>   
        <Link href="/"><a>Home</a></Link>
         </li>
         <li>   
        <Link href="login"><a>Login</a></Link>
         </li>
         <li>
         <Link href="register"><a>Register</a></Link>
         </li>
            </ul>
            </nav>)

    }
    else {
nav = (   <nav>
    <ul>
    <li>   
<Link href="/"><a>Home</a></Link>
 </li>
 <li>   
<Link href="user"><a>{data?.isLogged.username}</a></Link>

 </li>
    </ul>
    </nav>)
    }

    
    return nav;
}
