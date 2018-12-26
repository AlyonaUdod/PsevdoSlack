import React from 'react';
import { Comment, Image } from 'semantic-ui-react';
import moment from 'moment'
import {connect} from 'react-redux'

// console.log(this.props.message)
const isOwnMessage = (message, user) => message.user.id === user.uid ? 'message__self' : '';

const timeFromNow = time => moment(time).fromNow()

const SingleMessage = ({message, user}) => {

    //    console.log(user)
    // console.log(this.props.currentUser)
    
    return (
        <Comment>
            <Comment.Avatar src={message.user.id === user.uid ? user.photoURL : message.user.avatar}/>
            <Comment.Content className={isOwnMessage(message, user)}>
                <Comment.Author as='a'>
                    {message.user.name}
                </Comment.Author>
                <Comment.Metadata>
                    {timeFromNow(message.time)}
                </Comment.Metadata>

                  {message.image && <Image src={message.image} style={{maxWidth: '20%'}} className='message__image'/>} 
                  {message.content && <Comment.Text> {message.content} </Comment.Text> }

            </Comment.Content>
        </Comment>
    );
};

function MSTP (state) {
    return {
      currentUser: state.user.currentUser,
    }
  }

export default connect(MSTP)(SingleMessage);