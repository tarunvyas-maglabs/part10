import {ActionSheetIOS, Pressable, StyleSheet, Text} from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  menu: {
    padding: 20,
    fontWeight: theme.fontWeights.semiBold,
    fontSize: theme.fontSizes.heading
  }
})

const RepositoryListHeader = ({ selectedOrder, handleOrderChange}) => {

  const showActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Latest Repostory', 'Highest Rating', 'Lowest Rating'],
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          handleOrderChange('latest');
        }
        if (buttonIndex === 2) {
          handleOrderChange('highest');
        }
        if (buttonIndex === 3) {
          handleOrderChange('lowest');
        }
      }
    )
  }


  return(
    <Pressable onPress={showActionSheet}>
      <Text style={styles.menu}>{selectedOrder === 'latest' ? 'Latest Repository' : selectedOrder === 'highest' ? 'Highest Rating' : 'Lowest Rating'}</Text>
    </Pressable>
  )
}

export default RepositoryListHeader;