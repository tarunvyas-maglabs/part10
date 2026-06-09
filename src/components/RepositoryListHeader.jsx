import { Picker } from '@react-native-picker/picker';

const RepositoryListHeader = ({ selectedOrder, handleOrderChange }) => {
  return(
    <Picker selectedValue={selectedOrder} onValueChange={handleOrderChange}>
      <Picker.Item label='Latest Repository' value='latest'/>
      <Picker.Item label='Highest Rating' value='highest'/>
      <Picker.Item label='Lowest Rating' value='lowest'/>
    </Picker>
  )
}

export default RepositoryListHeader;