import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ReactNativeBlobUtil from 'react-native-blob-util';

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method, endpoint, params, token = null) => {
    method = method.toLowerCase();
    let fullUrl = `${baseUrl}${endpoint}`;
    let body = null;

    switch (method) {
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`;
            break;
        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
            break;
    }

    let headers = {'Content-Type': 'application/json'};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        let req = await fetch(fullUrl, {
            method,
            headers,
            body,
        });

        let json = await req.json();

        return json;
    } catch (ex) {
        return {error: ex.toString()};
    }
};

export default {
    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/validate', {}, token);
        return json;
    },
    login: async (cpf, pwd) => {
        let json = await request('post', '/auth/login', {cpf, password: pwd});
        return json;
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/logout', {}, token);

        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('property');

        return json;
    },
    register: async (name, email, cpf, password, passwordConfirm) => {
        let json = await request('post', '/auth/register', {
            name,
            email,
            cpf,
            password,
            password_confirm: passwordConfirm,
        });

        return json;
    },
    getWall: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/walls', {}, token);
        return json;
    },
    likeWallPost: async id => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', `/wall/${id}/like`, {}, token);
        return json;
    },
    getDocs: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/docs', {}, token);
        return json;
    },
    getBillets: async id => {
        let token = await AsyncStorage.getItem('token');
        let json = await request(
            'get',
            '/billets',
            {
                property: id,
            },
            token,
        );
        return json;
    },
    getWarnings: async id => {
        let token = await AsyncStorage.getItem('token');
        let json = await request(
            'get',
            '/warnings',
            {
                property: id,
            },
            token,
        );
        return json;
    },
    addWarningFile: async file => {
        let token = await AsyncStorage.getItem('token');

        try {
            let req = await ReactNativeBlobUtil.fetch(
                'POST',
                `${baseUrl}/warning/file`,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                [
                    {
                        name: 'photo',
                        filename: file.fileName,
                        type: file.type,
                        data: ReactNativeBlobUtil.wrap(file.uri),
                    },
                ],
            );

            let json = await req.json();
            return json;
        } catch (ex) {
            return {error: ex.toString()};
        }
    },
    addWarning: async (warningText, photoList) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request(
            'post',
            '/warning',
            {
                title: warningText,
                list: photoList.length > 0 ? photoList : {photo: ''},
                property: property.id,
            },
            token,
        );
        return json;
    },
    getReservations: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/reservations', {}, token);
        return json;
    },
    getLostAndFound: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('get', '/foundandlost', {}, token);
        return json;
    },
    setRecovered: async id => {
        let token = await AsyncStorage.getItem('token');
        let json = await request(
            'put',
            `/foundandlost/${id}`,
            {
                status: 'recovered',
            },
            token,
        );
        return json;
    },
    addLostItem: async (photo, description, where) => {
        let token = await AsyncStorage.getItem('token');

        try {
            let req = await ReactNativeBlobUtil.fetch(
                'POST',
                `${baseUrl}/foundandlost`,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                [
                    {
                        name: 'photo',
                        filename: photo.fileName,
                        type: photo.type,
                        data: ReactNativeBlobUtil.wrap(photo.uri),
                        description,
                        where,
                    },
                    {
                        name: 'description',
                        data: description,
                    },
                    {
                        name: 'where',
                        data: where,
                    },
                ],
            );

            let json = await req.json();
            return json;
        } catch (ex) {
            return {error: ex.toString()};
        }
    },
    getUnitInfo: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        let json = await request('get', `/unit/${property.id}`, {}, token);
        return json;
    },
    removeUnitItem: async (type, id) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);

        let json = await request(
            'post',
            `/unit/${property.id}/remove${type}`,
            {id},
            token,
        );
        return json;
    },
};
