import React, { Component } from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
import { LoginButton, AccessToken } from "react-native-fbsdk";

export default class SocialLoginButton extends Component{

    render(){
        return <View style={[styles.container, this.props.style]}>
            <TouchableOpacity>
              <Text style={styles.socialButtonText}>
                {this.props.children}
              </Text>
            </TouchableOpacity>
          </View>;
    }
} 

const styles = StyleSheet.create({

    container:{
        width: 60,
        height: 60,
        backgroundColor: "#F03E18",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: 'center'
        
    },
    socialButtonText:{
        color: 'white',
        textAlign: 'center',
        fontSize:20,
        fontWeight: 'bold',
    },
   
});