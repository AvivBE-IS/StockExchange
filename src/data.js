const API_KEY = "ISP0KzQ621aJDAuN2m2Tf6BP6ghRiPr0";
const SEARCH_BOX = $("#searchBox");

const getSearchInput = function () {
  const inputValue = SEARCH_BOX.val();
  if (!inputValue) {
    console.log("No value.");
    return null;
  } else {
    console.log("Search input:", inputValue);
    return inputValue;
  }
};

async function searchStocks(inputValue) {
  if (!inputValue) {
    console.error("Search input is empty.");
    return [];
  }

  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/search?query=${inputValue}&limit=10&exchange=NASDAQ&apikey=${API_KEY}`
    );
    const data = await response.json();
    console.log("Search Results:", data);
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

const addingSymbols = function (symbols) {
  const stockList = document.getElementById("stockList");

  // Clear previous results
  stockList.innerHTML = "";

  symbols.forEach((symbol) => {
    const li = document.createElement("li");
    li.textContent = symbol;
    stockList.appendChild(li);
  });

  console.log("Symbols have been added.");
};

async function handleSearchClick() {
  const inputValue = getSearchInput();
  if (!inputValue) return;

  const currStocks = await searchStocks(inputValue);
  const symbols = currStocks.map((stock) => stock.symbol);
  addingSymbols(symbols);
}

$("#btnSearch").on("click", handleSearchClick);
