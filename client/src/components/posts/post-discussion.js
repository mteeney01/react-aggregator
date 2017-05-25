import React from 'react';
import {Container, Header, List, Button, TextArea, Input} from 'semantic-ui-react';
import Client from '../../utils/client'

class PostDiscussion extends React.Component {
    state = { post: null, id: null };

    componentWillMount() {
        let id = this.props.match.params.id;
        Client.getPost(id, ({post}) => {
            this.setState({id: post.id, post: post});
        });
    }

    render() {
        let title = 'Discussion';
        let {post} = this.state;
        if (post) {
            title = post.title + ' - Discussion';
        }

        return (
            <Container>
                <Header as='h1' className='page-header'>{title}</Header>
            </Container>
        );
    }
}

export default PostDiscussion;