import Express from 'express';
import * as BodyParser from 'body-parser';

const app = Express();
app.use(BodyParser.json());

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.use((req, res, next) => {
        console.log(req.path);
        next();
    });
}

function getNewId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

const posts = [
    {url: 'http://google.com', id: getNewId(), title: 'Google is this link', vote_count: 1 },
    {url: 'http://google.com', id: getNewId(), title: 'Google is this link', vote_count: 1 },
    {url: 'http://google.com', id: getNewId(), title: 'Google is this link', vote_count: 1 },
    {url: 'http://google.com', id: getNewId(), title: 'Google is this link', vote_count: 1 },
    {url: 'http://google.com', id: getNewId(), title: 'Google is this link', vote_count: 1 },
];


app.get('/api/posts', (req, res) => {
    let sortedPosts = posts.sort((a,b) => {
        // if a post has a higher vote, it must come first.
        if (a.vote_count < b.vote_count) {
            return 1;
        }

        if (a.vote_count > b.vote_count) {
            return -1;
        }

        return 0;
    });

    res.json({
        posts: sortedPosts
    });
});

app.get('/api/posts/:id', (req, res) => {
    let {id} = req.params;
    if (!id) {
        res.status(404);
        res.json({message: 'Not found', post: null});
    }

    let post = posts.filter(x => x.id === Number(id))[0];
    res.json({post: post});
});

app.post('/api/posts/vote', (req, res) => {
    let {id, direction} = req.body;
    let index = posts.findIndex(x => x.id === id);

    // if (direction === 'up') {
    //     if (posts[index].current_vote === 'up') {
    //         posts[index].current_vote = null;
    //         posts[index].vote_count--;
    //     }
    //     else if (posts[index].current_vote === 'down') {
    //         posts[index].current_vote = 'up';
    //         posts[index].vote_count += 2;
    //     }
    //     else {
    //         posts[index].current_vote = 'up';
    //         posts[index].vote_count++;
    //     }
    // }

    // if (direction === 'down' && posts[index].vote_count > 0) {
    //     if (posts[index].current_vote === 'down') {
    //         posts[index].current_vote = null;
    //         posts[index].vote_count++;
    //     }
    //     else if (posts[index].current_vote === 'up') {
    //         posts[index].current_vote = 'down';
    //         posts[index].vote_count -= 2;
    //     }
    //     else {
    //         posts[index].current_vote = 'down';
    //         posts[index].vote_count--;
    //     }
    // }

    if (direction === 'up') {
        posts[index].vote_count++;
    }

    if (direction === 'down') {
        posts[index].vote_count--;
    }

    res.json(posts[index]);
});

app.post('/api/posts/new', (req, res) => {
    let post = req.body;
    let new_id = getNewId();
    posts.push({...post, id: new_id, comments_url: '', vote_count: 1, current_vote: null});
    res.json({new_id: new_id});
});

app.listen(app.get('port'), () => {
    console.log(`Find the server on: port ${app.get('port')}/`);
});