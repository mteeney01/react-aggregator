
function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
    const error = new Error(`HTTP Error ${res.statusText}`);
    error.status = res.statusText;
    error.response = res;
    console.log(error);
    throw error;
};

function parseJSON(res) {
    return res.json();
};

const getPosts = (cb) => {
    return fetch('api/posts', {
            accept: 'application/json'
        }).then(checkStatus)
          .then(parseJSON)
          .then(cb);
};

const getPost = (id, cb) => {
    return fetch('../api/posts/' + id, {
            accept: 'application/json'
        }).then(checkStatus)
          .then(parseJSON)
          .then(cb);
};

const vote = (id, direction, cb) => {
    return fetch('api/posts/vote', {
        method: 'POST',
        body: JSON.stringify({id: id, direction: direction}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
};

const newPost = ({title, url}, cb) => {

    return fetch('api/posts/new', {
        method: 'POST',
        body: JSON.stringify({title: title, url: url}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
};

const Client = { getPosts, getPost, vote, newPost };
export default Client;