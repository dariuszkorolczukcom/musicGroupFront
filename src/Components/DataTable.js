import * as React from 'react';

export default function DataTable(props) {

  return (
    <table>
      <thead>
        <tr>
          {props.columns.map((column) => {
            return <th key={column.field}>{column.headerName}</th>
          })}
          <th>edit</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {props.presets.map((preset)=>{
          return (
            <tr key={preset.id}>
              {props.columns.map((column) => {
                return <td key={column.id}>{preset[column.field]}</td>
              })}
              <td onClick={() => props.editPreset(preset)}>edit</td>
              <td className="close red" onClick={() => props.deletePreset(preset.id)}>&times;</td>
            </tr>)
        })}
      </tbody>
    </table>
  );
}
