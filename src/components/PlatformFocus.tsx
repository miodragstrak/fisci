import './styles/PlatformFocus.css';

const PlatformFocus = () => {
  return (
    <div className="focus-container">
      <h1>Our DeSci Platform Focus</h1>

      <section className="feature-block">
        <h2>Liquid Staking for Science (Science-LST)</h2>
        <p>
          Stake SOL → get sciSOL → earn yield while supporting science grants.
        </p>
        <ul>
          <li>Built on SolBlaze or Marinade</li>
          <li>Yield split: 50% user / 50% grant pool</li>
          <li>sciSOL used across platform (matching pool, governance, yield booster)</li>
        </ul>
      </section>

      <section className="feature-block">
        <h2>Quadratic Funding Platform for Research Projects</h2>
        <p>
          Matches small donations with larger matching funds — the more people support a project, the more matching funds it gets.
        </p>
        <ul>
          <li>List of proposals and donor-based voting</li>
          <li>Smart contract with quadratic match logic</li>
          <li>Funding rounds with set deadlines</li>
          <li>Donors earn reputation points or NFT badges</li>
        </ul>
      </section>

      <section className="feature-block">
        <h2>Reputation-Based Contributor Rewards (DeSci Score)</h2>
        <p>
          Builds a score from actions like funding, publishing, and reviewing.
        </p>
        <ul>
          <li>Non-transferable score (Soulbound Token)</li>
          <li>Higher score = early access + influence</li>
          <li>"My Profile" dashboard with contributions & timeline</li>
        </ul>
      </section>

      <section className="integration">
        <h2>Integration Overview</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Token Used</th>
              <th>On-Chain Logic</th>
              <th>Reward Mechanisms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quadratic Funding</td>
              <td>SOL / sciSOL</td>
              <td>Anchor contract</td>
              <td>Matching, badges, DeSci Score</td>
            </tr>
            <tr>
              <td>Science-LST</td>
              <td>SOL → sciSOL</td>
              <td>Staking + yield splitter</td>
              <td>Yield, governance, NFTs</td>
            </tr>
            <tr>
              <td>DeSci Score</td>
              <td>Soulbound</td>
              <td>Reputation events</td>
              <td>Access, yield booster</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PlatformFocus;
