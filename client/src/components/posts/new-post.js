import React from 'react'
import {Redirect} from 'react-router-dom'
import { Container, Header, Form, Input, Segment } from 'semantic-ui-react'
import Client from '../../utils/client'
import {Routes} from '../../routes'

class NewPost extends React.Component {
    state = {
        title: '',
        url: ''
    };

    updateField = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        Client.newPost({...this.state}, () =>{
            this.setState({submitted: true});
        });
    };

    render() {
        return (
            <Container>
                {this.state.submitted ? <Redirect to={Routes.POST_LIST.path}  /> :
                <Container fluid>
                <Header as='h1' className='page-header'>New Post</Header>
                    <Segment raised>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field name='title' onChange={this.updateField} label='Title' control={Input} type='text' required />
                            <Form.Field name='url' onChange={this.updateField} label='URL' control={Input} type='url' required />
                            <Form.Button type='submit'>Submit</Form.Button>
                        </Form>
                    </Segment>
                </Container>
                }
            </Container>
        );
    }
}

export default NewPost;