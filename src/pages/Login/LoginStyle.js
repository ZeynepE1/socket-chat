import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer: {
        justifyContent: 'center',
    },
    bodyContainer: {
        justifyContent: 'center',
        padding: 20
    },
    logo: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('window').width / 2,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
    },
    fabRegister: {
        position: 'absolute',
        margin: 10,
        left: 0,
        bottom: 0,
        backgroundColor: '#4a18a5'
    },

})