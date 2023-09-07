import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import routes from '../navigation/routes';

export class ResetPassword extends Component {
  handleLoginPress = () => {
    const { navigation } = this.props; 
    navigation.navigate(routes.LOGIN); 
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>
        A Link Was Sent To...,{"\n"}
        Use the link to reset your password{"\n"} 
        </Text>
        <Text style={styles.sText}>
          Check Your Spam Folder {"\n"}
          If You Don't Immediately See the Email{"\n"}
          Please submit another request {"\n"}
          if you don't see the link or it expires!
        </Text>
        <Button title="Login" onPress={this.handleLoginPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic', 
    lineHeight: 24, 
  },
  sText:{
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500', 
    color: 'purple', 
    fontStyle: 'italic', 
    lineHeight: 24, 
  }
});

export default ResetPassword;
