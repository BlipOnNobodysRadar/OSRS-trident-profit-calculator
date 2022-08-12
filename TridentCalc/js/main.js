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
  renderTridentCost() {
    console.log("Trident cost render");
    const cost = this.number.value * this.tridents.value;
    this.combinedCost = this.combinedCost + cost;
    this.tridentsCost.innerHTML = cost.toLocaleString();
  }
  renderDeathsCost() {
    console.log("Death cost render");
    const cost = this.number.value * this.deaths.value * 2500;
    this.combinedCost = this.combinedCost + cost;
    this.deathsCost.innerHTML = cost.toLocaleString();
  }
  renderChaosCost() {
    console.log("Chaos cost render");
    const cost = this.number.value * this.chaos.value * 2500;
    console.log(cost);
    this.combinedCost = this.combinedCost + cost;
    this.chaosCost.innerHTML = cost.toLocaleString();
  }
  renderFiresCost() {
    console.log("Fires cost render");
    const cost = this.number.value * this.fires.value * 12500;
    this.combinedCost = this.combinedCost + cost;
    this.fireCost.innerHTML = cost.toLocaleString();
  }
  renderCastsCost() {
    console.log("Casts cost render");
    const CAST_COST = 10;
    const cost = this.number.value * CAST_COST * 2500;
    this.combinedCost = this.combinedCost + cost;
    this.castsCost.innerHTML = cost.toLocaleString();
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
  }
}
let button = document.querySelector("#button");
let inputs = document.querySelectorAll("input");
let calculator = new Calculator();
calculator.renderAll();
inputs.forEach((input) =>
  input.addEventListener("input", () => {
    calculator = new Calculator();
    calculator.renderAll();
  })
);
button.addEventListener("click", () => {
  document.querySelector("form").reset();
  calculator = new Calculator();
  calculator.renderAll();
});
//console.log(calculator);
