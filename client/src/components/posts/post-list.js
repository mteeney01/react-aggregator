import React from 'react'
import { Header, Container, Segment, List } from 'semantic-ui-react'
import Client from '../../utils/client'
import PostItem from './post-item'

class PostList extends React.Component {
    state = { items: [] };

    componentWillMount = () => {
        Client.getPosts((result) => {
            this.setState({ items: result.posts });
        });
    };

    render() {
        return (
            <div className="post-list">
                <Header as="h1" className="page-header">Post List</Header>
                <Container fluid>
                    <div className="post-row">
                        <Segment raised>
                            <List divided relaxed>
                                {this.state.items.map((post, i) => {
                                    return (
                                        <PostItem post={post} key={i} onVoteClick={this.onVoteClick} />
                                    );
                                })}
                            </List>
                        </Segment>
                    </div>
                </Container>
            </div>
        );
    }
}

export default PostList;