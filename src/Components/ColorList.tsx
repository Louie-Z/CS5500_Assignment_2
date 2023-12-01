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
        <ul className='color-board'>
        
            {highlightColors.map((color) => (
            <text
            key={color} 
            onClick={() => {onSelectColor(color); setColor(color);}}
            style={{ color }}
            >
                {color + " "}
            </text>
            ))}
        </ul>
    </div>
  );
};

export default ColorList;
