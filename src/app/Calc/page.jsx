"use client";
import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import Header from "../../../Header";

function page() {
  const [p, setP] = useState(1000); // Default value for Principal
  const [r, setR] = useState(5); // Default value for Rate
  const [t, setT] = useState(1); // Default value for Time
  const [duration, setDuration] = useState("year");
  const [resultHtml, setResultHtml] = useState("");
  const [chart, setChart] = useState(null); // State for the chart instance

  const calculate = () => {
    const principal = Number(p);
    const rate = Number(r);
    const time = Number(t);
    const isYear = duration === "year";
    const simpleInterest = isYear
      ? (principal * rate * time) / 100
      : (principal * rate * time) / 1200;
    const amount = principal + simpleInterest;
    const emi = amount / (isYear ? time * 12 : time);

    setResultHtml(
      `<div>Principal Amount: <span>₹${principal.toFixed(2)}</span></div>
      <div>Total Interest: <span>₹${simpleInterest.toFixed(2)}</span></div>
      <div>Total EMI: <span>₹${emi.toFixed(2)}</span></div>
      <div>Total Amount: <span>₹${amount.toFixed(2)}</span></div>`
    );

    // Update the chart data
    if (chart) {
      chart.data.datasets[0].data = [principal, simpleInterest, emi, amount];
      chart.update();
    }
  };

  useEffect(() => {
    calculate();
  }, [p, r, t, duration]);

  useEffect(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const newChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Principal", "Interest", "EMI", "Total Amount"],
        datasets: [
          {
            label: "Amounts",
            data: [],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
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
<Header/>
<div className="flex_box">

  <div style={{  marginTop:" 5%"}}>
    <h4><b>Loan Calculator</b></h4>
    <div className="containero">
      <div className="input-wrapperr">
        <div className="wrapperr">
          <label htmlFor="principal">Principal(₹):</label>
          <input
            type="number"
            id="principal"
            value={p}
            onChange={(e) => setP(e.target.value)}
          />
        </div>
        <div className="wrapperr">
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            id="rate"
            value={r}
            onChange={(e) => setR(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="time">Loan Tenure:</label>
      <div className="time-wrapperr">
        <input
          type="number"
          id="time"
          value={t}
          onChange={(e) => setT(e.target.value)}
        />
        <select
        className="select_ok"
          name="duration"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="year">Year</option>
          <option value="month">Month</option>
        </select>
      </div>
      <button id="calculate-btn" onClick={calculate} className="button_ok">
        Calculate
      </button>
      <div class="right_ok">
          <canvas id="myChart" width="300" height="300" ></canvas>
        </div>
      <div id="result" dangerouslySetInnerHTML={{ __html: resultHtml }} />
    </div>
    </div>
    </div></>
  );
}

export default page;
