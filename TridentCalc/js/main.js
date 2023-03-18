class API {
  // Fetches the latest Grand Exchange data for required items
  static async fetchGEData() {
    try {
      const response = await fetch("https://prices.runescape.wiki/api/v1/osrs/latest");
      const data = await response.json();
      return {
        deathRuneLow: data.data[560].low,
        chaosRuneLow: data.data[562].low,
        fireRuneLow: data.data[554].low,
        unchargedTridentLow: data.data[11908].low,
        chargedTridentHigh: data.data[11905].high,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
}

class Calculator {
  constructor(itemInfo = {}) {
    this.itemInfo = itemInfo;
    this.tax = 0.01;
    // Initialize DOM elements
    this.elements = {
      number: document.querySelector("#number"),
      deaths: document.querySelector("#deathCost"),
      chaos: document.querySelector("#chaosCost"),
      fires: document.querySelector("#fireCost"),
      tridents: document.querySelector("#tridentCost"),
      sellValue: document.querySelector("#sellPrice"),
      deathsCost: document.querySelector(".scaledDeaths"),
      chaosCost: document.querySelector(".scaledChaos"),
      fireCost: document.querySelector(".scaledFires"),
      tridentsCost: document.querySelector(".scaledTridents"),
      castsCost: document.querySelector(".scaledCasts"),
      scaledSales: document.querySelector(".scaledSales"),
      combinedCostElement: document.querySelector(".combinedCost"),
      taxCost: document.querySelector(".taxCost"),
      totalProfit: document.querySelector(".totalProfit"),
    };

    this.updateAndRender(true);
  }

  // Updates values and renders the results
  updateAndRender(updateInputs = false) {
    if (updateInputs) {
      this.elements.deaths.value = this.itemInfo.deathRuneLow;
      this.elements.chaos.value = this.itemInfo.chaosRuneLow;
      this.elements.fires.value = this.itemInfo.fireRuneLow;
      this.elements.tridents.value = this.itemInfo.unchargedTridentLow;
      this.elements.sellValue.value = this.itemInfo.chargedTridentHigh;
    }
    this.renderAll();
  }

  // Calculates the costs, sales, and profits
  calculateCosts() {
    const number = parseFloat(this.elements.number.value);
    const deathRuneCost = parseFloat(this.elements.deaths.value);
    const fireRuneCost = parseFloat(this.elements.fires.value);
    const chaosRuneCost = parseFloat(this.elements.chaos.value);
    const unchargedTridentCost = parseFloat(this.elements.tridents.value);
    const chargedTridentSellPrice = parseFloat(this.elements.sellValue.value);

    return {
      tridentCost: number * unchargedTridentCost,
      chaosCost: number * chaosRuneCost * 2500,
      deathsCost: number * deathRuneCost * 2500,
      firesCost: number * fireRuneCost * 12500,
      castsCost: number * 10 * 2500,
      saleValue: number * chargedTridentSellPrice,
    };
  }

  // Renders the calculated costs, sales, and profits in the DOM
  renderAll() {
    const costs = this.calculateCosts();
    const combinedCost = costs.tridentCost + costs.chaosCost + costs.deathsCost + costs.firesCost + costs.castsCost;
    const taxCost = costs.saleValue * this.tax;

    this.elements.tridentsCost.textContent =     `${costs.tridentCost.toLocaleString()} (${this.elements.number.value.toLocaleString()})`;
    this.elements.chaosCost.textContent = `${costs.chaosCost.toLocaleString()} (${(2500 * this.elements.number.value).toLocaleString()})`;
    this.elements.deathsCost.textContent = `${costs.deathsCost.toLocaleString()} (${(2500 * this.elements.number.value).toLocaleString()})`;
    this.elements.fireCost.textContent = `${costs.firesCost.toLocaleString()} (${(12500 * this.elements.number.value).toLocaleString()})`;
    this.elements.castsCost.textContent = `${costs.castsCost.toLocaleString()} (${(2500 * this.elements.number.value).toLocaleString()})`;
    this.elements.scaledSales.textContent = costs.saleValue.toLocaleString();
    this.elements.combinedCostElement.textContent = combinedCost.toLocaleString();
    this.elements.taxCost.textContent = taxCost.toLocaleString();
    this.elements.totalProfit.textContent = (costs.saleValue - combinedCost - taxCost).toLocaleString();

    // Notify profit
    const profitThreshold = parseFloat(document.querySelector(".profit-threshold").value);
    const singleProfit = (costs.saleValue - combinedCost - taxCost) / parseFloat(this.elements.number.value);
    if (document.querySelector("#notify").checked && singleProfit >= profitThreshold) {
      document.querySelector("#audio-notification").play();
    }
  }
}

async function initializeCalculator() {
  const itemInfo = await API.fetchGEData();
  if (!itemInfo) {
    // Handle API error and display a message to the user.
    return;
  }
  const calculator = new Calculator(itemInfo);

  // Set up event listeners for inputs and buttons.
  const inputs = document.querySelectorAll("input");
  const button = document.querySelector("#button");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      calculator.updateAndRender(false);
    });
  });

  button.addEventListener("click", () => {
    document.querySelector("form").reset();
    calculator.updateAndRender(true);
  });

  // Add event listener for the "autoupdate" checkbox.
  const autoupdateCheckbox = document.querySelector("#autoupdate");
  let autoupdateInterval;
  autoupdateCheckbox.addEventListener("change", async () => {
    if (autoupdateCheckbox.checked) {
      const updatedItemInfo = await API.fetchGEData();
      if (updatedItemInfo) {
        calculator.itemInfo = updatedItemInfo;
        calculator.updateAndRender(true);
      }
      autoupdateInterval = setInterval(async () => {
        const updatedItemInfo = await API.fetchGEData();
        if (updatedItemInfo) {
          calculator.itemInfo = updatedItemInfo;
          calculator.updateAndRender();
        }
      }, 120000);
    } else {
      clearInterval(autoupdateInterval);
    }
  });

  return calculator;
}

initializeCalculator()
  .then((calculator) => {
    // Event listeners are already set up in the initializeCalculator function, so no need to add them again here.
  })
  .catch((error) => {
    console.error("Error initializing calculator:", error);
  });

