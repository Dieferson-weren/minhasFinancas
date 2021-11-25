import React from 'react';
import Rotas from './rotas';
import NavBar from '../components/navBar';
import ProviderAuth from './providerAuth';
import 'toastr/build/toastr.min'


import 'bootswatch/dist/flatly/bootstrap.css'
import './custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'


class App extends React.Component {

  // eslint-disable-next-line react/require-render-return
  render() {
    return (
      <ProviderAuth>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProviderAuth>
    )

  }
}

export default App;
