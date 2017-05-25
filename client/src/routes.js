import TopMenu from './components/common/top-menu'
import PostList from './components/posts/post-list'
import NewPost from './components/posts/new-post'
import PostDiscussion from './components/posts/post-discussion'
import Home from './components/common/home'

export const Routes = {
    HEADER: {path: '/', component: TopMenu, exact: false},
    INDEX: {path: '/', component: Home, exact: true},
    POST_DISCUSSION: {path: '/posts/:id', component: PostDiscussion, exact: true},
    POST_LIST: {path: '/posts', component: PostList, exact: true},
    NEW_POST: {path:'/post', component: NewPost, exact: true},
};

export const replaceParams = (path, params) => {
    let updated = '';
    for(let key in params) {
        let regex = new RegExp('(:'+key+')', 'gi');
        updated = path.replace(regex, params[key]);
    }

    return updated;
}