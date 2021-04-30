import React from "react"
import io from "socket.io-client"
import {View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-paper";

export default class App extends React.Component {
  
  state = {
    text: "",
    chatMessages: []
  }
  
  componentDidMount() {
    this.socket = io("http://192.168.1.124:3000")
    this.socket.on("chat message", msg => {
      this.setState({chatMessages: [msg, ...this.state.chatMessages]})
    })
  }
  handleChangeText = (text) => {
    this.setState({ text })
  }
  submitChatMessage = () => {
    this.socket.emit("chat message", this.state.text)
    this.setState({text: ""})
  }
  render(){
    const {text, chatMessages} = this.state;
    const chatMessageesArray = chatMessages.map(chatMessage => <Text key={chatMessage}>{chatMessage}</Text>)
    return (
      <View style={styles.container}>

        <TextInput 
          value={text} 
          onSubmitEditing={() => this.submitChatMessage()} 
          onChangeText={this.handleChangeText} />
          {chatMessageesArray}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
})