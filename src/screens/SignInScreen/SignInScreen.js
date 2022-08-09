import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const user = await Auth.signIn(data.username, data.password);
      navigation.navigate('ConfirmSignIn', {user: user});
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <CustomInput
          name="username"
          placeholder="Kullanıcı adı"
          control={control}
          rules={{required: 'Kullanıcı adı zorunludur'}}
        />

        <CustomInput
          name="password"
          placeholder="Parola"
          secureTextEntry
          control={control}
          rules={{
            required: 'Parola zorunludur',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Yükleniyor...' : 'Giriş Yap'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Hesap Oluştur"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 30,
  },
});

export default SignInScreen;
