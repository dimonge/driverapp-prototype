import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {Button} from 'react-native-paper';
import {View} from 'native-base';

function CountryFlagMenu({selectedFlag, countryFlags}) {
  const [flag, setFlag] = useState(selectedFlag);

  return (
    <Button onPress={() => console.log('flag press')}>
      <View />
    </Button>
  );
}
