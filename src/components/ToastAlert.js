import React from 'react';
import {
    Alert,
    VStack,
    HStack,
    Text,
    IconButton,
    CloseIcon,
    Center,
    Toast,
} from 'native-base';

export default ({id, title, description, variant, isClosable, status}) => {
    return (
        <Center>
            <Alert
                maxWidth="100%"
                alignSelf="center"
                flexDirection="row"
                colorScheme="violet"
                margin={5}
                status={status ? status : null}
                variant={variant}>
                <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                        flexShrink={1}
                        alignItems="center"
                        justifyContent="space-between">
                        <HStack space={2} flexShrink={1} alignItems="center">
                            <Alert.Icon />
                            <Text
                                fontSize="md"
                                fontWeight="medium"
                                flexShrink={1}
                                color={
                                    variant === 'solid'
                                        ? 'lightText'
                                        : variant !== 'outline'
                                        ? 'darkText'
                                        : null
                                }>
                                {title}
                            </Text>
                        </HStack>
                        {isClosable ? (
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" />}
                                _icon={{
                                    color:
                                        variant === 'solid'
                                            ? 'lightText'
                                            : 'darkText',
                                }}
                                onPress={() => Toast.close(id)}
                            />
                        ) : null}
                    </HStack>
                    <Text
                        px="6"
                        color={
                            variant === 'solid'
                                ? 'lightText'
                                : variant !== 'outline'
                                ? 'darkText'
                                : null
                        }>
                        {description}
                    </Text>
                </VStack>
            </Alert>
        </Center>
    );
};
