import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

import {DRIVER_STATE} from '../navigation/nav.constants';

export default function useDriverInfo(data) {
  const navigation = useNavigation();
  const [info, useInfo] = useState(data);

  useEffect(() => {
    if (info && info.state === 'OffDuty') {
      // show the go online sheet
      navigation.NAVIGATE({routeName: DRIVER_STATE});
    }
  }, []);

  return info;
}
