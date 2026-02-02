'use client'

import React from "react";
import { useState } from "react";

export default function Home() {
  const [uvalue, setUvalue] = useState('');
  const [gvalue, setGvalue] = useState('');
  const [rvalue, setRvalue] = useState('');
  const [ivalue, setIvalue] = useState('');
  const [zvalue, setZvalue] = useState('');
  const [redshift, setRedshift] = useState('');
  const [resultText, setResultText] = useState("");

  const handleUvalue = event => {
    setUvalue(Number(event.target.value));
  };
  const handleGvalue = event => {
    setGvalue(Number(event.target.value));
  };
  const handleRvalue = event => {
    setRvalue(Number(event.target.value));
  };
  const handleIvalue = event => {
    setIvalue(Number(event.target.value));
  };
  const handleZvalue = event => {
    setZvalue(Number(event.target.value));
  };
  const handleRedshift = event => {
    setRedshift(Number(event.target.value));
  };

  const getPrediction = async () => {
    const response = await fetch('/api/getPrediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        u: uvalue,
        g: gvalue,
        r: rvalue,
        i: ivalue,
        z: zvalue,
        rshift: redshift
      }),
    });

    if (!response.ok) {
      console.error("API error:", response.statusText);
      return;
    }

    const result = await response.json();
    console.log(result);
    setResultText(result);
  }

  return (
    <div>
      <h1>Sky Data Model</h1>
      <main>
        <h2>Please insert the following to predict the constellation:</h2>
        <table>
          <tbody>
            <tr>
              <td>U Value</td>
              <td>G Value</td>
              <td>R Value</td>
              <td>I Value</td>
              <td>Z Value</td>
              <td>Redshift</td>
            </tr>
            <tr>
              <td><input type="number" value={gvalue} onChange={handleGvalue} /></td>
              <td><input type="number" value={uvalue} onChange={handleUvalue} /></td>
              <td><input type="number" value={rvalue} onChange={handleRvalue} /></td>
              <td><input type="number" value={ivalue} onChange={handleIvalue} /></td>
              <td><input type="number" value={zvalue} onChange={handleZvalue} /></td>
              <td><input type="number" value={redshift} onChange={handleRedshift} /></td>
            </tr>
          </tbody>
        </table>
        <button style={{ width: '100px' }} onClick={getPrediction}>Predict</button>
        <div>According to these inputs, the constellation will be a {resultText}</div>
      </main>
    </div>
  );
}
