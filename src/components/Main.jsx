import { Routes, Route, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8'
  },
});

const Main = () => {
  return(
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path='/' element={<RepositoryList/>}/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/:id' element={<SingleRepository/>}/>
        <Route path='/createReview' element={<CreateReview/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/myReviews' element={<MyReviews/>}/>
      </Routes>
    </View>
  )
};

export default Main;

