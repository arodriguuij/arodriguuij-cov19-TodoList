class Cov19View {
    constructor() { }

    render(){
        const markup =
        `
            <div class="form-group">
                <h1>Cov-<small>19</small></h1>
                <button type="button" id="global-update-cov" class="btn btn btn-primary">Global</button>
                <button type="button" id="spain-update-cov" class="btn btn btn-primary">Spain</button>
                <button type="button" id="top-confirmed-update-cov" class="btn btn btn-warning">Top 10 Confirmed</button>
                <button type="button" id="top-deaths-update-cov" class="btn btn btn-danger">Top 10 Deaths</button>
                <button type="button" id="top-recovered-update-cov" class="btn btn btn-success">Top 10 Recovered</button>
            </div>
            <div class="form-group find-country" hidden>
                <div class="form">
                    <input type="text" class="form-control" placeholder="Find the country" name="task">
                </div>
            </div>
            <div class="row card-list">
            </div>
        `;
        document.getElementsByClassName('content')[0].insertAdjacentHTML('beforeend', markup);
    }
}

export default Cov19View;