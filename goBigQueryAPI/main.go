package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net"
	"net/http"

	"cloud.google.com/go/bigquery"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

const keyServerAddr = "serverAddr"

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!\n")
	//queryBasic(w, "trackor-test")
	fmt.Println("Endpoint Hit: homePage")
}

func handleRequests(ctx context.Context) {

	mux := http.NewServeMux()
	mux.HandleFunc("/", getRoot)
	mux.HandleFunc("/evalforecast", getEvalForecast)
	//mux.HandleFunc("/hello", getHello)
	mux.HandleFunc("/sales", getSales)

	server := &http.Server{
		Addr:    ":3333",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, keyServerAddr, l.Addr().String())
			return ctx
		},
	}

	err := server.ListenAndServe()
	if errors.Is(err, http.ErrServerClosed) {
		fmt.Printf("server closed\n")
	} else if err != nil {
		fmt.Printf("error listening for server: %s\n", err)
	}
}

type LiquorSalesRow struct {
	Invoice_Number string            `bigquery:"invoice_and_item_number"`
	Date           bigquery.NullDate `bigquery:"date"`
	StoreNumber    string            `bigquery:"store_number"`
	ItemDesc       string            `bigquery:"item_description"`
	Sold           int               `bigquery:"bottles_sold"`
	Sales          float64           `bigquery:"sale_dollars"`
}

type Evaluate_Forecast struct {
	// ItemName     string  `bigquery:"item_name"`
	// NonSeasonalP int     `bigquery:"non_seasonal_p"`
	// NonSeasonalD int     `bigquery:"non_seasonal_d"`
	// NonSeasonalQ int     `bigquery:"non_seasonal_q"`
	// Drift        bool    `bigquery:"has_drift"`
	// Likelihood   float64 `bigquery:"log_likelihood"`
	// AIC          float64 `bigquery:"AIC"`
	// Var          float64 `bigquery:"variance"`
	TimeStamp   bigquery.NullDate `bigquery:"timestamp"`
	ItemName    string            `bigquery:"item_name"`
	HistoryVal  int               `bigquery:"history_value"`
	ForecastVal float64           `bigquery:"forecast_value"`
	LowerBound  float64           `bigquery:"prediction_interval_lower_bound"`
	UpperBound  float64           `bigquery:"prediction_interval_upper_bound"`
	//SeasonalPeriods string  `bigquery:"seasonal_periods"`
}

func getRoot(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	hasFirst := r.URL.Query().Has("first")
	first := r.URL.Query().Get("first")
	hasSecond := r.URL.Query().Has("second")
	second := r.URL.Query().Get("second")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("could not read body: %s\n", err)
	}

	fmt.Printf("%s: got / request. first(%t)=%s, second(%t)=%s, body:\n%s\n",
		ctx.Value(keyServerAddr),
		hasFirst, first,
		hasSecond, second,
		body)
	io.WriteString(w, "This is my website!\n")
}

func getEvalForecast(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	projectID := "trackor-test"

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
	w.Header().Set("Access-Control-Allow-Headers", "*")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("could not read body: %s\n", err)
	}

	fmt.Printf("%s: evalForecast, body:\n%s\n",
		ctx.Value(keyServerAddr),
		body)

	client, err := bigquery.NewClient(ctx, projectID, option.WithCredentialsFile("E:/goAPI/application_default_credentials.json"))
	if err != nil {
		log.Fatalf("bigquery.NewClient: %v", err)
	}
	defer client.Close()
	it := client.Datasets(ctx)
	for {
		dataset, err := it.Next()
		if err == iterator.Done {
			break
		}
		fmt.Println(dataset.DatasetID)
	}

	println("logged in")

	// if err := queryBasic(os.Stdout, projectID); err != nil {
	// 	log.Fatal(err)
	// }
	// queryString := "SELECT *  FROM " +
	// 	"ML.EVALUATE(MODEL bqmlforecast.arima_model)" +
	// 	"LIMIT 100"

	queryString := "SELECT * FROM `trackor-test.bqmlforecast.outputdata_datastudio` LIMIT 100"
	rows, err := query(ctx, client, queryString)
	if err != nil {
		log.Fatal(err)
	}
	// if err := printResults(w, rows); err != nil {
	// 	log.Fatal(err)
	// }
	fmt.Println("[")
	io.WriteString(w, "[")
	i := 1
	for {
		var row Evaluate_Forecast
		err := rows.Next(&row)
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println("error iterating through results: %w", err)
		}
		bytes, err := json.MarshalIndent(row, "", "\t")
		if err != nil {
			fmt.Println("error iterating through results: %w", err)
		}

		fmt.Println(string(bytes))
		io.WriteString(w, string(bytes)+"\n")
		if rows.TotalRows != uint64(i) {
			fmt.Println(",")
			io.WriteString(w, ",")
		}
		i++
		//fmt.Fprintf(w, "Invoice #: %s Store#: %s Item Description: %s Numbers Sold: %d, Sales Results: %f\n", row.Invoice_Number, row.StoreNumber, row.ItemDesc, row.Sold, row.Sales)
	}
	fmt.Println("]")
	io.WriteString(w, "]")
}

func getSales(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	projectID := "trackor-test"
	hasFirst := r.URL.Query().Has("first")
	first := r.URL.Query().Get("first")
	hasSecond := r.URL.Query().Has("second")
	second := r.URL.Query().Get("second")

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Printf("could not read body: %s\n", err)
	}

	fmt.Printf("%s: got / request. first(%t)=%s, second(%t)=%s, body:\n%s\n",
		ctx.Value(keyServerAddr),
		hasFirst, first,
		hasSecond, second,
		body)

	client, err := bigquery.NewClient(ctx, projectID, option.WithCredentialsFile("E:/goAPI/application_default_credentials.json"))
	if err != nil {
		log.Fatalf("bigquery.NewClient: %v", err)
	}
	defer client.Close()
	it := client.Datasets(ctx)
	for {
		dataset, err := it.Next()
		if err == iterator.Done {
			break
		}
		fmt.Println(dataset.DatasetID)
	}

	println("logged in")

	// if err := queryBasic(os.Stdout, projectID); err != nil {
	// 	log.Fatal(err)
	// }
	queryString := "SELECT invoice_and_item_number,date,store_number,item_description,bottles_sold,sale_dollars FROM `bigquery-public-data.iowa_liquor_sales.sales` " +
		"WHERE REGEXP_CONTAINS(" + first + ", r'(?i)" + second + "')" +
		"LIMIT 100"
	rows, err := query(ctx, client, queryString)
	if err != nil {
		log.Fatal(err)
	}
	// if err := printResults(w, rows); err != nil {
	// 	log.Fatal(err)
	// }
	fmt.Println("{ \"Search\": [")
	io.WriteString(w, "{ \"Search\": [")
	i := 1
	for {
		var row LiquorSalesRow
		err := rows.Next(&row)
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println("error iterating through results: %w", err)
		}
		bytes, err := json.MarshalIndent(row, "", "\t")
		if err != nil {
			fmt.Println("error iterating through results: %w", err)
		}

		fmt.Println(string(bytes))
		io.WriteString(w, string(bytes)+"\n")
		if rows.TotalRows != uint64(i) {
			fmt.Println(",")
			io.WriteString(w, ",")
		}
		i++
		//fmt.Fprintf(w, "Invoice #: %s Store#: %s Item Description: %s Numbers Sold: %d, Sales Results: %f\n", row.Invoice_Number, row.StoreNumber, row.ItemDesc, row.Sold, row.Sales)
	}
	fmt.Println("]\n}")
	io.WriteString(w, "]\n}")
}

func query(ctx context.Context, client *bigquery.Client, queryString string) (*bigquery.RowIterator, error) {

	query := client.Query(queryString)
	query.Location = "US"
	return query.Read(ctx)
}

// printResults prints results from a query to the Stack Overflow public dataset.
func printResults(w io.Writer, iter *bigquery.RowIterator) error {

	fmt.Println("{ \"Search\": [")
	io.WriteString(w, "{ \"Search\": [")
	i := 1
	for {
		var row LiquorSalesRow
		err := iter.Next(&row)
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("error iterating through results: %w", err)
		}
		bytes, err := json.MarshalIndent(row, "", "\t")
		if err != nil {
			return fmt.Errorf("error iterating through results: %w", err)
		}

		fmt.Println(string(bytes))
		io.WriteString(w, string(bytes)+"\n")
		if iter.TotalRows != uint64(i) {
			fmt.Println(",")
			io.WriteString(w, ",")
		}
		i++
		//fmt.Fprintf(w, "Invoice #: %s Store#: %s Item Description: %s Numbers Sold: %d, Sales Results: %f\n", row.Invoice_Number, row.StoreNumber, row.ItemDesc, row.Sold, row.Sales)
	}
	fmt.Println("]\n}")
	io.WriteString(w, "]\n}")
	return nil
}

func main() {
	ctx := context.Background()

	handleRequests(ctx)
}
