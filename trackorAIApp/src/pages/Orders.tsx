import React from "react";
import {IonButton, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from "@ionic/react";

const Orders: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
			<IonToolbar color="primary">
				<IonButton slot='start'>
					<IonMenuButton></IonMenuButton>
				</IonButton>
				<IonTitle>Orders</IonTitle>
			</IonToolbar>
		</IonHeader>
        </IonPage>
);
};

export default Orders