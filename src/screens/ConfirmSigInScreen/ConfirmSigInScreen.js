import React from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ConfirmSignInScreen = () => {
  const route = useRoute();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    try {
      await Auth.confirmSignIn(route?.params?.user, data.code, 'SMS_MFA');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Lütfen Kodu Giriniz</Text>

        <CustomInput
          name="code"
          placeholder="Kodu giriniz"
          control={control}
          rules={{required: 'Kod zorunludur'}}
        />

        <CustomButton text={'Onayla'} onPress={handleSubmit(onSignInPressed)} />
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

export default ConfirmSignInScreen;
