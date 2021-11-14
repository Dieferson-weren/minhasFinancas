import React from 'react';
import Rotas from './rotas';


import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'

class App extends React.Component{

 // eslint-disable-next-line react/require-render-return
 render(){
   return(
      <div>
        <Rotas/>
      </div>
   )
   
 }
}

export default App;
