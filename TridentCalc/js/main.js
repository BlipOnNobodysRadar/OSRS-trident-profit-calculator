let button = document.querySelector("#button");
let inputs = document.querySelectorAll("input");
let profitThreshold = document.querySelector(".profit-threshold");
let audioNotification = document.querySelector("#audio-notification");

class Calculator {
  constructor() {
    this.number = document.querySelector("#number");
    this.deaths = document.querySelector("#deathCost");
    this.chaos = document.querySelector("#chaosCost");
    this.fires = document.querySelector("#fireCost");
    this.tridents = document.querySelector("#tridentCost");
    this.sellValue = document.querySelector("#sellPrice");
    this.deathsCost = document.querySelector(".scaledDeaths");
    this.chaosCost = document.querySelector(".scaledChaos");
    this.fireCost = document.querySelector(".scaledFires");
    this.tridentsCost = document.querySelector(".scaledTridents");
    this.castsCost = document.querySelector(".scaledCasts");
    this.scaledSales = document.querySelector(".scaledSales");
    this.combinedCostElement = document.querySelector(".combinedCost");
    this.taxCost = document.querySelector(".taxCost");
    this.totalProfit = document.querySelector(".totalProfit");
    this.tax = 0.01;
    this.totalTax = 0;
    this.combinedCost = 0;
    this.saleValue;
  }
  async setValuesFromGE() {
    let itemInfo = {};
    await fetch("https://prices.runescape.wiki/api/v1/osrs/latest")
      .then((res) => res.json())
      .then((data) => {
        itemInfo.deathRune = data.data[560];
        itemInfo.chaosRune = data.data[562];
        itemInfo.fireRune = data.data[554];
        itemInfo.unchargedTrident = data.data[11908];
        itemInfo.chargedTrident = data.data[11905];

        this.deaths.value = itemInfo.deathRune.low;
        this.fires.value = itemInfo.fireRune.low;
        this.chaos.value = itemInfo.chaosRune.low;
        this.tridents.value = itemInfo.unchargedTrident.low;
        this.sellValue.value = itemInfo.chargedTrident.high;

        this.renderAll();
      });
  }
  renderTridentCost() {
    const cost = this.number.value * this.tridents.value;
    this.combinedCost = this.combinedCost + cost;
    this.tridentsCost.innerHTML = `${cost.toLocaleString()} (${this.number.value.toLocaleString()})`;
  }
  renderDeathsCost() {
    const cost = this.number.value * this.deaths.value * 2500;
    this.combinedCost = this.combinedCost + cost;
    this.deathsCost.innerHTML = `${cost.toLocaleString()} (${(
      2500 * this.number.value
    ).toLocaleString()})`;
  }
  renderChaosCost() {
    const cost = this.number.value * this.chaos.value * 2500;
    this.combinedCost = this.combinedCost + cost;
    this.chaosCost.innerHTML = `${cost.toLocaleString()} (${(
      2500 * this.number.value
    ).toLocaleString()})`;
  }
  renderFiresCost() {
    const cost = this.number.value * this.fires.value * 12500;
    this.combinedCost = this.combinedCost + cost;
    this.fireCost.innerHTML = `${cost.toLocaleString()} (${(
      12500 * this.number.value
    ).toLocaleString()})`;
  }
  renderCastsCost() {
    const CAST_COST = 10;
    const cost = this.number.value * CAST_COST * 2500;
    this.combinedCost = this.combinedCost + cost;
    this.castsCost.innerHTML = `${cost.toLocaleString()} (${(
      2500 * this.number.value
    ).toLocaleString()})`;
  }
  renderSaleValue() {
    this.saleValue = this.sellValue.value * this.number.value;
    this.scaledSales.innerHTML = this.saleValue.toLocaleString();
  }
  renderTax() {
    this.totalTax = this.tax * this.saleValue;
    this.taxCost.innerHTML = this.totalTax.toLocaleString();
  }
  renderCombinedCost() {
    this.combinedCostElement.innerHTML = this.combinedCost.toLocaleString();
  }
  renderProfit() {
    this.totalProfit.innerHTML = Math.round(
      this.saleValue - this.combinedCost - this.tax
    ).toLocaleString();
  }

  renderAll() {
    this.combinedCost = 0;
    this.renderTridentCost();
    this.renderChaosCost();
    this.renderDeathsCost();
    this.renderFiresCost();
    this.renderCastsCost();
    this.renderSaleValue();
    this.renderTax();
    this.renderCombinedCost();
    this.renderProfit();
    if (document.querySelector("#notify").checked) {
      const singleProfit =
        Math.round(this.saleValue - this.combinedCost - this.tax) /
        this.number.value;
      if (singleProfit >= profitThreshold.value) {
        audioNotification.play();
      }
    }
  }
}
let calculator = new Calculator();
calculator.setValuesFromGE();
calculator.renderAll();
inputs.forEach((input) =>
  input.addEventListener("input", () => {
    calculator = new Calculator();
    calculator.renderAll();
  })
);
button.addEventListener("click", resetAndRender());
let autoupdateInterval;
document.querySelector("#autoupdate").addEventListener("change", () => {
  if (document.querySelector("#autoupdate").checked) {
    autoupdateInterval = setInterval(() => {
      calculator.setValuesFromGE();
      calculator.renderAll();
    }, 120000);
  } else {
    clearInterval(autoupdateInterval);
  }
});

function resetAndRender() {
  document.querySelector("form").reset();
  calculator = new Calculator();
  calculator.renderAll();
}
