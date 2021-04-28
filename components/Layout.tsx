import {Navbar} from './navbar/Navbar';
import {Footer} from './Footer'
import {Header} from './Header'

export const Layout:React.FC<{}> = ({children}) => (  
  
<div className="allContent">
<Header>
<Navbar/> 
</Header>

{children}
<Footer/>
</div>
 )

