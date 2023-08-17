"use client";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import Header from "../../../Header";

function page() {
  const [investmentAmount, setInvestmentAmount] = useState(1000); // Default value for Investment Amount
  const [interestRate, setInterestRate] = useState(10); // Default value for Interest Rate
  const [investmentDuration, setInvestmentDuration] = useState(5); // Default value for Investment Duration in years
  const [resultHtml, setResultHtml] = useState("");
  const [chart, setChart] = useState(null); // State for the chart instance

  const calculate = () => {
    const amount = Number(investmentAmount);
    const rate = Number(interestRate);
    const duration = Number(investmentDuration);
    const monthlyRate = rate / 100 / 12;
    const months = duration * 12;

    let futureValue = 0;
    for (let i = 0; i < months; i++) {
      futureValue += amount;
      futureValue *= 1 + monthlyRate;
    }

    setResultHtml(
      `<div>Investment Amount: <span>₹${(amount * months).toFixed(
        2
      )}</span></div>
      <div>Estimated Return: <span>₹${(futureValue - amount * months).toFixed(
        2
      )}</span></div>
      <div>Investment Duration: <span> ${investmentDuration}Y,(${months}Mo) </span></div>
      <div>Total Value: <span>₹${futureValue.toFixed(2)}</span></div>`
    );

    // Update the chart data
    if (chart) {
      chart.data.datasets[0].data = [amount, futureValue];
      chart.update();
    }
  };

  useEffect(() => {
    calculate();
  }, [investmentAmount, interestRate, investmentDuration]);

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Investment Amount", "Future Value"],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
    });
    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <div className="flex_box">
        <div style={{ marginTop: "5%" }}>
          <h4>
            <b>SIP Calculator</b>
          </h4>
          <div className="containero">
            <div className="input-wrapperr">
              <div className="wrapperr">
                <label htmlFor="investmentAmount">Amount(₹):</label>
                <input
                  type="number"
                  id="investmentAmount"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                />
              </div>
              <div className="wrapperr">
                <label htmlFor="interestRate">Rate:</label>
                <input
                  type="number"
                  id="interestRate"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="investmentDuration">Time:</label>
            <div className="time-wrapperr">
              <input
                type="number"
                id="investmentDuration"
                value={investmentDuration}
                onChange={(e) => setInvestmentDuration(e.target.value)}
              />
              <span>Years</span>
            </div>
            <button
              id="calculate-btn"
              onClick={calculate}
              className="button_ok"
            >
              Calculate
            </button>
            <div className="right_ok">
              <canvas id="myChart" width="300" height="300"></canvas>
            </div>
            <div id="result" dangerouslySetInnerHTML={{ __html: resultHtml }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
