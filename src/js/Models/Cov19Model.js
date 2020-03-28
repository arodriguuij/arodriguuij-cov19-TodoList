class Cov19Model{
    constructor(){
        this.dataGlobal = [];
        this.dataSpain = [];
        this.dataGlobalCountries = [];

        this.timeout = null;
        this.numCardsToShow = 10;

        this.associationQueryToStorage = {
            'latest': 'dataGlobal',
            'locations?country_code=ES': 'dataSpain',
            'locations': 'dataGlobalCountries'
        }
    }
    getDataGlobal(){
        return this.dataGlobal;
    }
    getLengthDataGlobal(){
        return this.dataGlobal.length;
    }
    setDataGlobal(data){
        this.dataGlobal = data;
    }

    getDataSpain(){
        return this.dataSpain;
    }
    getLengthDataSpain(){
        return this.dataSpain.length;
    }
    setDataSpain(data){
        this.dataSpain = data;
    }

    getDataGlobalCountries(){
        return this.dataGlobalCountries;
    }
    getLengthDataGlobalCountries(){
        return this.dataGlobalCountries.length;
    }
    setDataGlobalCountries(data){
        this.dataGlobalCountries = data;
    }

    getTimeout(){
        return this.timeout;
    }
    setTimeout(time){
        this.timeout = time;
    }

    getNumCardsToShow(){
        return this.numCardsToShow;
    }
    setNumCardsToShow(num){
        this.numCardsToShow = num;
    }
    getAssociationQueryToStorage(){
        return this.associationQueryToStorage;
    }
}
export default Cov19Model;