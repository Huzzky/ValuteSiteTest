import React from 'react';

class ConverterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUSDLoaded: false,
            inputEULoaded: false,
            inputUAHLoaded: false;

        }
        this.btnUSD = this.btnUSD.bind(this);
        this.btnEU = this.btnEU.bind(this);
        this.btnUAH = this.btnUAH.bind(this);
    }
    
    btnUAH() {

    }

    btnEU() {

    }

    btnUSD() {

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
        is
        return(
            <div>
                <button onClick={}>USD</button>
                <button>EU</button>
                <button>UAH</button>
            </div>
        )
    }
}

export default ConverterInput;