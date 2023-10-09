import {
	IonButton,  
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonItem,
	IonIcon,
	IonPage,
	IonMenu,
    IonSplitPane,
    IonRouterOutlet,
    IonMenuToggle
} from '@ionic/react';
import { homeOutline, logOutOutline, newspaperOutline, serverOutline, settingsOutline, statsChartOutline} from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import Home from './Home';
import Inventory from './Inventory';
import Orders from './Orders';
import Suppliers from './Suppliers';
import Reports from './Reports';
import Settings from './Settings';

const Menu: React.FC = () => {

    const paths = [
        { name: 'Home', url: '/app/Home', icon: homeOutline},
        { name: 'Inventory', url: '/app/Inventory', icon: serverOutline},
        { name: 'Orders', url: '/app/Orders', icon: newspaperOutline},
        { name: 'Suppliers', url: '/app/Suppliers', icon: newspaperOutline},
        { name: 'Reports/Analytics', url: '/app/Reports', icon: statsChartOutline},
        { name: 'Settings', url: '/app/Settings', icon: settingsOutline}
    ]

   return ( 
    <IonPage>
    <IonSplitPane contentId="main">
        <IonMenu contentId="main">
        <IonHeader>
           <IonToolbar>
             <IonTitle>Trackor.AI</IonTitle>
           </IonToolbar>
         </IonHeader>
         <IonContent>
            {paths.map((item, index) => (
                <IonMenuToggle key={index}>
                    <IonItem routerLink={item.url} routerDirection="none">
                        <IonIcon icon={item.icon} slot='start'></IonIcon>
                        {item.name}
                    </IonItem>
                </IonMenuToggle>
            ))}
            <IonButton 
            routerLink="/app" 
            routerDirection="back"
            expand="full">
                <IonIcon icon={logOutOutline} slot='start'></IonIcon>
                Logout
            </IonButton>
         </IonContent>
         </IonMenu>
        <IonRouterOutlet id="main">
            <Route exact path="/app/Home" component={Home}/>
            <Route exact path="/app/Inventory" component={Inventory}/>
            <Route exact path="/app/Orders" component={Orders}/>
            <Route exact path="/app/Suppliers" component={Suppliers}/>
            <Route exact path="/app/Reports" component={Reports}/>
            <Route exact path="/app/Settings" component={Settings}/>
            <Route exact path="/app">
                <Redirect to="/app/Home"/>
            </Route>
            
        </IonRouterOutlet>
    </IonSplitPane>
    </IonPage>
//    <IonPage>
// 		    <IonMenu contentId="main-content">
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle>Trackor.AI</IonTitle>
//           </IonToolbar>
//         </IonHeader>
//         <IonContent className="ion-padding">
//       <IonList>
//       <IonItemDivider></IonItemDivider>
			
//       <IonItem routerLink="/">
//         <IonLabel>Home</IonLabel>
//       </IonItem>
// 			<IonItem>Inventory</IonItem>
// 			<IonItem>Orders</IonItem>
// 			<IonItem>Suppliers</IonItem>
// 			<IonItem>Analytics & Reporting</IonItem>
// 			<IonItem>Settings</IonItem>
//       </IonList>
// 		</IonContent>
//       </IonMenu >
// 		<IonHeader>
// 			<IonToolbar color="primary">
				
//             <IonButtons slot="start">
//               <IonMenuButton></IonMenuButton>
//             </IonButtons>
// 				<IonTitle>Menu</IonTitle>
// 			</IonToolbar>
// 		</IonHeader>
//         </IonPage>
   )
}
export default Menu