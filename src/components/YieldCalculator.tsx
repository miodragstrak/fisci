import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './styles/main.css';

interface YieldCalculatorProps {
  solBalance: number | null;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function YieldCalculator({ solBalance }: YieldCalculatorProps) {
  const [investment, setInvestment] = useState<number>(solBalance || 100);
  const [staking, setStaking] = useState(0);
  const [sciSOL, setSciSOL] = useState(0);
  const [lending, setLending] = useState(0);

  useEffect(() => {
    if (solBalance !== null) {
      setInvestment(solBalance * 150); // Recimo, 1 SOL = $150
    }
  }, [solBalance]);

  const handleSliderChange = (index: number, value: number) => {
    const sliders = [staking, sciSOL, lending];
    const total = sliders.reduce((sum, slider, i) => (i !== index ? sum + slider : sum), 0);
    const remainingPercentage = 100 - total;

    if (value > remainingPercentage) {
      value = remainingPercentage;
    }

    sliders[index] = value;

    setStaking(sliders[0]);
    setSciSOL(sliders[1]);
    setLending(sliders[2]);
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

      <p>
        If 100% in Simple Staking:{' '}
        <strong>${(investment * 1.08).toFixed(2)} USD</strong> after 1 year
      </p>

      {breakdown.map((item, index) => (
        <div key={index}>
          <label>
            {item.label}: {item.percentage}%
          </label>
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
              <th>Yield Rate</th>
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
                  <td>{(item.yieldRate * 100).toFixed(2)}%</td>
                  <td>${projected.toFixed(2)}</td>
                  <td>{item.comment}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={4}>
                <strong>Total 1-Year Return ($)</strong>
              </td>
              <td>
                <strong>${totalReturn.toFixed(2)}</strong>
              </td>
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
