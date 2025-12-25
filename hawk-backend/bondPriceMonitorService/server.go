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


func getBondPriceData(priceDataSpecs govtBondPriceData) {
	url := fmt.Sprintf("https://api.riksbank.se/swea/v1/Observations/%sGVB%sY/1987-01-05", priceDataSpecs.country, priceDataSpecs.maturity)
	res, _ := http.Get(url)
	data := res.Body

	var buffer []byte

	buffer, _ = io.ReadAll(data)

	fmt.Printf(string(buffer))

}

func main(){
	example := govtBondPriceData{Japan, time.Now(), ten}
	getBondPriceData(example)
}
