"use strict"

const constantsForm = document.querySelector(".constantsForm");
const variablesForm = document.querySelector(".variablesForm");

constantsForm.addEventListener("submit", calcPayback);

function calcPayback(ev) {
  ev.preventDefault();
  const constantsFormData = new FormData(constantsForm);
  const payBackOutput = document.getElementById("payBackOutput");
  const clearProfitOutput = document.getElementById("clearProfitOutput");

  const mineBuildPrice = parseFloat( constantsFormData.get("mineBuildPrice").replace(",", "."));
  const mineProduction = parseFloat( constantsFormData.get("mineProduction").replace(",", "."));
  const resourcesPrice = parseFloat( constantsFormData.get("resourcesPrice").replace(",", "."));
  const mineQuality = parseFloat( constantsFormData.get("mineQuality").replace(",", ".")) / 100; //this value in percent
  const upgradeHeadquarter = parseFloat( constantsFormData.get("upgradeHeadquarter").replace(",", "."));
  const upgradeRate = parseFloat( constantsFormData.get("upgradeRate").replace(",", "."));
  const fullUpgradePrice = parseFloat( constantsFormData.get("fullUpgradePrice").replace(",", "."));
  const maintenance = parseFloat( constantsFormData.get("maintenance").replace(",", ".")); //за 1 день

  if(!isFinite(upgradeHeadquarter) || upgradeHeadquarter < 1 || upgradeHeadquarter > 10) {
    alert("Поле 'Апгрейд штабу' може бути тільки числом в діапазоні від 1 до 10");
    return null;
  }
  if(upgradeRate === 1 || upgradeRate === 5.05) {

    const dayDirtyProfit = mineProduction * mineQuality * resourcesPrice * 24 * upgradeHeadquarter * upgradeRate;
    const dayClearProfit = dayDirtyProfit - maintenance;
    const mineFullPrice = mineBuildPrice + fullUpgradePrice + 200000; /**scan value*/
    const paybackDays = mineFullPrice / dayClearProfit;

    clearProfitOutput.textContent = dayClearProfit.toFixed(0);
    payBackOutput.textContent = paybackDays.toFixed(1);
  } else {
    alert("Поле 'Апгрейд шахти' може приймати значення 1 або 5.05");
    return null;
  }
}