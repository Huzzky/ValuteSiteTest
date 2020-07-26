import React from 'react';
import './infoTable.css'

const Infotablo = ({nameFirstValute, nameSecValute, nameThiValute, valueFirstValute, valueSecValute, valueThiValute}) => {

    return (
        <React.Fragment>
            <table>
                <thead>
                  <tr className="nm-tr">
                    <th className="nmValute">Валюта</th>
                    <th className="nmCrs">Курс</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="nm-td">{nameFirstValute}</td>
                    <td className="nm-td-2">{Number(parseFloat(valueFirstValute)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="nm-td">{nameSecValute}</td>
                    <td className="nm-td-2">{Number(parseFloat(valueSecValute)).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="nm-td">{nameThiValute}</td>
                    <td className="nm-td-2">{ Number((parseFloat(valueThiValute)/10)).toFixed(2) }</td>
                  </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Infotablo;