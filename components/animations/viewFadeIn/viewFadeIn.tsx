import React, {ReactNode}from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';

interface ViewFadeInProps  {
  isWidthFull?: boolean,
  children: ReactNode
}

export default function ViewFadeIn({ isWidthFull = false, children }: ViewFadeInProps) {
  return (
    <MotiView
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        style={styles.container}
    >
        <View style={[isWidthFull ? { width: '100%' } : {}, styles.main]}>
            {children}
        </View>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  main: {
    flex: 1,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  }
});