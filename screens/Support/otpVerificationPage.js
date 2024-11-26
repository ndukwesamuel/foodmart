import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

import { ReusableTitle } from "../../components/shared/Reuseablecomponent";


const OtpVerification = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ReusableTitle data={'OTP Verification'}/>
                <Text style={{textAlign: "center", marginTop: '8%'}}>A one time pin has been sent to +234(654 **** 999)</Text>
            </View>
            <View style={styles.form}>
                <Text style={{marginVertical: '3%', textAlign: "center"}}>Please enter pin below</Text>
                <View style={styles.ForminputContainer}>
                    <TextInput style={styles.formInput}/>
                    <TextInput style={styles.formInput}/>
                    <TextInput style={styles.formInput}/>
                    <TextInput style={styles.formInput}/>
                </View>
                <Pressable style={styles.verifyButton}>
                    <Text style={{color: '#F79B2C'}}>Verify OTP</Text>
                </Pressable>
            </View>
            <View>
                <View style={{flexDirection: 'row', gap: 4}}>
                    <Text style={{textAlign: "center", color: '#9B9B9B'}}>Resending OTP in</Text>
                    <Text style={{textAlign: "center", fontStyle: 'italic'}}>50 seconds</Text>
                </View>
                <Text style={{ marginVertical: '7%', color: '#F79B2C', borderBottomWidth: 1, borderBottomColor: '#F79B2C', width: '100%', marginLeft: 20}}>Send to Email Instead</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: '35%',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        justifyContent: 'center',
        width: '52%'
    },
    form: {
        paddingTop: '7%'
    },
    ForminputContainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginBottom: '7%'
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 7,
        width: '17.5%',
        height: 45
    },
    verifyButton: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F79B2C',
        borderRadius: 4,
        paddingVertical: 8,
        marginVertical: '5%'
    }
})

export default OtpVerification;