import React from 'react-native';
import {StyleSheet, View, Button} from 'react-native';
import Customer from '../customer/CustomerTracking';
import Driver from '../driver/Deliver';

class DeliveryApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isCustomer: false,
    };
  }
  render() {
    if (this.state.isCustomer) {
      return <Customer />;
    }
    if (this.state.isDriver) {
      return <Driver />;
    }
    return (
      <View style={styles.container}>
        <Button
          title="Customer"
          onPress={() => this.setState({isCustomer: true})}
        />
        <Button
          title="Driver"
          onPress={() => this.setState({isDriver: true})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 50,
    justifyContent: 'space-around',
  },
});
export default DeliveryApp;
