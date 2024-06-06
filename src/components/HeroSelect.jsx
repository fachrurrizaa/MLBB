import React from 'react';
import { getInitialData } from "../utils/Hero";

let heroes = getInitialData();

export default function HeroSelect({ iterasi, selectedHeroes, onChange }) {
  return (
    <label className="form-control w-48 mb-3">
      <div className="label">
        <span className="label-text text-white text-base">Hero {iterasi}</span>
      </div>
      <select className="select select-bordered" onChange={onChange} defaultValue="">
        <option disabled value="">Pick one</option>
        {heroes.map((hero) => (
          <option
            key={hero.ID}
            value={hero.Hero}
            disabled={selectedHeroes.includes(hero.Hero)}
          >
            {hero.Hero}
          </option>
        ))}
      </select>
    </label>
  );
}
