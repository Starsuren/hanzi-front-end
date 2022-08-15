import {Navbar} from './navbar/Navbar';
import {Footer} from './Footer'
import {Header} from './Header'

export const Layout:React.FC<React.PropsWithChildren> = ({children}) => (  
  
<div className="allContent">
<div id="portal"></div>
<Header>
<Navbar/> 
</Header>
{children}
<Footer/>
</div>
 )

