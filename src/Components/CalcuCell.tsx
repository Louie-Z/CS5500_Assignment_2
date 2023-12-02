import React, { useState, useEffect } from "react";

interface CellButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    cell: string;
    celllabel: string;
    datatestid: string;
    className: string;
    color: string;
}

function CalcuCell({ onClick, cell, celllabel, datatestid, className, color }: CellButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isHKeyPressed, setIsHKeyPressed] = useState(false);
    const [isHighlighted, setIsHighlighted] = useState(false);

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

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (isHKeyPressed) {
            setIsHighlighted(prev => !prev);
        }
        onClick(event);
    };

    return (
        <button
            onClick={handleCellClick}
            value={cell}
            cell-label={celllabel}
            data-testid={datatestid}
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: isHighlighted ? color : ''
            }}
        >
            {cell}
        </button> 
    );
}

export default CalcuCell;
