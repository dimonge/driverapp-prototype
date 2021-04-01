import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {TabView as CustomTabView, SceneMap} from 'react-native-tab-view';
import Layout from '../../Themes/Layout';

/**
 * Routes e.g [
      { key: "first", title: "First" },
      { key: "second", title: "Second" }
    ]

  Scene e.g {
        first: FirstRoute,
        second: SecondRoute
      }
 * @param {Route} param0 
 */
function TabView({index, routes, scene, onChange}) {
  const [state, setState] = useState({
    index,
    routes,
  });

  function _onIndexChange(index) {
    setState({
      ...state,
      index,
    });
    if (onChange) {
      onChange({index});
    }
  }
  return (
    <CustomTabView
      navigationState={state}
      renderScene={SceneMap(scene)}
      onIndexChange={_onIndexChange}
      initialLayout={{width: Layout.window.width}}
    />
  );
}

TabView.propTypes = {
  index: PropTypes.number,
};

TabView.defaultProps = {
  index: 0,
};
export default TabView;
