import styled from 'styled-components/native';

export default {
    Container: styled.SafeAreaView`
        flex: 1;
        background-color: #f5f6fa;
    `,
    Scroller: styled.ScrollView`
        flex: 1;
        padding: 20px;
    `,
    PhotoArea: styled.View``,
    Title: styled.Text`
        font-size: 17px;
        color: #000;
        margin: 10px 0;
    `,
    ButtonArea: styled.TouchableOpacity`
        flex-direction: row;
        background-color: #8863e6;
        padding: 12px;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    `,
    BackArea: styled.TouchableOpacity`
        margin-right: 15px;
    `,
    ButtonText: styled.Text`
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        margin-left: 10px;
    `,
    PhotoItem: styled.Image`
        height: 200px;
        border-radius: 5px;
        margin-bottom: 10px;
    `,
};
