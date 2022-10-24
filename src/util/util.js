import {useNavigation, CommonActions} from '@react-navigation/native';

export default {
    navigateWithReset: (navigator, destinationRoute) => {
        navigator.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{name: destinationRoute}],
            }),
        );
    },
};
