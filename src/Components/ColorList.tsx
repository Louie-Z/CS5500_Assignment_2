import { useState } from 'react';

import './ColorList.css';

interface ColorListProps {
  highlightColors: string[];
  onSelectColor: (color: string) => void;
}

function ColorList({ highlightColors, onSelectColor }: ColorListProps) {
    const [color, setColor] = useState<string>('red');

  return (
    <div >
        <text>Select a highlight color: currently using <text style={{ color }}>{color}</text></text> 
        <div className='color-board'>
        
            {highlightColors.map((color) => (
            
              <button
                style={{ backgroundColor: color,
                color: 'black',
                fontSize: '20px',
                padding: '10px 20px',
                width: '100px',
                margin: '10px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',}}
                key={color} 
                onClick={() => {onSelectColor(color); setColor(color);}}
              >
                {color + " "}
            </button>
            
            ))}
        </div>
    </div>
  );
};

export default ColorList;
