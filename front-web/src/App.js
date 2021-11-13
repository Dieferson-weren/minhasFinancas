import React from 'react';
import Login from './view/login'

import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'

class App extends React.Component{

 // eslint-disable-next-line react/require-render-return
 render(){
   return(
      <div>
        <Login/>
      </div>
   )
   
 }
}

export default App;
