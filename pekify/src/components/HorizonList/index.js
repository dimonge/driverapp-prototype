/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  FlatList,
  Text,
  Image,
  Animated,
  View,
  RefreshControl,
} from "react-native";
import moment from "moment";

import {
  HorizonLayouts,
  Config,
  withTheme,
  withNavigation,
} from "@common";
import { connect } from "react-redux";
import { makeGetCollections } from "@selectors/LayoutSelector";
import HList from "./HList";

import styles from "./styles";

const layouts = [...HorizonLayouts];
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

@withNavigation
@withTheme
class HorizonList extends PureComponent {
  static propTypes = {
    fetchAllProductsLayout: PropTypes.func.isRequired,
    fetchProductsByCollections: PropTypes.func,
    list: PropTypes.array,
    onShowAll: PropTypes.func,
    onViewProductScreen: PropTypes.func,
    collections: PropTypes.array,
    setSelectedCategory: PropTypes.func,
    isFetching: PropTypes.bool.isRequired,
    showCategoriesScreen: PropTypes.func,
  };

  scrollAnimation = new Animated.Value(0);
  state = {
    currentDate: moment().format("dddd DD MMM"),
  };

  componentWillMount() {
    this.props.navigation.setParams({
      animatedHeader: this.scrollAnimation.interpolate({
        inputRange: [0, 170],
        outputRange: [-1, 1],
        extrapolate: "clamp",
      }),
    });
  }

  componentDidMount() {
    this._fetchAllPost();
  }

  /**
   * Fetch all products based on layouts
   */
  _fetchAllPost = () => {
    if (this.props.isConnected) {
      this.props.fetchAllProductsLayout();
    }
  };

  _fetchPost = ({ config, index, page }) => {
    const { fetchProductsByCollections } = this.props;
    fetchProductsByCollections(config.category, config.tag, page, index);
  };

  _renderHeader = () => {
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    return (
      <View style={styles.headerLogo}>
        <Image source={Config.LogoImage} style={styles.logo} />
        <Text style={[styles.headerDate, { color: text }]}>
          {this.state.currentDate.toUpperCase()}
        </Text>
      </View>
    );
  };

  _renderItem = ({ item, index }) => {
    const {
      list,
      news,
      onShowAll,
      onViewProductScreen,
      collections,
      setSelectedCategory,
      fetchProductsByCollections,
      showCategoriesScreen,
      language,
      currency
    } = this.props;

    return (
      <HList
        horizontal
        onViewProductScreen={onViewProductScreen}
        onShowAll={onShowAll}
        key={`taglist-${index}`}
        config={item}
        index={index}
        collection={collections[index]}
        list={list}
        news={news}
        language={language}
        fetchPost={this._fetchPost}
        fetchNews={this.props.fetchNews}
        navigation={this.props.navigation}
        fetchProductsByCollections={fetchProductsByCollections}
        setSelectedCategory={setSelectedCategory}
        showCategoriesScreen={showCategoriesScreen}
        currency={currency}
      />
    );
  };

  render() {
    const {
      isFetching,
      theme: { colors: text },
    } = this.props;

    const onScroll = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this.scrollAnimation,
            },
          },
        },
      ],
      { useNativeDriver: true }
    );

    return (
      <AnimatedFlatList
        data={layouts}
        keyExtractor={(item, index) => `h_${index}`}
        renderItem={this._renderItem}
        extraData={this.props}
        ListHeaderComponent={!Config.Layout.HideHomeLogo && this._renderHeader}
        scrollEventThrottle={1}
        refreshing={isFetching}
        contentContainerStyle={styles.mainList}
        {...{ onScroll }}
        refreshControl={
          <RefreshControl
            tintColor={text}
            refreshing={isFetching}
            progressViewOffset={30}
            onRefresh={this._fetchAllPost}
          />
        }
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getCollections = makeGetCollections();
  const mapStateToProps = (state, props) => {
    return {
      collections: getCollections(state, props),
      // collections: state.layouts.layout,
      isFetching: state.layouts.isFetching,
      list: state.categories.list,
      isConnected: state.netInfo.isConnected,
      news: state.news.list,
      currency: state.currency
    };
  };
  return mapStateToProps;
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: LayoutActions } = require("@redux/LayoutRedux");
  const { actions: CategoryActions } = require("@redux/CategoryRedux");
  const { actions: News } = require("@redux/NewsRedux");
  return {
    ...ownProps,
    ...stateProps,
    setSelectedCategory: (category) =>
      dispatch(CategoryActions.setSelectedCategory(category)),
    fetchNews: (per_page, page) => {
      News.fetchNews(dispatch, per_page, page);
    },
    fetchProductsByCollections: (categoryId, tagId, page = 1, index) => {
      LayoutActions.fetchProductsLayoutTagId(
        dispatch,
        categoryId,
        tagId,
        page,
        index
      );
    },
    fetchAllProductsLayout: () => {
      LayoutActions.fetchAllProductsLayout(dispatch);
    },
  };
};

export default connect(
  makeMapStateToProps,
  null,
  mergeProps
)(HorizonList);
