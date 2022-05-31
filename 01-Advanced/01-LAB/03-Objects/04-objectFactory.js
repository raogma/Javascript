function factory(library, orders) {
    let res = [];
    for (let i = 0; i < orders.length; i++) {
        res.push({});
        let order = orders[i];
        let device = order['template']['name'];
        res[i]['name'] = device;
        for (let action of order['parts']){
            let actionFn = library[action];
            res[i][action] = actionFn;
        }
                            //problem with assigning ( action1 )
            // res.push({ name: device, action1 : [action1Fn], action2: [action2Fn] });
        // res.push({ 'name': device, action1: action1Fn });
    }
    return res;
}


const library = {
    print: function () {
        console.log(`${this.name} is printing a page`);
    },
    scan: function () {
        console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
        console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};
const orders = [
    {
        template: { name: 'ACME Printer' },
        parts: ['print']
    },
    {
        template: { name: 'Initech Scanner' },
        parts: ['scan']
    },
    {
        template: { name: 'ComTron Copier' },
        parts: ['scan', 'print']
    },
    {
        template: { name: 'BoomBox Stereo' },
        parts: ['play']
    }
];
const products = factory(library, orders);
console.log(products);