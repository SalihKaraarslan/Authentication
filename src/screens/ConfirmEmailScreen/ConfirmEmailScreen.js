import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/core';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const username = watch('username');

  const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Başarılı', 'Kod telefonunuza gönderildi');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>E-postanızı onaylayın</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Kullanıcı adı"
          rules={{
            required: 'Kullanıcı adı zorunludur',
          }}
        />

        <CustomInput
          name="code"
          control={control}
          placeholder="Doğrulama kodunuzu girin"
          rules={{
            required: 'Doğrulama kodu zorunludur',
          }}
        />

        <CustomButton text="Onayla" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButton
          text="Kodu yeniden gönder"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Giriş sayfasına dön"
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

export default ConfirmEmailScreen;
