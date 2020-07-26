import React from 'react';
import './converterInput.css';

class ConverterInput extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            inputUSDLoaded: false,
            inputEULoaded: false,
            inputUAHLoaded: false,
            valueCalcValute: null,
        }
        this.btnUSD = this.btnUSD.bind(this);
        this.btnEU = this.btnEU.bind(this);
        this.btnUAH = this.btnUAH.bind(this);
        this.BtnInputValueAllInput = this.BtnInputValueAllInput.bind(this);
        this.ChangeInputValueAllInput = this.ChangeInputValueAllInput.bind(this);
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
    
    ChangeInputValueAllInput(e) {
        this.setState({
            value: e.target.value,
        });
    }
    
    BtnInputValueAllInput(e) {
        const {inputEULoaded, inputUAHLoaded, inputUSDLoaded} = this.state;
        const regexp = /[a-z-_!@#$%^&*()~ а-я]/gi;
        const str = this.state.value;
        if (this.state.value!==""){
            const result = regexp.test(str);
            console.log("Район рег выраж");
            
            if (result) {
                console.log("Исключение");
                this.setState({
                    valueCalcValute: "Вы ничего не ввели",
                })
            }
            else if(!result) {
                const intValueValute = parseFloat(this.state.value);
                if (inputEULoaded===true && inputUSDLoaded===false && inputUAHLoaded===false){
                    console.log("1232343")
                    const intValueEU = parseFloat(this.state.valueSecValute);
                    const resultCalc = intValueValute*intValueEU;
                    const resultCalc2 = Number((resultCalc).toFixed(2));
                    this.setState({
                        valueCalcValute: resultCalc2 + " рубля",
                    })
                }
                else if(inputEULoaded===false && inputUSDLoaded===true && inputUAHLoaded===false) {
                    const intValueUSD = parseFloat(this.state.valueFirstValute);
                    const resultCalc = intValueValute*intValueUSD;
                    const resultCalc2 = Number((resultCalc).toFixed(2));
                    this.setState({
                        valueCalcValute: resultCalc2 + " рубля",
                    })
                }
                else if (inputEULoaded===false && inputUSDLoaded===false && inputUAHLoaded===true) {
                    const intValueUAH = parseFloat(this.state.valueThiValute)/10;
                    const resultCalc = intValueValute*intValueUAH;
                    const resultCalc2 = Number((resultCalc).toFixed(2));
                    this.setState({
                        valueCalcValute: resultCalc2 + " рубля",
                    })
            }
            }
        }
        else {
            this.setState({
                valueCalcValute: "Вы ничего не ввели",
            })
        }
}

    
    componentWillMount() {
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
        else if (inputEULoaded===false && inputUAHLoaded===false && inputUSDLoaded===false) {
            // Открытие h1
            return <div>
                <h2 className="h2-fc-main">Выберите валюту</h2>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                
            </div>
        }
        else if (inputEULoaded===true && inputUSDLoaded===false && inputUAHLoaded===false){ 
            // Открытие EU поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3 className="h3-fc">Введи сколько тебе нужно ЕВРО перевести в рубли</h3>
                <input  className="inp-fc" type="text" placeholder="Введите евро" onChange={this.ChangeInputValueAllInput}/>
                <button className="btn-sum" onClick={this.BtnInputValueAllInput}>Рассчитать</button>
                <h2 className="h2-fc">{this.state.valueCalcValute}</h2>
            </div>)
        }

        else if (inputEULoaded===true || inputUAHLoaded===false || inputUSDLoaded===true) {
            // Открытие USD поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3 className="h3-fc">Введи сколько тебе нужно ДОЛЛАРОВ перевести в рубли</h3>
                <input className="inp-fc" type="text" placeholder="Введите доллары" onChange={this.ChangeInputValueAllInput}/>
                <button className="btn-sum" onClick={this.BtnInputValueAllInput}>Рассчитать</button>
                <h2 className="h2-fc">{this.state.valueCalcValute}</h2>
            </div>)
        }
        else if (inputEULoaded===false || inputUAHLoaded===true || inputUSDLoaded===false) {
            // Открытие UAH поля
            return(<div>
                <BtnUSDValute onClick={this.btnUSD}/>
                <BtnEUValute onClick={this.btnEU}/>
                <BtnUAHValute onClick={this.btnUAH}/>
                <h3 className="h3-fc">Введи сколько тебе нужно ГРИВЕНЬ в рубли</h3>
                <input className="inp-fc" type="text" placeholder="Введите гривни" onChange={this.ChangeInputValueAllInput}/>
                <button className="btn-sum" onClick={this.BtnInputValueAllInput}>Рассчитать</button>
                <h2 className="h2-fc">{this.state.valueCalcValute}</h2>
            </div>)
        }


    }
}


function BtnUSDValute(props) {
    return (
        <div>
            <button className="btn-USD btn-main" onClick={props.onClick}>USD</button>
        </div>
    )
}
function BtnEUValute(props) {
    return (
        <div>
            <button className="btn-EU btn-main" onClick={props.onClick}>EU</button>
        </div>
    )
}
function BtnUAHValute(props) {
    return (
        <div>
            <button className="btn-UAH btn-main" onClick={props.onClick}>UAH</button>
        </div>
    )
}


export default ConverterInput;