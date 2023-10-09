import React from "react";
import {IonButton, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";


const Suppliers: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
			<IonToolbar color="primary">
				<IonButton slot='start'>
					<IonMenuButton></IonMenuButton>
				</IonButton>
				<IonTitle>Suppliers</IonTitle>
			</IonToolbar>
		</IonHeader>
        </IonPage>
);
};

export default Suppliers