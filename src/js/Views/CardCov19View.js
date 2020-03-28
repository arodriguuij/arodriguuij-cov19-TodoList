class Cov19View {
    constructor(cov, classes) {
        this.cov = cov;
        this.render(classes);
    }

    render(classes) {
        const markup =
            `
            <div class="column ${classes} ">
                <div class="card"><strong>Country: </strong>${this.cov.country}</div>
                <div class="card"><strong>Last update: </strong>${this.cov.lastUpdate}</div>
                <div class="card"><strong class="orange">Confirmed: </strong>${this.cov.confirmed}</div>
                <div class="card"><strong class="red">Deaths: </strong>${this.cov.deaths}</div>
                <div class="card"><strong class="green">Recovered: </strong>${this.cov.recovered}</div>
            </div>
        `;
        document.getElementsByClassName('card-list')[0].insertAdjacentHTML('beforeend', markup);
    }
}

export default Cov19View;