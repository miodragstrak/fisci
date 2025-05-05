import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './styles/main.css'; 

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function YieldCalculator() {
  const [investment, setInvestment] = useState(100);
  const [staking, setStaking] = useState(0); // Initial values split equally
  const [sciSOL, setSciSOL] = useState(0);
  const [lending, setLending] = useState(0);

  const handleSliderChange = (index: number, value: number) => {
    const sliders = [staking, sciSOL, lending];
    const total = sliders.reduce((sum, slider, i) => (i !== index ? sum + slider : sum), 0);
    const remainingPercentage = 100 - total;

    if (value > remainingPercentage) {
      value = remainingPercentage;
    }

    sliders[index] = value;

    if (index === 0) {
      setStaking(sliders[0]);
    } else if (index === 1) {
      setSciSOL(sliders[1]);
    } else {
      setLending(sliders[2]);
    }
  };

  const breakdown = [
    {
      label: 'Simple Staking',
      percentage: staking,
      asset: 'SOL',
      yieldRate: 0.08,
      comment: 'Base staking reward',
    },
    {
      label: 'Science-LST (sciSOL)',
      percentage: sciSOL,
      asset: 'sciSOL',
      yieldRate: 0.12,
      comment: 'Boosted yield + recognition',
    },
    {
      label: 'Lending to Researchers',
      percentage: lending,
      asset: 'sciSOL (loan)',
      yieldRate: 0.15,
      comment: 'Higher yield, risk-managed',
    },
  ];

  const pieData = breakdown.map((item) => ({
    name: item.label,
    value: item.percentage,
  }));

  // Calculate the sum of the 1-Year Returns
  const totalReturn = breakdown.reduce((sum, item) => {
    const amount = (investment * item.percentage) / 100;
    const projected = amount * (1 + item.yieldRate);
    return sum + projected;
  }, 0);

  return (
    <div className="page-content">
      <h2>Yield Calculator</h2>
      <input
        type="number"
        value={investment}
        onChange={(e) => setInvestment(parseFloat(e.target.value))}
        placeholder="Enter investment amount"
        style={{ width: '25%', padding: '1rem', marginBottom: '1rem' }}
      />

      <p>If 100% in Simple Staking: <strong>${(investment * 1.08).toFixed(2)} USD</strong> after 1 year</p>

      {breakdown.map((item, index) => (
        <div key={index}>
          <label>{item.label}: {item.percentage}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={item.percentage}
            onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      ))}

    <div className="table-container">
      <table className="yield-table">
        <thead>
          <tr>
            <th>%</th>
            <th>Value ($)</th>
            <th>Asset</th>
            <th>Yield Rate</th> {/* New column for Yield Rate */}
            <th>1-Year Return ($)</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {breakdown.map((item, i) => {
            const amount = (investment * item.percentage) / 100;
            const projected = amount * (1 + item.yieldRate);
            return (
              <tr key={i}>
                <td>{item.percentage}%</td>
                <td>${amount.toFixed(2)}</td>
                <td>{item.asset}</td>
                <td>{(item.yieldRate * 100).toFixed(2)}%</td> {/* Display Yield Rate as percentage */}
                <td>${projected.toFixed(2)}</td>
                <td>{item.comment}</td>
              </tr>
            );
          })}
          {/* Add a last row for the total 1-Year Return */}
          <tr>
            <td colSpan={4}><strong>Total 1-Year Return ($)</strong></td>
            <td><strong>${totalReturn.toFixed(2)}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>

      <PieChart width={400} height={300} style={{ margin: '2rem auto' }}>
        <Pie
          data={pieData}
          cx={200}
          cy={150}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default YieldCalculator;
