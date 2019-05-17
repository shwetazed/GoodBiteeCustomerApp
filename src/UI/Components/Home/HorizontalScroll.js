import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import MenuCard from "../Home/MenuCard";

export default class HorizontalScroll extends Component {
    render() {
      return <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
              <View style = {styles.containerMenuCard}>
                <MenuCard />
              </View>
            <View style={styles.containerMenuCard}>
              <MenuCard />
            </View>
            <View style={styles.containerMenuCard}>
              <MenuCard />
            </View>
            <View style={styles.containerMenuCard}>
              <MenuCard />
            </View>
            <View style={styles.containerMenuCard}>
              <MenuCard />
            </View>
             
            </View>
          </ScrollView>
        </View>;
                 }
                }

              
   const styles = StyleSheet.create({

     container: { 
       paddingRight: 15, 
       flexDirection: 'row' 
      },
     containerMenuCard: {
       padding: 10,
       height: 300,
       width:300,
     }
   });