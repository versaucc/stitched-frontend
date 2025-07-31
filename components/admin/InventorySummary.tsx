import React from 'react';

interface InventorySummaryProps {
  tableName: string;
  rowNames: string[];
  columnNames: string[];
  cellContent: number[][];
}

const InventorySummary: React.FC<InventorySummaryProps> = ({ tableName, rowNames, columnNames, cellContent }) => {
  const getBackgroundColor = (value: number) => {
    const alpha = Math.min(value / 100, 1); // Cap alpha at 1
    return `rgba(0, 128, 0, ${alpha})`; // Green with dynamic alpha
  };

  return (
    <div className="inventory-summary">
      <h2 className="table-title text-center">{tableName}</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th></th>
            {columnNames.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowNames.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="row-title">{row}</td>
              {cellContent[rowIndex].map((value, colIndex) => (
                <td key={colIndex} style={{ backgroundColor: getBackgroundColor(value) }}>
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .inventory-summary {
          color: white;
        }
        .table-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        .inventory-table {
          width: 100%;
          border-collapse: collapse;
          background-color: black;
        }
        .inventory-table th,
        .inventory-table td {
          border: 1px solid rgba(255, 255, 255, 0.5);
          padding: 0.5rem;
          text-align: center;
        }
        .inventory-table th {
          font-weight: bold;
        }
        .row-title {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default InventorySummary;