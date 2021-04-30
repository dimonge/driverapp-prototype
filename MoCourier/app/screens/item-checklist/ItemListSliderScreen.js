import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Dimensions, ScrollView} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';

const {height} = Dimensions.get('window');

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
  },
};

class ItemListSliderScreen extends React.Component {
  constructor(props) {
    this.state = {
      showSlider: props.showSlider,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showSlider !== nextProps.showSlider) {
      this.setState({showSlider: nextProps.showSlider});
    }
  }
  render() {
    const {sliderContent, headerContent, children} = this.props;
    const {showSlider} = this.state;
    return (
      <View style={styles.container}>
        {children}
        {showSlider ? (
          <SlidingUpPanel
            ref={(c) => (this._panel = c)}
            draggableRange={{top: height / 1.15, bottom: 120}}
            minimumVelocityThreshold={0.5}
            animatedValue={this._draggedValue}
            allowMomentum={false}
            friction={0.5}
            showBackdrop={false}>
            <View style={styles.panel}>
              <View style={styles.panelHeader}>{headerContent}</View>
              <ScrollView>{sliderContent}</ScrollView>
            </View>
          </SlidingUpPanel>
        ) : null}
      </View>
    );
  }
}

ItemListSliderScreen.propTypes = {
  sliderContent: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
  showSlider: PropTypes.bool.isRequired,
  headerContent: PropTypes.element.isRequired,
};

export default ItemListSliderScreen;
