import React from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import {Card, WingBlank} from '@ant-design/react-native';
import {inject, observer} from 'mobx-react';
import {Divider, Subheading, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

const width = Dimensions.get('window').width;
const HistoryScreen = ({}) => {
  return (
    <ScrollView style={{paddingTop: 10}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 15,
        }}>
        <Card style={{width: width / 2.5, marginLeft: 16}}>
          <Card.Body>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="car" size={30} />
              <Text style={{paddingTop: 5}}>100 Deliveries</Text>
            </View>
          </Card.Body>
        </Card>

        <Card style={{width: width / 2.5, marginRight: 16}}>
          <Card.Body>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="infocirlceo" size={30} />
              <Text style={{paddingTop: 5}}>$200 Earned</Text>
            </View>
          </Card.Body>
        </Card>
      </View>
      <WingBlank size="lg" style={{marginBottom: 15}}>
        <Card>
          <Card.Header
            style={{marginBottom: 10, background: '#F1F2F6'}}
            title="RETFSFA"
            extra="2.2 km"
          />
          <Card.Body>
            <View style={{paddingLeft: 16, paddingBottom: 20}}>
              <Caption>Pickup</Caption>
              <Subheading>Rantakiventie 20 A 5</Subheading>
            </View>
            <Divider />
            <View style={{paddingLeft: 16, paddingBottom: 20}}>
              <Caption>Dropoff</Caption>
              <Subheading>Rantakiventie 20 A 5</Subheading>
            </View>
          </Card.Body>
        </Card>
      </WingBlank>
    </ScrollView>
  );
};

export default inject('store')(observer(HistoryScreen));
