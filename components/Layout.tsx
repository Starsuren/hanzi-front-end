import {Navbar} from './navbar/Navbar';
import {Footer} from './Footer'
import {Header} from './Header'

export const Layout:React.FC<{}> = ({children}) => (  
  
<div className="allContent">
<div id="portal"></div>
<Header>
<Navbar/> 
</Header>
{children}
<Footer/>
</div>
 )

