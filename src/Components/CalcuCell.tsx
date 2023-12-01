import React, { useState, useEffect } from "react";

import Cell from "../Engine/Cell";

interface CellButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    cell: string;
    celllabel: string;
    datatestid: string;
    className: string;
  }

function CalcuCell({ onClick, cell, celllabel, datatestid, className }: CellButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredForSH, setIsHoveredForSH] = useState(false);
    const [isHKeyPressed, setIsHKeyPressed] = useState(false);
    const [isShiftHKeyPressed, setisShiftHKeyPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'h') {
            setIsHKeyPressed(true);
          }
        };
    
        const handleKeyUp = (event: KeyboardEvent) => {
          if (event.key === 'h') {
            setIsHKeyPressed(false);
          }
        };

        // const handleKeyPress = (event: KeyboardEvent) => {
        //     // if (event.shiftKey && event.key === 'h') {
        //         if (event.key === 'm') {
        //       // Toggle the state when 'Shift + H' keys are pressed
        //       setisShiftHKeyPressed((prev) => !prev);
        //     }
        //   };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Attach event listeners when the component mounts
        // document.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
        //   document.removeEventListener('keydown', handleKeyPress);
        };

        // Detach event listener when the component unmounts
        // Empty dependency array means this effect runs only once when the component mounts

        }, []); // Only run this effect once when the component mounts

        
    return (
        <button
            onClick={onClick}
            value={cell}
            cell-label={celllabel}
            data-testid={datatestid}
            className={className}

            onMouseEnter={() => {
                setIsHovered(true);
                setIsHoveredForSH(true);
            }}
            onMouseLeave={() => setIsHovered(false)}
            
            style={{
            // backgroundColor: (isHovered && isHKeyPressed) || (isShiftHKeyPressed && isHoveredForSH ) ? 'red' : '',
            backgroundColor: (isHovered && isHKeyPressed )? 'red' : '',
            // backgroundColor: (isShiftHKeyPressed)? 'red' : '',
            // Add other styles as needed
            }}
            
        >
            {cell}
        </button> 
  );
}

export default CalcuCell;