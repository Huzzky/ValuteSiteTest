import React from 'react';

class ConverterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUSDLoaded: false,
            inputEULoaded: false,
            inputUAHLoaded: false,

        }
        this.btnUSD = this.btnUSD.bind(this);
        this.btnEU = this.btnEU.bind(this);
        this.btnUAH = this.btnUAH.bind(this);
        this.ChangeInputValueUAH = this.ChangeInputValueUAH.bind(this);
    }
    
    btnUAH() {
        this.setState({
            inputUSDLoaded: false,
            inputEULoaded: false,
            inputUAHLoaded: true,   
        });
    }

    btnEU() {
        this.setState({
            inputUSDLoaded: false,
            inputEULoaded: true,
            inputUAHLoaded: false,   
        });
    }

    btnUSD() {
        this.setState({
            inputUSDLoaded: true,
            inputEULoaded: false,
            inputUAHLoaded: false,   
        });
    }
    
    ChangeInputValueUAH(e) {
        this.setState({
            value: parseInt(e.target.value),
        });
        let valueInputValidate = e.target.value;

        console.log(this.state.value);
        
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
        const {inputEULoaded, inputUAHLoaded, inputUSDLoaded, isLoaded} = this.state;
        if (!isLoaded) {
            return(<div>
                <h1>Загрузка</h1>
            </div>)
        }
        else if (inputEULoaded===true && inputUSDLoaded===false && inputUAHLoaded===false){ 
            // Открытие EU поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3>Введи сколько тебе нужно ЕВРО перевести в рубли</h3>
                <input type="text" onChange={this.ChangeInputValueUAH}/>
                <button>Рассчитать</button>
            </div>)
        }
        else if (inputEULoaded===false && inputUAHLoaded===false && inputUSDLoaded===false) {
            // Открытие h1
            return <div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h1>Выбери валюту</h1>
            </div>
        }
        else if (inputEULoaded===true || inputUAHLoaded===false || inputUSDLoaded===true) {
            // Открытие USD поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3>Введи сколько тебе нужно ДОЛЛАРОВ перевести в рубли</h3>
                <input type="text" onChange={this.ChangeInputValueUAH}/>
                <button>Рассчитать</button>
            </div>)
        }
        else if (inputEULoaded===false || inputUAHLoaded===true || inputUSDLoaded===false) {
            // Открытие UAH поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3>Введи сколько тебе нужно ГРИВЕНЬ в рубли</h3>
                <input type="text" onChange={this.ChangeInputValueUAH}/>
                <button>Рассчитать</button>
            </div>)
        }


    }
}


function BtnUSDValute(props) {
    return (
        <div>
            <button onClick={props.onClick}>USD</button>
        </div>
    )
}
function BtnEUValute(props) {
    return (
        <div>
            <button onClick={props.onClick}>EU</button>
        </div>
    )
}
function BtnUAHValute(props) {
    return (
        <div>
            <button onClick={props.onClick}>UAH</button>
        </div>
    )
}
function CheckValueInputValidate(valueInput) {
    
}

export default ConverterInput;