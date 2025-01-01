import React from 'react';
import { useState } from 'react';


type Props = {
    value: string, 
    onChange: (color: string) => void
}

const ColorsPicker = ({ value, onChange }: Props) => {
  const colors = [
    '#ff0000', '#ff4d00', '#ff9900', '#ffcc00', '#ffff00',
    '#ccff00', '#99ff00', '#4dff00', '#00ff00', '#00ff4d',
    '#00ff99', '#00ffcc', '#00ffff', '#00ccff', '#0099ff',
    '#004dff', '#0000ff', '#4d00ff', '#9900ff', '#cc00ff',
    '#ff00ff', '#ff00cc', '#ff0099', '#ff004d'
  ];

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="grid grid-cols-8 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
              value === color ? 'border-gray-800' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-full border"
          style={{ backgroundColor: value || '#ffffff' }}
        />
        <span className="text-sm text-gray-600">
          {value || 'No color selected'}
        </span>
      </div>
    </div>
  );
};

export  {ColorsPicker};