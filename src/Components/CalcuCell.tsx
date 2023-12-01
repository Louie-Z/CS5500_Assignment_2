import React, { useState, useEffect } from "react";

interface CellButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    cell: string;
    celllabel: string;
    datatestid: string;
    className: string;
  }

function CalcuCell({ onClick, cell, celllabel, datatestid, className }: CellButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isHKeyPressed, setIsHKeyPressed] = useState(false);
    const [isShiftHKeyPressed, setisShiftHKeyPressed] = useState(false);//

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

        //
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'm' && isHovered) {
                console.log("m is pressed");
                setisShiftHKeyPressed((prev) => !prev);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        //
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.removeEventListener('keyup', handleKeyUp);
          window.removeEventListener('keydown', handleKeyPress);
        };
        }, []); 

        
    return (
        <button
            onClick={onClick}
            value={cell}
            cell-label={celllabel}
            data-testid={datatestid}
            className={className}

            onMouseEnter={() => {setIsHovered(true); console.log("hovered")}}
            onMouseLeave={() => {setIsHovered(false); console.log("not-hovered")}}
            
            style={{
            backgroundColor: isShiftHKeyPressed || (isHovered && isHKeyPressed )? 'red' : ''
            }}
            
        >
            {cell}
        </button> 
  );
}

export default CalcuCell;