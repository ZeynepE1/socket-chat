import { StyleSheet, Dimensions } from "react-native";


export default StyleSheet.create({
    container: {
        flex: 1
    },
    logoContainer: {
        justifyContent: 'center',
    },
    bodyContainer: {
        justifyContent: 'center',
        padding: 20
    },
    logo: {
        height: Dimensions.get('window').height / 5,
        width: Dimensions.get('window').width / 4,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})