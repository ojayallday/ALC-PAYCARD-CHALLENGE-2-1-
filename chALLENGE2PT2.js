<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" 
          content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    
    <title>Mini App</title>
    
    <style>
      body {
      margin: 0;
      padding: 1em;
	  background-color: white;
    }

    [data-cart-info],
    [data-credit-card] {
      transform: scale(0.78);
      margin-left: -3.4em;
    }

    [data-cc-info] input:focus,
    [data-cc-digits] input:focus {
      outline: none;
    }

    .mdc-card__primary-action,
    .mdc-card__primary-action:hover {
      cursor: auto;
      padding: 20px;
      min-height: inherit;
    }

    [data-credit-card] [data-card-type] {
      transition: width 1.5s;
      margin-left: calc(100% - 130px);
    }

    [data-credit-card].is-visa {
      background: linear-gradient(135deg, #622774 0%, #c53364 100%);
    }

    [data-credit-card].is-mastercard {
      background: linear-gradient(135deg, #65799b 0%, #5e2563 100%);
    }

    .is-visa [data-card-type],
    .is-mastercard [data-card-type] {
      width: auto;
    }

    input.is-invalid,
    .is-invalid input {
      text-decoration: line-through;
    }

    ::placeholder {
      color: #fff;
    }
      
    /* Add Your CSS From Here */

	[data-cart-info] span {
		display: inline-block;
		vertical-align: middle;
	}
	[data-cart-info] .material-icons {
		font-size: 150px;
	}
	[data-credit-card]{
		width:435px;
		min-height:240px;
		border-radius: 10px;
		background-color: #5d6874;
	}
	[data-card-type]{
		display: block;
		width: 120px;
		height: 60px;
	}
	[data-cc-digits]{
		margin-top: 2em;
	}
	[data-cc-digits] input {
		color: white;
		font-size: 2em;
		line-height: 2em;
		border: none;
		background: none;
		margin-right: 0.5em;
	}
	[data-cc-info]{
		margin-top: 1em;
	}
	[data-cc-info] input {
		color:white;
		font-size: 1.2em;
		border: none;
		background: none;
	}
	[data-cc-info] input:nth-child(2) {
		padding-right: 10px;
		float: right;
	}
	[data-pay-btn]{
		bottom: 20px;
		border: 1px solid;
		position: fixed;
		width: 90%;
	}
    </style>
  </head>
  <body>
    
    <!-- your HTML goes here -->
    <div data-cart-info>
	   <h2 class="mdc-typography--headline4">
		   <span class="material-icons">shopping_cart</span>
		   <span data-bill ></span>
	   </h2>
	</div> 
	<div data-credit-card class="mdc-card mdc-card--outlined">
		<div class="mdc-card__primary-action">
			<img data-card-type src="https://placehold.it/120x60.png?text=Card"/>
			<div data-cc-digits>
				<input size="4" type="text" placeholder="----"/>
				<input size="4" type="text" placeholder="----"/>
				<input size="4" type="text" placeholder="----"/>
				<input size="4" type="text" placeholder="----"/>
			</div>
			<div data-cc-info>
				<input size="20" type="text" placeholder="Name Surname"/>
				<input size="6" type="text" placeholder="MM/YY"/>
			</div>
		</div>
	</div>
	<button data-pay-btn class="mdc-button">Pay Now</button>
    <script>
      
      const supportedCards = {
        visa, mastercard
      };

      const countries = [
        {
          code: "US",
          currency: "USD",
          currencyName: '',
          country: 'United States'
        },
        {
          code: "NG",
          currency: "NGN",
          currencyName: '',
          country: 'Nigeria'
        },
        {
          code: 'KE',
          currency: 'KES',
          currencyName: '',
          country: 'Kenya'
        },
        {
          code: 'UG',
          currency: 'UGX',
          currencyName: '',
          country: 'Uganda'
        },
        {
          code: 'RW',
          currency: 'RWF',
          currencyName: '',
          country: 'Rwanda'
        },
        {
          code: 'TZ',
          currency: 'TZS',
          currencyName: '',
          country: 'Tanzania'
        },
        {
          code: 'ZA',
          currency: 'ZAR',
          currencyName: '',
          country: 'South Africa'
        },
        {
          code: 'CM',
          currency: 'XAF',
          currencyName: '',
          country: 'Cameroon'
        },
        {
          code: 'GH',
          currency: 'GHS',
          currencyName: '',
          country: 'Ghana'
        }
      ];

      const billHype = () => {
        const billDisplay = document.querySelector('.mdc-typography--headline4');
        if (!billDisplay) return;

        billDisplay.addEventListener('click', () => {
          const billSpan = document.querySelector("[data-bill]");
          if (billSpan &&
            appState.bill &&
            appState.billFormatted &&
            appState.billFormatted === billSpan.textContent) {
            window.speechSynthesis.speak(
              new SpeechSynthesisUtterance(appState.billFormatted)
            );
          }
        });
      };
      const appState = {};
	  const formatAsMoney = (amount, buyerCountry) => {
		  let code = "US";
		  let newCurrency = "USD" ;
		  countries.forEach(item => { if (item.country === buyerCountry){
			  code = item.code;
			  newCurrency = item.currency;
		  }	 
		   });
		  return amount.toLocaleString("en" , + code, {
			  style: currency,
			  currency: newCurrency,
			  currencyDisplay: "symbol";
		  });
	  }  ;

	  const detectCardType = first4Digits => {};
	  const validateCardExpiryDate = () => {};
	  const validateCardHolderName = () => {};
	  const uiCanInteract = () => {};
	  const displayCartTotal = ({results}) =>{
		  const [data] = results;
		  const {itemsInCart, buyerCountry} = data;
		  appState.items = itemsInCart;
		  appState.country = buyerCountry;
		  appState.bill = itemsInCart.reduce( (accumulator,currentValue) => accumulator + currentValue.price * currentValue.qty, 0 );
		  appState.billFormatted = formatAsMoney(appState.bill , appState.country);
		  document.querySelector([data - bill]).textContent = appState.billFormatted;
		  appState.cardDigits = [];
		  uiCanInteract();
	  };
	  const fetchBill = () => {
        const apiHost = 'https://randomapi.com/api';
		const apiKey = '006b08a801d82d0c9824dcfdfdfa3b3c';
		const apiEndpoint = `${apiHost}/${apiKey}`;
        fetch(apiEndpoint)
		 .then(response => response.json()).then(data => displayCartTotal(data) ).catch(error => console.log(JSON.stringify(error)));
      };
      
      const startApp = () => {
      };
	  const startApp = () => {
		  fetchBill();
	  };
      startApp();
    </script>
  </body>
</html>