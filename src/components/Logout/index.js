
import { Redirect } from 'react-router-dom';

import {signOut} from '../../utils/firebaseStore';

function Logout(){
  signOut()
  return <Redirect to='/' />
}

export default Logout;