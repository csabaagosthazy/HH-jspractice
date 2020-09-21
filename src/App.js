import React, {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { variables, practice } from './practice';
import calculator from "./calculator";



function App() {

  //tests
    //variables();
    //practice();
  const hourSalary = {base: 10, evening: 11, night: 12};
  const taxRate = 0.175;

  const [show, setShow] = useState("net");

  const schedule = [
    {start:{yy:2020,mm:9,dd:1,h:13,m:0}, end:{yy:2020,mm:9,dd:1,h:21,m:0}},
    {start:{yy:2020,mm:9,dd:3,h:8,m:0}, end:{yy:2020,mm:9,dd:3,h:16,m:0}},
    {start:{yy:2020,mm:9,dd:5,h:16,m:0}, end:{yy:2020,mm:9,dd:6,h:0,m:0}},
    {start:{yy:2020,mm:9,dd:7,h:22,m:0}, end:{yy:2020,mm:9,dd:8,h:7,m:0}},
    {start:{yy:2020,mm:9,dd:8,h:23,m:15}, end:{yy:2020,mm:9,dd:9,h:7,m:15}},
]

  const tableData = calculator(schedule, hourSalary, taxRate);

  const handleClick = () => {
    if(show === "net")  setShow("gross");
    else setShow("net");
  }
  return (
    <div className="App">
      <h1>Practice</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Base hours</th>
            <th>Evening hours</th>
            <th>Night hours</th>
            <th>Base salary</th>
            <th>Evening salary</th>
            <th>Night salary</th>
            <th>Total hours</th>
            <th>Total salary</th>
          </tr>
        </thead>
        <tbody>
         {tableData.map( data => (
          <tr key={data.date}>
              <th>{data.date}</th>
              {Object.values(data.periodHours).map((value,i) =>
                <th key={i}>{value}</th>
              )}
              {Object.values(data.periodSalary).
                map(x => Object.entries(x).
                  filter(a => a[0] === show)).
                    map((b,i) => <th key={i}>{Math.round(b[0][1])}</th>)}
              <th>{data.workHours }</th>
              <th>{Math.round(data.salary[show])}</th>
            </tr>
          ))}
        </tbody>
    </Table>
     <Button
      variant="primary"
      onClick={handleClick}
    >
      {show === "net"? "Show Net value" : 'Show Gross value'}
    </Button>
    </div>
  );
}

export default App;
