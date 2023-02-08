import {COLORS, FONTS} from '@/theme';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 3,
    },
    input: {
        fontSize: 16,
        color: COLORS.black,
        fontFamily: FONTS.regular,
        left: Platform.OS === 'android' ? 5 : 8,
    },
    errorInput: {
        color: 'tomato',
    },
    errorContainer: {
        borderColor: 'tomato',
    },
});

export default styles;
