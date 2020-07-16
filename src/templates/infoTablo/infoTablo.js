import React from 'react';

const Infotablo = ({nameFirstValute, nameSecValute, nameThiValute, valueFirstValute, valueSecValute, valueThiValute}) => {

    return (
        <div>
            <table>
                <tr><th>Валюта</th><th>Курс</th></tr>
                <tr><td>{nameFirstValute}</td>:<td>{valueFirstValute}</td></tr>
                <tr><td>{nameSecValute}</td>:<td>{valueSecValute}</td></tr>
                <tr>{nameThiValute}<td></td>:<td>{valueThiValute}</td></tr>
            </table>
        </div>
    )
}

export default Infotablo;