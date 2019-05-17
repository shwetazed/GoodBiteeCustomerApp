import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import PageControl from "react-native-page-control";

export default class PageController extends Component{
    render(){

        return(
                <PageControl
                    style={{ position: 'absolute', left: 0, right: 250, bottom: 10 }}
                    numberOfPages={3}
                    currentPage={1}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor='white'
                    indicatorStyle={{ borderRadius: 5 }}
                    currentIndicatorStyle={{ borderRadius: 5 }}
                    indicatorSize={{ width: 8, height: 8 }}
                    onPageIndicatorPress={this.onItemTap}
                />

        );
    }
}