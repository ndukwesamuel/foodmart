import React from 'react';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';

import { ReusableBackButton } from "../../components/shared/SharedButton_Icon";
import { ReusableTitle } from "../../components/shared/Reuseablecomponent";

const DetailsPage = () => {
    return(
        <View style={{paddingTop: '13%', paddingHorizontal: '5%'}}>
            <View style={styles.container}>
                <ReusableBackButton/>
                <ReusableTitle data={'My Details'}/>
                <Text>Save</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

export default DetailsPage