class View {
    constructor() { };

    render() {
        const mark =
            `
                <div class='navigation-bar'>
                </div>
                <div class="content">
                </div>
            `;
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', mark);
    };
}
export default View;