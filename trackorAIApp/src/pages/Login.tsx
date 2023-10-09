import {
	IonPage,
	IonButton,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	useIonRouter,
	IonCard,
	IonInput,
	IonItem,
	IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useRealmApp } from '../hooks/Realm';
import * as Realm from 'realm-web';

const Login: React.FC = () => {
	const history = useHistory();
	const app = useRealmApp();
	const [isRegistering, setRegistering] = useState(false);
	const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
	const handleSubmit = async (e: any) => {
	  e.preventDefault();
	  if (isRegistering) {
		await register();
		return;
	  }
	  await login();
	  return;
	};
  
	const login = async () => {
		try {
		  await app.logIn!(
			Realm.Credentials.emailPassword(loginInfo.email, loginInfo.password)
		  );
		  history.push('/app');
		} catch (e: any) {
		  console.log(e);
		}
	  };
    var email = loginInfo.email
    var password = loginInfo.password
	  const register = async () => {
		try {
		  await app.emailPasswordAuth!.registerUser(
			 {email, password}
		  );
		  await login();
		} catch (e: any) {
		  console.log(e);
		}
	  };
	  
	const navigation = useIonRouter();

	const doLogin= () => {
		navigation.push('/app', 'forward', 'replace')
	}
	
   return ( 
//    <IonPage>
		
// 		<IonHeader>
// 			<IonToolbar color="primary">
// 				<IonTitle>Login</IonTitle>
// 			</IonToolbar>
// 		</IonHeader>
// 		<IonContent className="ion-padding">
// 		<IonButton onClick={() => login()} expand="full">
// 			login
// 			</IonButton>
// 		</IonContent>
//         </IonPage>
<IonPage className="login-page">
 		<IonHeader>
 			<IonToolbar color="primary">
 				<IonTitle>Login</IonTitle>
 			</IonToolbar>
 		</IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonCard>
            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                autocomplete="email"
                value={loginInfo.email}
                onIonChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.detail.value! })
                }
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput
                type="password"
                value={loginInfo.password}
                autocomplete="current-password"
                onIonChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.detail.value! })
                }
              />
            </IonItem>
          </IonCard>
          {isRegistering ? (
            <>
              <IonButton expand="block" fill="clear" type="submit">
                Register
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                onClick={() => setRegistering(false)}
              >
                Already Registered?
              </IonButton>
            </>
          ) : (
            <>
              <IonButton expand="block" fill="clear" type="submit">
                Login
              </IonButton>
              <IonButton
                expand="block"
                fill="clear"
                onClick={() => setRegistering(true)}
              >
                Registered
              </IonButton>
            </>
          )}
        </form>
      </IonContent>
    </IonPage>
   )
}
export default Login