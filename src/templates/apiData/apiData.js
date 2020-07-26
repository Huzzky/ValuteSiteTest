import React from 'react';
import Infotablo from '../infoTablo/infoTablo';
import ConverterInput from '../converterInput/converterInput';


class Apidata extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, // Загрузилась ли API
            error: null, // Ошибка
            nameFirstValute: [], // Название первой валюты
            valueFirstValute: [], // Значение первой валюты
            nameSecValute: [], // Название второй валюты
            valueSecValute: [], // Значение второй валюты
            nameThiValute: [], // Название третьей валюты
            valueThiValute: [], // Значение третьей валюты
            // Их столько нужно, потому что у ЦБ РФ очень странный API и сложно обработать для меня пока что
        }
    }

    componentDidMount() {
        fetch('https://www.cbr-xml-daily.ru/daily_json.js') // api от ЦБ РФ
            .then(res => res.json()) // Получение данных и перевод в json-формат
            .then(
            (data) => {
                this.setState({ 
                nameFirstValute : data.Valute.USD.Name,
                nameSecValute: data.Valute.EUR.Name,
                nameThiValute: data.Valute.UAH.Name,
                valueFirstValute: data.Valute.USD.Value,
                valueSecValute: data.Valute.EUR.Value,
                valueThiValute: data.Valute.UAH.Value,
                isLoaded:true, //Переключение, что данные приняты
            })
            })      
            .catch(console.log) //вывод при ошибке
    }
    

    render() {
        const {isLoaded, error, } = this.state;
        if (!isLoaded) {
            return(<h2>Загрузка...</h2>)
        }
        else if (error) {
            return(<h2>Ошибка: {error.message}</h2>)
        }
        else {
            return(
                <React.Fragment>
                    <div>
                        <ConverterInput/>
                    </div>
                    <div>
                    <Infotablo nameFirstValute={this.state.nameFirstValute} nameSecValute={this.state.nameSecValute} nameThiValute={this.state.nameThiValute}
                    valueFirstValute={this.state.valueFirstValute} valueSecValute={this.state.valueSecValute} valueThiValute={this.state.valueThiValute}/>
                    </div>
                </React.Fragment>
                )
        }
    }
}


export default Apidata;