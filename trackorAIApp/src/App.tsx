import { Redirect, Route } from 'react-router-dom';
import { IonList, IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Details from './pages/Details';
import Menu from './pages/Menu';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import RealmApolloProvider from './graphql/RealmApolloProvider';
import { RealmAppProvider, useRealmApp } from './hooks/Realm';

setupIonicReact();

export const APP_ID = 'application-0-vibzz';

const App: React.FC = () => (
  <RealmAppProvider appId={APP_ID}>
  <RealmApolloProvider>
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Login}/>
        <Route exact path="/app/Inventory" component={Inventory}/>
        <Route exact path="/app/Inventory" component={Reports}/>
        <Route path="/app" component={Menu}/>
        <Route exact path="/movies" component={Home}/>
        <Route exact path="/movies/:id" component={Details}/>
        {/* <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route> */}
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
      </RealmApolloProvider>
    </RealmAppProvider>
);

export default App;
