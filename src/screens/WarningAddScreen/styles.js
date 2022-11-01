import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #f5f6fa;
        padding: 20px;
    `,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        margin: 10px 0;
    `,
    PhotoArea: styled.View`
        margin-bottom: 30px;
    `,
    ButtonArea: styled.TouchableOpacity`
        background-color: #8863e6;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    `,
    ButtonText: styled.Text`
        font-size: 15px;
        font-weight: bold;
        color: #fff;
    `,
    PhotoScroll: styled.ScrollView``,
    PhotoAddButton: styled.TouchableOpacity`
        width: 65px;
        height: 65px;
        justify-content: center;
        align-items: center;
        border-width: 1px;
        border-color: #ccc;
        border-radius: 5px;
    `,
    PhotoItem: styled.View`
        width: 65px;
        border-width: 1px;
        border-color: #ccc;
        border-radius: 5px;
        padding-bottom: 5px;
        margin-left: 5px;
        align-items: center;
    `,
    Photo: styled.Image`
        width: 63px;
        height: 63px;
        margin-bottom: 5px;
        border-radius: 5px;
    `,
    PhotoRemoveButton: styled.TouchableOpacity``,
    LoadingText: styled.Text`
        font-size: 15px;
        margin: 10px 0;
    `,
};
