import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function YieldCalculator() {
  const [investment, setInvestment] = useState(100);
  const [staking, setStaking] = useState(70);
  const [sciSOL, setSciSOL] = useState(20);
  const [lending, setLending] = useState(10);

  const handleSliderChange = (index: number, value: number) => {
    const sliders = [staking, sciSOL, lending];
    sliders[index] = value;
    const total = sliders.reduce((a, b) => a + b, 0);
    if (total <= 100) {
      setStaking(sliders[0]);
      setSciSOL(sliders[1]);
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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Wallet Login + Yield Calculator</h2>
      <input
        type="number"
        value={investment}
        onChange={(e) => setInvestment(parseFloat(e.target.value))}
        placeholder="Enter investment amount"
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <p>If 100% in Simple Staking: ${(investment * 1.08).toFixed(2)} USD after 1 year</p>

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

      <table style={{ width: '100%', marginTop: '2rem', border: '1px solid #ccc' }}>
        <thead>
          <tr>
            <th>%</th>
            <th>Value ($)</th>
            <th>Asset</th>
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
                <td>${projected.toFixed(2)}</td>
                <td>{item.comment}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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