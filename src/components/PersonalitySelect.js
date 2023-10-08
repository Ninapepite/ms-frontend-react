import React from 'react';

function PersonalitySelect({ onChange }) {
  return (
    <select className="form-control" onChange={onChange}>
      <option value="">Select Personality...</option>
      <option value="culturel">Culturel</option>
      <option value="historique">Historique</option>
      <option value="sportif">Sportif</option>
      <option value="detente">Détente</option>
      <option value="fetard">Fêtard</option>
      <option value="aquatique">Aquatique</option>
      <option value="famille">Famille</option>
      <option value="naturel">Naturel</option>
      <option value="divertissement">Divertissement</option>
    </select>
  );
}

export default PersonalitySelect;
