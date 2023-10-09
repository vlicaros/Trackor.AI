// Typescript custom enum for search types (optional)
export enum SearchType {
	all = '',
	movie = 'movie',
	series = 'series',
	episode = 'episode'
}

export interface SearchResult {
	/*Title: string;
	Year: string;
	Poster: string;
	imdbID: string;
	Type: string;*/
	Invoice_Number: string;
	Date: string;
	StoreNumber: string;
	ItemDesc: string;
	Sold: string;
	Sales: string;
}

export interface SearchError {
	Response: string;
	Error: string;
}

export interface DetailsResult {
	Genre: string;
	Title: string;
	Year: string;
	Poster: string;
	Plot: string;
	imdbRating: string;
	Director: string;
	Actors: string;
	Website: string;
	Awards: string;
	/**/
}

export interface EvalForecast {
	ItemName: string;
	NonSeasonalP: string;
	NonSeasonalD: string;
	NonSeasonalQ: string;
	Drift: string;
	Likelihood: string;
	AIC: string;
	Var: string;
}


export const useApi = () => {
	/*let url = 'https://www.omdbapi.com/';
	let apiKey = '42d66a88';

	const searchData = async (title: string, type: SearchType): Promise<SearchResult[] | SearchError> => {
		const result = await fetch(`${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`);

		return result.json();
	};

	const getDetails = async (id: string): Promise<DetailsResult> => {
		const result = await fetch(`${url}?i=${id}&plot=full&apikey=${apiKey}`);
		return result.json();
	};*/
	
	let url = 'http://vlicaroslt:3333';
	
	const searchData = async (title: string, type: SearchType): Promise<SearchResult[] | SearchError> => {
		const result = await fetch(`${url}/sales?first=${encodeURI(type)}&second=${title}`);

		return result.json();
	};

	const getDetails = async (id: string): Promise<DetailsResult> => {
		const result = await fetch(`${url}?first=${id}&second=full`);
		return result.json();
	};

	const getEvalForecast = async (): Promise<EvalForecast> => {
		const result = await fetch(`${url}/evalforecast`);
		return result.json();
	};
	

	return {
		searchData,
		getDetails,
		getEvalForecast
	};
};

export default useApi;