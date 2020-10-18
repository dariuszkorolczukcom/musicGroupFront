import React from "react";

const EditComponent = (props) => {
    const [preset, setPreset] = React.useState({});

    React.useEffect(() => {
        props.edit!=undefined? setPreset(props.edit):""
    }, [props.edit]);

    return (
        <React.Fragment>
        {props.edit && 
            <React.Fragment>
                <div className="modal-content">
                    <span onClick={() => props.setEdit()} className="close">&times;</span>
                    <h2>Edit Preset</h2>
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
                    <button onClick={()=>props.editPreset(preset)}>Save changes</button>
                </div>
            </React.Fragment>
            }
        </React.Fragment>
    )
}

export default EditComponent;