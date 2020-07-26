import React from 'react';

const Infotablo = ({nameFirstValute, nameSecValute, nameThiValute, valueFirstValute, valueSecValute, valueThiValute}) => {

    return (
        <React.Fragment>
            <table>
                <thead>
                  <tr>
                    <th>Валюта</th>
                    <th>Курс</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{nameFirstValute}</td>
                    <td>{valueFirstValute}</td>
                  </tr>
                  <tr>
                    <td>{nameSecValute}</td>
                    <td>{valueSecValute}</td>
                  </tr>
                  <tr>
                    <td>{nameThiValute}</td>
                    <td>{valueThiValute}</td>
                  </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default Infotablo;