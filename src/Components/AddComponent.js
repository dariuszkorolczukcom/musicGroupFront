import React from "react";

const AddComponent = (props) => {
    const [preset, setPreset] = React.useState({});

    return (
        <React.Fragment>
            <button onClick={() => props.setAdd(true)}>Add Preset</button>
        {props.add && 
            <React.Fragment>
                <div className="modal-content">
                    <span onClick={() => props.setAdd()} className="close">&times;</span>
                    <h2>Add Preset</h2>
                    <table>
                        <tbody>
                        {props.columns.map((column) => {
                            return (
                            <tr key={column.field}>
                                <td><label>{column.headerName}: </label></td>
                                <td>
                                    <input 
                                        onChange={(e) => setPreset({...preset,[column.field]:e.target.value})}
                                        type={column.type} 
                                        value={preset[column.field]}
                                        />
                                </td>
                            </tr>)
                        })}
                        </tbody>
                    </table>
                    <button onClick={()=>props.createPreset(preset)}>Save changes</button>
                </div>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default AddComponent;