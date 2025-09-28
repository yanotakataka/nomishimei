import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import Constants from 'expo-constants';

interface AdBannerProps {
  position?: 'top' | 'bottom';
}

// Expo Goで実行中かどうかを判定
const isExpoGo = Constants.executionEnvironment === 'storeClient';

// AdMobコンポーネントの動的インポート
let BannerAd: any;
let BannerAdSize: any;
let TestIds: any;

if (!isExpoGo && Platform.OS !== 'web') {
  try {
    const admob = require('react-native-google-mobile-ads');
    BannerAd = admob.BannerAd;
    BannerAdSize = admob.BannerAdSize;
    TestIds = admob.TestIds;
  } catch (error) {
    console.log('AdMob not available in this environment');
  }
}

// テスト広告IDを使用
const adUnitId = TestIds?.ADAPTIVE_BANNER || 'ca-app-pub-3940256099942544/1033173712';

export const AdBanner: React.FC<AdBannerProps> = ({ position = 'bottom' }) => {
  // Expo Goまたはウェブの場合は代替UIを表示
  if (isExpoGo || Platform.OS === 'web' || !BannerAd) {
    return (
      <View style={[styles.container, styles.placeholder, position === 'top' ? styles.top : styles.bottom]}>
        <Text style={styles.placeholderText}>広告スペース</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, position === 'top' ? styles.top : styles.bottom]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => {
          console.log('Ad loaded');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    marginTop: 10,
  },
  bottom: {
    marginBottom: 10,
  },
  placeholder: {
    height: 50,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 12,
  },
});