/**
 * Модуль содержит ключи интеграции и другие конфигурации
 */
const config = {
	// данные для api amocrm
	CLIENT_ID: "208f469d-1003-4fd7-a91a-d3a93aff4c32",
	CLIENT_SECRET: "TA7VIjpJU6B6LLJyzTo2vCauuBH31bUCU7zvOQC1HF5YUejokZf610UGfgkX4tQu",
	//AUTH_CODE живет 20 минут, при перезапуске скрипта нужно брать новый
	AUTH_CODE: "def50200caef15172ab033bd0a6111b4a3138eda2f706f1dcea474457908382d37d6cb270d4e74bb227bc228719baf96b5522eab49ee8a5bc7b7b43866579477964422e3d5d52ce2941162fb2986a3fae8573a0a11ff85deb47bd3c4b655cde8c97a2b147dccd22337e69cf811f6e42eea31a9ea09455de30dab7de2fb5d46683501b4fd9572e9ff70150dfdd855f3d6bad1fe1cc847d8f0ec991147a7c99723c2255e2c55bfdd4029bd1db4d849107e2a1cc47579ddf63bec246d48f63c3b9b0eec576bf90377c3aecab4cb02e01c463ba53058d4fbaf29ef640cb7f3fce70d01e649fd412504d33eee0c8a16907e3cd17ab0e1588f3615da23bf668e67a6627d6ec5775eb384c74a162d74d46a2a80170c4c89877c89ce34bc5cebedccea030626b3c3b4a2db72c5ad9fd7ce59efbd610713cd4b83df9ebc1fb215946000f5ede5be1b3b6d22e7ab9fad219fd1adae19a8561238e99f9a57a66cd564cb823a11cee70fe0f4ab5005932464057885af255e5214e182a9e120dda173e865bc8e37b57e20198733e0c274fb215c8579af912b11351944171b515d0cb76fe0613e01c754908d42026bebd81d0631d21e94905a0a475e6362006b0f8198a0a6be2e816c93c506295dedfe4a7e1061ed7d1ae4369a9c01607b6e37ee1ce2f03c8459e8de0adba61085b40bd1277f2296f8991a0ee3ecf17ca9",
	REDIRECT_URI: "https://570f-77-95-90-50.ngrok-free.app",
	SUB_DOMAIN: "psaraev",
	// конфигурация сервера
	PORT: 2000,
}; 

module.exports = config;
