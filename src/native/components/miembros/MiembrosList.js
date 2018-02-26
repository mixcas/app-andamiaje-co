import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import _pull from 'lodash/pull';
import _clone from 'lodash/clone';
import styles from '../../constants/styles';

import Loading from '../Loading';
import Error from '../Error';
import DirectoryListItem from '../DirectoryListItem';

const MiembrosList = ({
  error,
  loading,
  miembros,
  member,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.miembro({ match: { params: { id: String(item.id) } } });

  const currentMember = miembros.find(miembro => miembro.id === member.uid);

  let displayCurrentMember = false;

  let miembrosArray = _clone(miembros);

  if (currentMember !== undefined && currentMember !== null) {
    displayCurrentMember = true;
    _pull(miembrosArray, currentMember);
  }

  return (
    <ScrollView style={styles.backgroundWhite}>
      <View>
        { displayCurrentMember &&
          <DirectoryListItem key={currentMember.key} id={currentMember.id} name={currentMember.displayName} images={currentMember.images} type={'miembro'} currentMember={true} />
        }
        { miembrosArray.map( (item, key) => <DirectoryListItem key={key} id={item.id} name={item.displayName} images={item.images} type={'miembro'} />)}
      </View>
    </ScrollView>
  );
};

MiembrosList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  miembros: PropTypes.array.isRequired,
  member: PropTypes.object.isRequired,
  reFetch: PropTypes.func,
};

MiembrosList.defaultProps = {
  error: null,
  reFetch: null,
};

export default MiembrosList;
