import React from "react";
import {IonButton, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";


const Settings: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
			<IonToolbar color="primary">
				<IonButton slot='start'>
					<IonMenuButton></IonMenuButton>
				</IonButton>
				<IonTitle>Settings</IonTitle>
			</IonToolbar>
		</IonHeader>
        </IonPage>
);
};

export default Settings