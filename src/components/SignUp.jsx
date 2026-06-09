import { Text, View, StyleSheet, TextInput, Pressable } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: "white"
  },
  button: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: theme.fonts.main
  },
  error: {
    color: '#d73a4a',
    marginLeft: 12,
  }
})

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5).max(30),
  password: yup.string().required('Password is required').min(5).max(30),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match').required('Password confirmation is required')
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const SignUp = () => {

  const [signUp] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ variables: { username, password } });
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });


  return(
    <View>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.input, formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }]}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.error}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.input, formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }]}
        secureTextEntry={true}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.error}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder='Password confirmation'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        style={[styles.input, formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && { borderColor: '#d73a4a' }]}
        secureTextEntry={true}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.error}>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button} >
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
}

export default SignUp;