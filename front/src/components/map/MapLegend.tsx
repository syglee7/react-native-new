import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useAuth from '@/hooks/queries/useAuth.ts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Category, MarkerColor} from '@/types';
import {colorHex, colors} from '@/constants';

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MapLegend() {
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};
  const inset = useSafeAreaInsets();

  return (
    <>
      {Object.values(categories as Category).join('') !== '' && (
        <View style={[styles.container, {top: inset.top || 20}]}>
          {categoryList.map((color, i) => {
            return (
              <Fragment key={i}>
                {categories?.[color] !== '' && (
                  <View style={styles.column}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colorHex[color]},
                      ]}>
                      <Text style={styles.legendText}>
                        {categories?.[color]}
                      </Text>
                    </View>
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  legendText: {
    color: colors.WHITE,
    fontWeight: '500',
    fontSize: 13,
  },
});

export default MapLegend;
