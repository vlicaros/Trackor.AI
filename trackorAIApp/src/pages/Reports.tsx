import React, { Component } from "react";
import {IonButton, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonContent, IonItem, IonApp, IonCard} from "@ionic/react";
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, TimeSeries, FusionTheme);

const dataSource = {
	chart: {
	  caption: "Countries With Most Oil Reserves [2017-18]",
	  subCaption: "In MMbbl = One Million barrels",
	  xAxisName: "Country",
	  yAxisName: "Reserves (MMbbl)",
	  numberSuffix: "K",
	  theme: "fusion"
	},
	data: [
		{
				"ItemName": "BLACK VELVET",
				"NonSeasonalP": 3,
				"NonSeasonalD": 1,
				"NonSeasonalQ": 2,
				"Drift": false,
				"Likelihood": -4132.3456442552815,
				"AIC": 8276.691288510563,
				"Var": 562466.1027830398
		}
		,
		{
				"ItemName": "FIREBALL CINNAMON WHISKEY",
				"NonSeasonalP": 2,
				"NonSeasonalD": 1,
				"NonSeasonalQ": 1,
				"Drift": true,
				"Likelihood": -3683.0185117681986,
				"AIC": 7376.037023536397,
				"Var": 97168.31817849955
		}
		,
		{
				"ItemName": "FIVE O'CLOCK VODKA",
				"NonSeasonalP": 3,
				"NonSeasonalD": 0,
				"NonSeasonalQ": 2,
				"Drift": false,
				"Likelihood": -3493.5002778780386,
				"AIC": 7001.000555756077,
				"Var": 9096.43577097849
		}
		,
		{
				"ItemName": "HAWKEYE VODKA",
				"NonSeasonalP": 2,
				"NonSeasonalD": 1,
				"NonSeasonalQ": 2,
				"Drift": false,
				"Likelihood": -3785.0021525942157,
				"AIC": 7580.004305188431,
				"Var": 145425.32641492158
		}
		,
		{
				"ItemName": "TITOS HANDMADE VODKA",
				"NonSeasonalP": 0,
				"NonSeasonalD": 1,
				"NonSeasonalQ": 5,
				"Drift": false,
				"Likelihood": -3807.244654178687,
				"AIC": 7626.489308357374,
				"Var": 157343.3251403345
		}
		]
}
const evalforecastChart =  new FusionCharts({
	type: "timeseries",
	width: 100,
	height: 20,
	//dataFormat: "jsonurl",
	dataFormat: "json",
	//dataSource: 'http://vlicaroslt:3333/evalforecast'
	dataSource: dataSource
  });

evalforecastChart.render("chart-container")

const Reports: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
			<IonToolbar color="primary">
				<IonButton slot='start'>
					<IonMenuButton></IonMenuButton>
				</IonButton>
				<IonTitle>Reports</IonTitle>
			</IonToolbar>
		</IonHeader>
		<IonContent id="main-content" className="ion-padding">
			<IonItem >
				<IonCard id="chart-container">
				</IonCard>
			</IonItem>
		</IonContent>
        </IonPage>
);
};

export default Reports