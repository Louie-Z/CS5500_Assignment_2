import React, { useState} from "react";

import Cell from "../Engine/Cell";

import CalcuCell from "./CalcuCell";

import ColorList from "./ColorList";

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

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const highlightColors = ['red', 'green', 'yellow'];

  return (
    <div>
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
                
                {CalcuCell({
                  onClick: onClick,
                  cell: cell,
                  celllabel: Cell.columnRowToCell(colIndex, rowIndex),
                  datatestid: Cell.columnRowToCell(colIndex, rowIndex),
                  className: (getCellClass(Cell.columnRowToCell(colIndex, rowIndex))),
                  color: selectedColor || 'red'
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
    
    <div>
      {ColorList({
              highlightColors: highlightColors,
              onSelectColor: (color: string) => setSelectedColor(color)
      })}
    </div>
    </div>
  );
} // SheetComponent




export default SheetComponent;