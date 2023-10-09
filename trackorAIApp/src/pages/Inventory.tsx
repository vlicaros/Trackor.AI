import {
	IonButton, 
	IonMenuButton, 
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonList,
	useIonLoading,
	useIonAlert,
	IonPage
} from '@ionic/react';
import './Home.css';
import { useState, useEffect } from 'react';
import useApi, { SearchResult } from '../hooks/useApi';
import { SearchType } from '../hooks/useApi';
import { gameControllerOutline, tvOutline, videocamOutline } from 'ionicons/icons';


const Inventory: React.FC = () => {
	const { searchData } = useApi();

	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<SearchType>(SearchType.all);
	const [results, setResults] = useState<SearchResult[]>([]);
 	const [loading, dismiss] = useIonLoading()
	const [presentAlert] = useIonAlert();
 
  useEffect(() => {
    if (searchTerm === '') {
		setResults([])
		return
	}

	const loadData = async () => {
		await loading()
		const result: any = await searchData(searchTerm, type);
		console.log(' ~ file: Home.tsx:42 ~ load data ~ result', result)
		await dismiss()
				
		if (result?.Error){
			presentAlert(result.Error)//setResults(result.Search);
		} else {
			setResults(result.Search)
		}
	}
	loadData()
  }, [searchTerm]);

   return ( <IonPage>
		
		<IonHeader>
			<IonToolbar color="primary">
				<IonButton slot='start'>
					<IonMenuButton></IonMenuButton>
				</IonButton>
				<IonTitle>Sales</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent id="main-content" className="ion-padding">
			<IonSearchbar
				value={searchTerm}
				debounce={300}
				onIonChange={(e) => setSearchTerm(e.detail.value!)}
			></IonSearchbar>

			<IonItem>
				<IonLabel>Select Search Type</IonLabel>
				<IonSelect value={type} defaultValue={"item_description"} onIonChange={(e) => setType(e.detail.value!)}>
					<IonSelectOption value="item_description">Item Description</IonSelectOption>
					<IonSelectOption value="store_number">Store Number</IonSelectOption>
					<IonSelectOption value="invoice_and_item_number">Invoice Number</IonSelectOption>
				</IonSelect>
			</IonItem>

			<IonList> 
				{results.map((item: SearchResult) => (
					/*<IonItem button routerLink={`/movies/${item.imdbID}`} key={item.imdbID}>
						<IonLabel className="ion-text-wrap">{item.Title}</IonLabel>
						<IonAvatar slot='start'>
							{item.Poster && <IonImg src={item.Poster} />} 
						</IonAvatar>
						{item.Type === 'movie' && <IonIcon slot="end" icon={videocamOutline} />}
					 	{item.Type === 'series' && <IonIcon slot="end" icon={tvOutline} />}
					 	{item.Type === 'game' && <IonIcon slot="end" icon={gameControllerOutline} />}
					</IonItem>*/
					<IonItem button routerLink={`/movies/${item.Invoice_Number}`} key={item.Invoice_Number}>
						<IonLabel className="ion-text-wrap">
							<h1>{item.Invoice_Number}</h1>
							<p>{item.ItemDesc} Sold: {item.Sold} Sales: {item.Sales}</p>
						</IonLabel>
					</IonItem>
				))}
			</IonList>
		</IonContent>
        </IonPage>
   )
}
export default Inventory