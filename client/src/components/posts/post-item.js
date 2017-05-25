import React from 'react'
import Client from '../../utils/client'
import { List, Button, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {Routes, replaceParams} from '../../routes'

class PostItem extends React.Component {
    state = {...this.props.post, posting: false, upClicked: false, downClicked: false};

    onVoteClick = (e, {data, icon}) => {
        let {upClicked, downClicked} = this.state;
        if (data.dir === 'up') {
            upClicked = true;
            downClicked = false;
        }
        if (data.dir === 'down') {
            upClicked = false;
            downClicked = true;
        }

        this.setState({
            // upClicked : upClicked,
            // downClicked: downClicked,
            posting: true
        });

        Client.vote(data.id, data.dir, (post) => {
            this.setState({...post, posting: false});
        });
    };

    render() {
        let { id, title, url, vote_count, upClicked, downClicked, posting } = this.state;
        let votingButtons = null;

        if (posting) {
            votingButtons = <Icon loading name='spinner' size='large' />
        }
        else {
            votingButtons = <span>
                                <Button icon={posting ? 'spinner' : 'up arrow'} color='yellow' data={{id: id, dir: 'up'}} disabled={upClicked} compact onClick={this.onVoteClick} />
                                <Button icon={posting ? 'spinner' : 'down arrow'} color='red' data={{id: id, dir: 'down'}} disabled={downClicked} compact onClick={this.onVoteClick} />
                                <span>{vote_count}</span>
                            </span>
        }

        return (
            <List.Item>
                <List.Content verticalAlign='middle'>
                    {votingButtons}
                </List.Content>
                <List.Content>
                    <List.Header as='a' className='table-cell' href={url}>{title}</List.Header>
                    <List.Description><Link to={replaceParams(Routes.POST_DISCUSSION.path, {id: id})}>comments</Link></List.Description>
                </List.Content>
            </List.Item>
        );
    }
}

export default PostItem;