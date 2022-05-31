function solution(x) {
    let data = {
        'upvote': () => this.upvotes++,
        'downvote': () => this.downvotes++,
        'score': () => {
            let res = [];
            let balance = this.upvotes - this.downvotes;
            let totalVotes = this.upvotes + this.downvotes
            let numToAdd = Math.ceil(Math.max(this.upvotes, this.downvotes) * 25 / 100);
            let positivePercentage = (this.upvotes/ totalVotes) * 100;
            
            let rating = 'new';
            if (totalVotes < 10) {
                rating = 'new';
            } else if (positivePercentage > 66) {
                rating = 'hot';
            } else if (balance >= 0 && totalVotes > 100) {
                rating = 'controversial';
            } else if (balance < 0) {
                rating = 'unpopular';
            }

            totalVotes > 50
                ? res = [this.upvotes + numToAdd, this.downvotes + numToAdd, balance, rating]
                : res = [this.upvotes, this.downvotes, balance, rating]

            return res;
        }
    }
    return data[x]();
}

// let post = {
//     id: '3',
//     author: 'emil',
//     content: 'wazaaaaa',
//     upvotes: 100,
//     downvotes: 100
// };
// solution.call(post, 'upvote');
// solution.call(post, 'downvote');
// let score = solution.call(post, 'score'); // [127, 127, 0, 'controversial']
// for (let i = 0; i < 50; i++) {
//     solution.call(post, 'downvote');         // (executed 50 times)
// }
// score = solution.call(post, 'score');     // [139, 189, -50, 'unpopular']

// var forumPost = {
//     id: '1',
//     author: 'pesho',
//     content: 'hi guys',
//     upvotes: 0,
//     downvotes: 0
// };

// solution.call(forumPost, 'upvote');
// solution.call(forumPost, 'score');

var forumPost = {
    id: '2',
    author: 'gosho',
    content: 'whats up?',
    upvotes: 120,
    downvotes: 30
};

solution.call(forumPost, 'score');