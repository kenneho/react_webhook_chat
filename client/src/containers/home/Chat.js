import React from 'react';
import '../../index.css';
import { subscribeToChat } from '../../api';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatList: [],
      new_chat_message: ''
    };

    subscribeToChat((err, new_chat_message) => this.onAddItem(new_chat_message));
  }

  onAddItem = (new_chat_message) => {
    this.setState(state => {
      const chatList = state.chatList.concat(new_chat_message);

      return {
        chatList
      };
    });
  };

  render() {
    let author = this.state.new_chat_message["author"];
    let message = this.state.new_chat_message["message"];
    let chat_list = this.state.chatList;

    if (author != null) {
      chat_list.push (
        <div key={message} className="chat_entry">
          <blockquote className="speech-bubble">
            <p>{message}</p>
            <cite>{author}</cite>
          </blockquote>
          <p/>
        </div>
      );
    }

    const chat_elements = this.state.chatList.map(item => (
      <div key={item["message"]} className="chat_entry">
        <blockquote className="speech-bubble">
          <p>{item["message"]}</p>
          <cite>{item["author"]}</cite>
        </blockquote>
        <p/>
      </div>)
    )

    return (
      <div className="chat_row">
        <h1>Chat</h1>
        {chat_elements}
      </div>
    );
  }
}

export default Chat;
