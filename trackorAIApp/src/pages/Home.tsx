import {
		IonPage,
		IonButtons,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonMenuButton,
		IonButton,
		IonCard,
		IonCardHeader,
		IonCardSubtitle,
		IonCardTitle
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
	
  return (
	<IonPage>
		
		<IonHeader>
			<IonToolbar color="primary">
				
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
				<IonTitle>Home</IonTitle>
			</IonToolbar>
		</IonHeader>
		
		
		<IonContent>
			<IonCard color="light">
				<IonCardHeader >
					<IonCardTitle>Upcoming Orders </IonCardTitle>
					<IonCardSubtitle></IonCardSubtitle>
				</IonCardHeader>

				<IonButton fill="clear">See more</IonButton>
				<IonButton fill="clear">New Order</IonButton>
			</IonCard>
			
			<IonCard color="light">
				<IonCardHeader >
					<IonCardTitle>Trends</IonCardTitle>
					<IonCardSubtitle>Your top trends</IonCardSubtitle>
				</IonCardHeader>

				<IonButton fill="clear">Weekly</IonButton>
				<IonButton fill="clear">Daily</IonButton>
			</IonCard>

		</IonContent>
	</IonPage>
	);
};

export default Home;
