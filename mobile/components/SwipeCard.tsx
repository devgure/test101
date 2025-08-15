// mobile/components/SwipeCard.tsx
import React from 'react';
import { View, Image, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

export default function SwipeCard({ user }) {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onGestureEvent = (event) => {
    translateX.value = event.nativeEvent.translationX;
  };

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === 4) {
      if (Math.abs(translateX.value) > 150) {
        translateX.value = withSpring(translateX.value > 0 ? 300 : -300);
      } else {
        translateX.value = withSpring(0);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <Animated.View style={[{ width: '100%', height: 500 }, animatedStyle]}>
        <Image source={{ uri: user.photo }} style={{ flex: 1, borderRadius: 15 }} />
        <Text style={{ color: 'white', fontSize: 24, position: 'absolute', bottom: 20, left: 20 }}>
          {user.name}, {user.age}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
}