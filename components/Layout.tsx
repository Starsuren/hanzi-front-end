import {Navbar} from './navbar/Navbar';
import {Footer} from './Footer'


export const Layout:React.FC<{}> = ({children}) => (  
<div className="allContent">
<Navbar/>
{children}
<Footer/>
</div>
 )

