import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';

import { getResizedImageUrl } from '../../../lib/utilities';

import MiembroCollection from './MiembroCollection';

import styles from '../../constants/styles';

const MiembroProfile = ({
	miembros,
	miembroId,
  member,
}) => {
  // Get this miembro from all miembros
  let miembro = null;

  if (miembroId && miembros) {
    miembro = miembros.find(item => item.id === miembroId);
  }

  const {
    displayName,
    images,
    collection,
  } = miembro;

  const placeholder = 'http://via.placeholder.com/100x100';

  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

	return (
    <ScrollView style={[styles.backgroundWhite]}>
      <View style={[
        styles.container,
        styles.bordered,
        styles.flexRow,
        styles.paddingTopBasic,
        styles.paddingBottomBasic,
      ]}>
        <View>
          <Image source={{ uri: imageSrc }} style={[styles.profileAvatarImage]} />
        </View>
        <View style={[styles.profileHeaderTextHolder]}>
          { displayName !== 'undefined' ? <View style={[styles.paddingBottomSmall]}><Text style={[styles.fontBold, styles.fontSizeMid]}>{displayName}</Text></View>  : '' }
        </View>
      </View>
      <MiembroCollection miembroId={miembroId} memberId={member.uid} collection={collection}/>
    </ScrollView>
	);
};

MiembroProfile.propTypes = {
	error: PropTypes.string,
	miembroId: PropTypes.string.isRequired,
	miembros: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.object.isRequired,
};

MiembroProfile.defaultProps = {
	error: null,
};

export default MiembroProfile;
