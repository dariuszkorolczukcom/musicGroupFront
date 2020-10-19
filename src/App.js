import React from "react";
import DataTable from "./Components/DataTable"
import EditComponent from "./Components/EditComponent"
import AddComponent from "./Components/AddComponent"

import "./App.css";


const columns = [
    { field: 'low_band', type: 'checkbox', headerName: 'low band', width: 130 },
    { field: 'low_peak/shelf', type: 'text', headerName: 'low peak/shelf', width: 130 },
    { field: 'low_freq_hz', type: 'text', headerName: 'low freq', width: 90 },
    { field: 'low_gain', type: 'text', headerName: 'low gain', width: 90 },
    { field: 'low_mid_band', type: 'checkbox', headerName: 'low mid band', width: 120 },
    { field: 'low_mid_hi_low_q', type: 'text', headerName: 'low mid', width: 90 },
    { field: 'low_mid_freq_hz', type: 'number', headerName: 'low mid freq', width: 120 },
    { field: 'low_mid_gain', type: 'number', headerName: 'low mid gain', width: 120 },
    { field: 'hi_mid_band', type: 'checkbox', headerName: 'hi mid band', width: 120 },
    { field: 'hi_mid_freq_khz', type: 'number', headerName: 'hi mid freq', width: 100 },
    { field: 'hi_mid_gain', type: 'text', headerName: 'hi mid gain', width: 120 },
    { field: 'hi_band', type: 'checkbox', headerName: 'hi band', width: 100 },
    { field: 'hi_peak_shelf', type: 'text', headerName: 'hi peak/shelf', width: 120 },
    { field: 'hi_freq_khz', type: 'number', headerName: 'hi freq', width: 100 },
    { field: 'hi_gain', type: 'number', headerName: 'hi gain', width: 100 },
  ];

const App = () => {

    const [presets, setData] = React.useState([]);
    const [edit, setEdit] = React.useState();
    const [add, setAdd] = React.useState();

    React.useEffect(() => {
        if (add) {
            setEdit()
        }
    }, [add]);

    React.useEffect(() => {
        if(edit) {
            setAdd()
        }
    }, [edit]);

    React.useEffect(() => {
        getAllPresets()
    }, []);

    const getAllPresets = () => {
        fetch("http://http://54.77.253.19/:8080/presets")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(JSON.parse(result))
            setData(JSON.parse(result));
          },
          (error) => {
            console.log(error)
            setData(error);
          }
        )
    }

    const createPreset = (data) => {
        fetch("http://http://54.77.253.19/:8080/presets", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(JSON.parse(result))
            getAllPresets()
            setAdd()
          },
          (error) => {
            console.log(error)
            setData(error);
          }
        )
    }

    const editPreset = (data) => {
        fetch("http://http://54.77.253.19/:8080/presets/"+data.id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
          })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(JSON.parse(result))
            getAllPresets()
            setAdd()
          },
          (error) => {
            console.log(error)
            setData(error);
          }
        )
        setEdit()
    }

    const deletePreset = (id) => {
        fetch("http://http://54.77.253.19/:8080/presets/"+id, {
            method: 'DELETE'
          })
        .then(res => res.json())
        .then(
          (result) => {
            console.log(JSON.parse(result))
            getAllPresets()
          },
          (error) => {
            console.log(error)
            setData(error);
          }
        )
    }

    return(
      <div className="App">
        <DataTable 
            columns={columns}
            presets={presets} 
            editPreset={setEdit} 
            deletePreset={deletePreset}
            />
        <AddComponent 
            add={add} 
            columns={columns} 
            setAdd={setAdd} 
            createPreset={createPreset}
            />
        <EditComponent 
            edit={edit} 
            columns={columns} 
            setEdit={setEdit} 
            editPreset={editPreset}
            />
      </div>
    );
}

export default App;