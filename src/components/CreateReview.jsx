import { Text, StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from './theme';
import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from "react-router";

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  button: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 4,
    backgroundColor: theme.colors.primary
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});

const validationSchema = yup.object().shape({
ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0).max(100),
  text: yup.string().optional()
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: ''
}

const CreateReview = () => {

  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const ownerName = values.ownerName;
    const rating = parseInt(values.rating);
    const repositoryName = values.repositoryName;
    const text = values.text;
    
    try {
      const { data }  = await createReview({ variables: { ownerName, rating, repositoryName, text } });
      const repositoryId = data?.createReview.repositoryId;
      navigate(`/${repositoryId}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })

  return(
    <View>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[styles.input, formik.touched.ownerName && formik.errors.ownerName && { borderColor: '#d73a4a' }]}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red', marginLeft: 12  }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[styles.input, formik.touched.repositoryName && formik.errors.repositoryName && { borderColor: '#d73a4a' }]}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red', marginLeft: 12  }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[styles.input, formik.touched.rating && formik.errors.rating && { borderColor: '#d73a4a' }]}
        onBlur={formik.handleBlur('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red', marginLeft: 12  }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder='Text'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[styles.input, { textAlignVertical: 'top', height: 100}, formik.touched.text && formik.errors.text && { borderColor: '#d73a4a' }] }
        onBlur={formik.handleBlur('text')}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: 'red', marginLeft: 12  }}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>

    </View>
  )


}

export default CreateReview