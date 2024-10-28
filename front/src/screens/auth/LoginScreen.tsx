import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import InputField from '@/components/common/InputField.tsx';
import CustomButton from '@/components/common/CustomButton.tsx';
import useForm from '@/hooks/useForm.ts';
import {validateLogin} from '@/utils';
import useAuth from '@/hooks/queries/useAuth.ts';

function LoginScreen() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  //
  // const handleChangeEmail = (text: string) => {
  //   setEmail(text);
  // };
  //
  // const handleChangePassword = (text: string) => {
  //   setPassword(text);
  // };

  // const [values, setValues] = useState({
  //   email: '',
  //   password: '',
  // });
  //
  // const [touched, setTouched] = useState({
  //   email: false,
  //   password: false,
  // });
  //
  // const handleChangeText = (name: string, text: string) => {
  //   setValues({
  //     ...values,
  //     [name]: text,
  //   });
  // };
  //
  // const handleBlur = (name: string) => {
  //   setTouched({
  //     ...touched,
  //     [name]: true,
  //   });
  // };

  const passwordRef = useRef<TextInput | null>(null);
  const {loginMutation} = useAuth();

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  });

  const handleSubmit = () => {
    // console.log('values', login?.values);
    loginMutation.mutate(login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          placeholder="이메일"
          error={login.errors.email}
          touched={login?.touched.email}
          inputMode="email"
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          // value={values.email}
          // onChangeText={text => handleChangeText('email', text)}
          // onBlur={() => handleBlur('email')}
          {...login.getTextInputProps('email')}
        />
        <InputField
          ref={passwordRef}
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          blurOnSubmit={false}
          returnKeyType="join"
          onSubmitEditing={handleSubmit}
          // value={values.password}
          // onChangeText={text => handleChangeText('password', text)}
          // onBlur={() => handleBlur('password')}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton label="로그인" size="large" onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
});

export default LoginScreen;
