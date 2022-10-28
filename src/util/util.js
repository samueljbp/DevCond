import {useNavigation, CommonActions} from '@react-navigation/native';
import {Toast, VStack} from 'native-base';
import ToastAlert from '../components/ToastAlert';

export default {
    navigateWithReset: (navigator, destinationRoute) => {
        /* navigator.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{name: destinationRoute}],
            }),
        ); */

        navigator.reset({
            index: 0,
            routes: [{name: destinationRoute}],
        });
    },
    showToastAlert: (
        title,
        description,
        variant = 'top-accent',
        isClosable = true,
        status = null,
    ) => {
        Toast.show({
            render: ({id}) => {
                return (
                    <VStack>
                        <ToastAlert
                            id={id}
                            title={title}
                            description={description}
                            variant={variant}
                            isClosable={isClosable}
                            status={status}
                        />
                    </VStack>
                );
            },
        });
    },
};
