import { useEffect, useRef, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import UniverSheet from './pages/tablePage/UniverSheet';
import { DEFAULT_WORKBOOK_DATA } from './assets/default-workbook-data';
import { DEFAULT_WORKBOOK_DATA2 } from './assets/default-workbook-data copy';
import UniverDoc from './pages/DocPage/UniverDoc';
import { DEFAULT_DOCUMENT_DATA_CN } from './assets/data';
import Routes from './pages/routes';


function App() {
  const [data, setData] = useState(DEFAULT_WORKBOOK_DATA);
  const univerRef = useRef();


  
  useEffect(() => {

   localStorage.setItem("tables",JSON.stringify([DEFAULT_WORKBOOK_DATA,DEFAULT_WORKBOOK_DATA2]))

  }, [])


  const changeTable = (item) => {

    setData(item)

  }

  return (
    // <div id="root">
    //   <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    //     <div className="bar">
    //       <button
    //         onClick={() => {
    //           // setData(JSON.parse(localStorage.getItem('table1')))
    //           // console.log()
    //           console.log(univerRef.current.getData());
    //         }}
    //       >
    //         Get Data
    //       </button>
    //     </div>
    //     {/* <AppNew /> */}
    //     {/* <UniverSheet style={{ flex: 1 }} ref={univerRef} data={data} /> */}
    //         <UniverDoc ref={univerRef} data={DEFAULT_DOCUMENT_DATA_CN} />
    //     {/* <div>

    //       {
    //         JSON.parse(localStorage.getItem('tables')).map(item => (

    //           <div onClick={() => changeTable(item)}>{item.name}</div>

    //         ))
    //       }
    //     </div> */}

    //   </div>
    // </div>

    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
