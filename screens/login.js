import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Button, Keyboard } from 'react-native';
import { Input } from '../components/input';
import MyTabs from '../routes/mytabs';

export default function Login({ navigation }) {
    const [inputs, setInputs] = React.useState({ email: '', password: '' });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = async () => {
        console.log(errors)
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Please write an email', 'email');
            isValid = false;
        }
        if (!inputs.password) {
            handleError('Please write password', 'password');
            isValid = false;
        }
        if (isValid) {
            navigation.navigate('dashboard')
            //  login();
        }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    return (
        <View style={styles.container}>

            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>

                <View style={styles.container2}>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey-300x300.png',
                        }}
                    />
                    <Text style={styles.firstTitle}>Welcome Back </Text>
                    <Text style={styles.secondTitle}>Sign to continue</Text>
                </View>

                <View >
                    <Input onChangeText={text => handleOnchange(text, 'email')}
                        onFocus={() => handleError(null, 'email')}
                        error={errors.email}
                        label='Email' placeholder="Enter your email address" iconName="email" />

                    <Input onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        error={errors.password}
                        label='Password' password placeholder="Enter your password" iconName="lock" />
                </View>

                <View style={{ marginTop: 40 }} >
                    <Button onPress={validate}
                        title="Log in"
                        color="#2196F3"
                        accessibilityLabel="Log in"
                    />
                </View>
            </ScrollView>
        </View>

    )



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        /*     alignItems: 'center',
            justifyContent: 'center', */
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tinyLogo: {
        width: 100,
        height: 100,
    },
    input: {
        height: 40,
        margin: 12,
        // borderWidth: 1,
    },
    firstTitle: {
        fontWeight: 'bold',
        fontSize: 30,

    },
    secondTitle: {
        fontWeight: 'bold',
        color: '#c1c3c2',

    },

});