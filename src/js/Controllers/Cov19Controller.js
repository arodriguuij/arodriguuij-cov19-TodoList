import axios from 'axios';
import Cov19 from '../Models/Cov19';
import CardCod19View from '../Views/CardCov19View';

class Cov19Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    getElementsDom() {
        this.cardList = document.getElementsByClassName('card-list')[0];
        this.findTheCountry = document.getElementsByClassName('find-country')[0];
        this.inputCountry = document.getElementsByClassName('form-control')[0];
        this.globalUpdateCov = document.getElementById('global-update-cov');
        this.spainUpdateCov = document.getElementById('spain-update-cov');
        this.topConfirmedUpdateCov = document.getElementById('top-confirmed-update-cov');
        this.topDeathsUpdateCov = document.getElementById('top-deaths-update-cov');
        this.topRecoveredUpdateCov = document.getElementById('top-recovered-update-cov');
    }

    listeners() {
        this.globalUpdateCov.addEventListener('click', () => this.buttonClicked('latest'));
        this.spainUpdateCov.addEventListener('click', () => this.buttonClicked('locations?country_code=ES'));
        this.topConfirmedUpdateCov.addEventListener('click', () => this.buttonClicked('locations', 'confirmed'));
        this.topDeathsUpdateCov.addEventListener('click', () => this.buttonClicked('locations', 'deaths'));
        this.topRecoveredUpdateCov.addEventListener('click', () => this.buttonClicked('locations', 'recovered'));
        this.inputCountry.addEventListener('keyup', (e) => this.findTheCountryFn(e));
    }

    isDataSaved(query) {
        switch (query) {
            case 'latest': return this.model.getLengthDataGlobal() !== 0;
            case 'locations?country_code=ES': return this.model.getLengthDataSpain() !== 0;
            case 'locations': return this.model.getLengthDataGlobalCountries() !== 0;
        }
    }

    resetInputFindByCountry() {
        this.inputCountry.value = '';
    }

    async buttonClicked(query, orderBy) {
        let dataFilteredByNumber;
        this.resetInputFindByCountry();
        this.showHiddenFilterByName(query);

        if (!this.isDataSaved(query)) {
            let dataFromAPI = await this.getDataFromAPI(query);
            const cov19s = this.transformDataToCovClasses(query, dataFromAPI.data);
            this.saveDataFromServer(cov19s, query);
        }
        if (orderBy) {
            this.ordering(query, orderBy);
            dataFilteredByNumber = this.filterByNum(query);
        }
        this.showCountries(query, orderBy, dataFilteredByNumber);
    }

    async getDataFromAPI(query) {
        try {
            let response;//, cov;
            response = await axios.get(`https://coronavirus-tracker-api.herokuapp.com/v2/${query}`);
            return response;
        } catch (error) {
            console.log('Error', error);
        }
    }

    saveDataFromServer(dataFromAPI, query) {
        const memory = this.model.getAssociationQueryToStorage()[query];
        const memoryMethodSet = this.createMethodName('set', memory);
        this.model[memoryMethodSet](dataFromAPI);
    }

    ordering(query, orderBy) {
        const memory = this.model.getAssociationQueryToStorage()[query];
        const memoryMethodGet = this.createMethodName('get', memory);
        const memoryMethodSet = this.createMethodName('set', memory);
        const comparator = 'comparator_' + orderBy;
        const orderingMethod = this[comparator];
        const datasOrdered = this.model[memoryMethodGet]().sort(orderingMethod);
        this.model[memoryMethodSet](datasOrdered);
    }

    showCountries(query, orderBy, dataFilteredByNumber) {
        this.emptyList();
        const memory = this.model.getAssociationQueryToStorage()[query];
        const memoryMethodGet = this.createMethodName('get', memory);
        if (orderBy)
            dataFilteredByNumber.map(e => new CardCod19View(e));
        else {
            const memo = this.model[memoryMethodGet]();
            new CardCod19View(memo, 'uniqueCard');
        }
    }

    comparator_confirmed(a, b) {
        if (a.confirmed > b.confirmed) return -1;
        else if (a.confirmed < b.confirmed) return 1;
        else return 0;
    }
    comparator_deaths(a, b) {
        if (a.deaths > b.deaths) return -1;
        else if (a.deaths < b.deaths) return 1;
        else return 0;
    }
    comparator_recovered(a, b) {
        if (a.recovered > b.recovered) return -1;
        else if (a.recovered < b.recovered) return 1;
        else return 0;
    }

    filterByNum(query) {
        const memory = this.model.getAssociationQueryToStorage()[query];
        const memoryMethodGet = this.createMethodName('get', memory);
        const memoryMethodSet = this.createMethodName('set', memory);
        const dataFiltered = this.model[memoryMethodGet]().slice(0, this.model.getNumCardsToShow())
        this.model[memoryMethodSet](dataFiltered);
        return this.model[memoryMethodGet]();
    }

    createMethodName(type, str1) {
        return type + str1.charAt(0).toUpperCase() + str1.slice(1);
    }

    emptyList() {
        this.cardList.innerHTML = '';
    }

    transformDataToCovClasses(query, data) {
        switch (query) {
            case 'latest':
                return new Cov19(
                    'Global',
                    'Today',
                    data.latest.confirmed,
                    data.latest.deaths,
                    data.latest.recovered);
            case 'locations?country_code=ES':
                return new Cov19(
                    'Spain',
                    new Date(data.locations[0].last_updated).toLocaleString(),
                    data.latest.confirmed,
                    data.latest.deaths,
                    data.latest.recovered);
            case 'locations':
                return this.transformDataToTopCovClasses(data.locations);
        }
    }

    transformDataToTopCovClasses(locations) {
        return locations.map(e => new Cov19(
            e.country,
            new Date(e.last_updated).toLocaleString(),
            e.latest.confirmed,
            e.latest.deaths,
            e.latest.recovered))
    }

    findTheCountryFn(e) {
        // Clear the timeout if it has already been set.
        // This will prevent the previous task from executing
        // if it has been less than <MILLISECONDS>
        clearTimeout(this.model.getTimeout());

        // Make a new timeout set to go off in 1000ms (1 second)
        const newTimeout = setTimeout(() => {
            this.findCountryArray(e.target.value);
        }, 300);
        this.model.setTimeout(newTimeout);
    }

    findCountryArray(name) {
        name.trim() === ''
            ? this.showCountriesOrderedByConfirmed()
            : this.showCountriesFilteredByName(name);
    }

    showCountriesOrderedByConfirmed() {
        this.ordering('locations', 'confirmed');
        let dataFilteredByNumber = this.filterByNum('locations');
        this.showCountries('locations', 'confirmed', dataFilteredByNumber);
    }

    showCountriesFilteredByName(name) {
        this.emptyList();
        let count = 0;
        const cov = this.model.getDataGlobalCountries().map(e => {
            if (e.country.toLowerCase().startsWith(name.toLowerCase())) {
                count++;
                return new CardCod19View(e);
            }
        });
        if (count === 1) {
            this.cardList.children[0].classList.add('uniqueCard')
        }
    }

    showHiddenFilterByName(query) {
        query === 'locations'
            ? this.findTheCountry.hidden = false
            : this.findTheCountry.hidden = true;
    }

    emptyList() {
        this.cardList.innerHTML = '';
    }

    renderCov19() {
        this.view.render(this.model.getDataGlobal());
        this.getElementsDom();
        this.listeners();
        this.buttonClicked('latest');
    }
}


export default Cov19Controller;