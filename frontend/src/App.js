import React, { useState } from "react";
import axios from "axios";

const teams = [
  'Sunrisers Hyderabad', 'Mumbai Indians', 'Royal Challengers Bengaluru',
  'Kolkata Knight Riders', 'Punjab Kings', 'Chennai Super Kings',
  'Rajasthan Royals', 'Delhi Capitals', 'Lucknow Super Giants', 'Gujarat Titans'
];

const cities = [
  'Bangalore', 'Chandigarh', 'Delhi', 'Mumbai', 'Kolkata', 'Jaipur',
  'Hyderabad', 'Chennai', 'Cape Town', 'Port Elizabeth', 'Durban',
  'Centurion', 'East London', 'Johannesburg', 'Kimberley', 'Bloemfontein',
  'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala', 'Visakhapatnam', 'Pune',
  'Raipur', 'Ranchi', 'Abu Dhabi', 'Bengaluru', 'Indore', 'Dubai', 'Sharjah',
  'Navi Mumbai', 'Lucknow', 'Guwahati', 'Mohali'
];

function App() {
  const [battingTeam, setBattingTeam] = useState(teams[0]);
  const [bowlingTeam, setBowlingTeam] = useState(teams[1]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [target, setTarget] = useState();
  const [score, setScore] = useState();
  const [overs, setOvers] = useState();
  const [wickets, setWickets] = useState();
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    const payload = { batting_team: battingTeam, bowling_team: bowlingTeam, city: selectedCity, target, score, overs, wickets };
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/predict/", payload);
      setPrediction(response.data);
    } catch (error) {
      console.error("Error making prediction", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">IPL Win Predictor</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Batting Team:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBattingTeam(e.target.value)}
            value={battingTeam}
          >
            {teams.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Bowling Team:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setBowlingTeam(e.target.value)}
            value={bowlingTeam}
          >
            {teams.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Host City:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedCity(e.target.value)}
            value={selectedCity}
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Target:</label>
          <input
            type="number"
            placeholder="Enter the target"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={target}
            min="0" // Prevents negative input values
            onChange={(e) => setTarget(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
          />

        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Score:</label>
          <input
            placeholder="Enter current score"
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={score}
            min="0"
            onChange={(e) => setScore(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Overs Completed:</label>
          <input
            placeholder="Enter number of overs"
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={overs}
            onChange={(e) => setOvers(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Wickets Out:</label>
          <input
            type="number"
            placeholder="Enter number of wickets"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={wickets}
            onChange={(e) => setWickets(Number(e.target.value))}
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <button
          onClick={handlePredict}
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Predict Probability
        </button>

        {prediction && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md text-center">
            <h3 className="text-lg font-medium text-gray-700">
              Batting Team Win Probability: {prediction.batting_team_win}
            </h3>
            <h3 className="text-lg font-medium text-gray-700">
              Bowling Team Win Probability: {prediction.bowling_team_loss}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
