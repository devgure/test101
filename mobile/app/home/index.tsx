// mobile/app/home/index.tsx
import React from 'react';
import { View, Text } from 'react-native';
import SwipeCard from '../../components/SwipeCard';

export default function HomeScreen() {
  const users = [{ id: '1', name: 'Alice', age: 26, photo: 'https://i.pravatar.cc/300' }];

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {users.map(user => (
        <SwipeCard key={user.id} user={user} />
      ))}
    </View>
  );
}