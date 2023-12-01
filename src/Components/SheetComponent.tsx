import React, { useState, useEffect } from "react";

import Cell from "../Engine/Cell";

import CalcuCell from "./CalcuCell";

import "./SheetComponent.css";

// a component that will render a two dimensional array of cells
// the cells will be rendered in a table
// the cells will be rendered in rows
// a click handler will be passed in

interface SheetComponentProps {
  cellsValues: Array<Array<string>>;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  currentCell: string;
  currentlyEditing: boolean;
  holdedCellList: [];
} // interface SheetComponentProps




function SheetComponent({ cellsValues, onClick, currentCell, currentlyEditing, holdedCellList }: SheetComponentProps) {

  /**
   * 
   * @param cell 
   * @returns the class name for the cell
   * 
   * if the cell is the current cell and the sheet is in edit mode
   * then the cell will be rendered with the class name "cell-editing"
   * 
   * if the cell is the current cell and the sheet is not in edit mode
   * then the cell will be rendered with the class name "cell-selected"
   * 
   * otherwise the cell will be rendered with the class name "cell"
   */
  function getCellClass(cell: string) {
    // console.log("cell", holdedCellList);
    let cellClass = "cell";
    if (cell === currentCell && currentlyEditing) {
      return "cell-editing";
    }
    if (cell === currentCell) {
      return "cell-selected";
    }
    holdedCellList.forEach(item => {
      if (cell===item[0] && cell !== currentCell) {
        console.log("rename the class->cell-holded, for cell", cell);
        cellClass = "cell-holded";
      }
    });
    return cellClass;
  }

  function getEditorName(column: number, row: number) {
    const cell = Cell.columnRowToCell(column, row);
    let name = "";
    holdedCellList.forEach(item => {
      if (cell===item[0]) {
        name = item[1];
      }
    });
    return name;
  }


  // const [isHovered, setIsHovered] = useState(false);
  // const [isHKeyPressed, setIsHKeyPressed] = useState(false);

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (event.key === 'h') {
  //       setIsHKeyPressed(true);
  //     }
  //   };

  //   const handleKeyUp = (event: KeyboardEvent) => {
  //     if (event.key === 'h') {
  //       setIsHKeyPressed(false);
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   document.addEventListener('keyup', handleKeyUp);

  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //     document.removeEventListener('keyup', handleKeyUp);
  //   };
  // }, []); // Only run this effect once when the component mounts



  return (
    <table className="table">
      <tbody>
        {/*add a row with column cellsValues */}
        <tr>
          <th></th>
          {cellsValues[0].map((col, colIndex) => (
            <th key={colIndex}>
              {Cell.columnNumberToName(colIndex)}
            </th>
          ))}
        </tr>
        {cellsValues.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <td> {Cell.rowNumberToName(rowIndex)}</td>
            {row.map((cell, colIndex) => (
              <td key={colIndex} style={{position:"relative"}}>


                {/* <button
                  onClick={onClick}
                  value={cell}
                  cell-label={Cell.columnRowToCell(colIndex, rowIndex)}
                  data-testid={Cell.columnRowToCell(colIndex, rowIndex)}
                  className={(getCellClass(Cell.columnRowToCell(colIndex, rowIndex)))}


                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{
                    backgroundColor: isHovered && isHKeyPressed ? 'red' : '',
                    // Add other styles as needed
                  }} 
                >
                  {cell}
                </button>  */}

                {CalcuCell({
                  onClick: onClick,
                  cell: cell,
                  celllabel: Cell.columnRowToCell(colIndex, rowIndex),
                  datatestid: Cell.columnRowToCell(colIndex, rowIndex),
                  className: (getCellClass(Cell.columnRowToCell(colIndex, rowIndex)))
                })}

                <label className="user-label">{
                  getEditorName(colIndex, rowIndex)}
                </label>

              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} // SheetComponent




export default SheetComponent;