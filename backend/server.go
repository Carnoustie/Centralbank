package main

import (
	"fmt"
	"io"
	"net/http"
	"time"
)

type maturityInYears string;

const(
	one maturityInYears = "1"
	two maturityInYears = "2"
	five maturityInYears = "5"
	ten maturityInYears = "10"
)

type govtBondPriceData struct{
	country countryCode
	start time.Time
	maturity maturityInYears
}

type countryCode string;

const(
	Finland countryCode = "FI"
	Denmark countryCode = "DK"
	Sweden countryCode = "SE"
	Unitedstates countryCode = "US"
	Greatbritain countryCode = "GB"
	Germany countryCode = "DE"
	France countryCode = "FR"
	Japan countryCode = "JP"
	Netherlands countryCode = "NL"
	Europe countryCode = "EM"
)



type responseStructure struct{
	Method string `json:"method"`
	Header string `json: "header"`
	Body string `json:"body"`
}


func getYieldCurve(w http.ResponseWriter, r* http.Request){
	
	fmt.Println("\nHit API\n")

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

	cc,_ := io.ReadAll(r.Body)
	
	fmt.Printf("\ncc %b", cc)

	url := fmt.Sprintf("https://api.riksbank.se/swea/v1/Observations/%sGVB%sY/1987-01-05", "GB", "10")
	res, _ := http.Get(url)
	data := res.Body

	var buffer []byte

	buffer, _ = io.ReadAll(data)

	fmt.Printf(string(buffer))

	io.WriteString(w, "Yield curve is on its way!")

}


func main(){

	fmt.Println("\n\nCentral Bank is running!\n\n")	
	http.HandleFunc("/getYieldCurve", getYieldCurve)
	http.ListenAndServe("localhost:8000", nil)


}
