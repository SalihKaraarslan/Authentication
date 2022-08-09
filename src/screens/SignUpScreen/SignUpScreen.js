import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {username, password, email, name, phone_number} = data;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {phone_number, email, name, preferred_username: username},
      });

      navigation.navigate('ConfirmEmail', {username});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Hesap Oluştur</Text>

        <CustomInput
          name="name"
          control={control}
          placeholder="İsim"
          rules={{
            required: 'İsim zorunludur',
            minLength: {
              value: 3,
              message: 'İsim en az 3 karakter olmalıdır',
            },
            maxLength: {
              value: 24,
              message: 'İsim en fazla 24 karakter olmalıdır',
            },
          }}
        />

        <CustomInput
          name="username"
          control={control}
          placeholder="Kullanıcı Adı"
          rules={{
            required: 'Kullanıcı Adı zorunludur',
            minLength: {
              value: 3,
              message: 'Kullanıcı Adı en az 3 karakter olmalıdır',
            },
            maxLength: {
              value: 24,
              message: 'Kullanıcı Adı en fazla 24 karakter olmalıdır',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email zorunludur',
            pattern: {value: EMAIL_REGEX, message: 'Geçersiz email'},
          }}
        />
        <CustomInput
          name="phone_number"
          control={control}
          placeholder="Telefon Numarası"
          rules={{
            required: 'Telefon Numarası zorunludur',
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Parola"
          secureTextEntry
          rules={{
            required: 'Parola zorunludur',
            minLength: {
              value: 8,
              message: 'Parola en az 8 karakter olmalıdır',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Parola Tekrar"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Parolalar eşleşmiyor',
          }}
        />

        <CustomButton
          text="Kayıt Ol"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <CustomButton
          text="Bir hesabınız var mı? Giriş Yapın"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
