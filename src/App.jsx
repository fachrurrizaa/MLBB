import React, { useState } from 'react';
import HeroSelect from "./components/HeroSelect";
import axios from 'axios';

export default function App() {
  const [selectedHeroes, setSelectedHeroes] = useState(Array(10).fill(''));
  const [winStatus, setWinStatus] = useState(null);

  const handleHeroChange = (index, value) => {
    const newSelectedHeroes = [...selectedHeroes];
    newSelectedHeroes[index] = value;
    setSelectedHeroes(newSelectedHeroes);
  };

  const handleCalculate = async () => {
    try {
        const response = await axios.post('https://fachrurrizaa.pythonanywhere.com/predict', {
            selectedHeroes
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setWinStatus(response.data.result);
    } catch (error) {
        console.error('Error fetching prediction:', error);
    }
};

  const allHeroesSelected = selectedHeroes.every(hero => hero !== '');

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[90vh] w-[60vw] bg-white bg-opacity-10 backdrop-blur-[7px] rounded-md flex flex-col justify-center items-center gap-5">
        <h1 className="text-3xl font-bold text-[#1F2937]">Mobile Legends: Bang Bang</h1>
        <h1 className="text-3xl font-bold text-[#1F2937]">Win Prediction With SVM Algorithm</h1>
        <div className="flex gap-40">
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <HeroSelect
                key={i}
                iterasi={i + 1}
                selectedHeroes={selectedHeroes}
                onChange={(e) => handleHeroChange(i, e.target.value)}
              />
            ))}
          </div>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <HeroSelect
                key={i + 5}
                iterasi={i + 1}
                selectedHeroes={selectedHeroes}
                onChange={(e) => handleHeroChange(i + 5, e.target.value)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-5">
            <button className="btn btn-wide bg-white" disabled={!allHeroesSelected} onClick={handleCalculate}>
              Calculate
            </button>
            {console.log(selectedHeroes)}
          </div>
          <div className="stats shadow w-64 rounded-lg">
            <div className="stat">
              <div className="stat-title text-center">Hasil Prediksi</div>
              <div className="stat-value text-center text-2xl">{winStatus !== null ? winStatus : '...'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
