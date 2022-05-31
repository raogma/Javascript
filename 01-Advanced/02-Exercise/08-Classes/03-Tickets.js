function sol(ticketsArr, criteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let createdTickets = [];
    ticketsArr.map(x => createdTickets.push(new Ticket(...x.split('|'))))

    criteria === 'price' ? createdTickets.sort((t1, t2) => t1[criteria] - t2[criteria])
    : createdTickets.sort((t1, t2) => t1[criteria].localeCompare(t2[criteria]));

    return createdTickets;
}

console.log(sol(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'))
