// mobile/components/CameraUpload.tsx
import React, { useRef, useState } from 'react';
import { Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';
import { uploadPhoto } from '../services/api';

export default function CameraUpload() {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      const uri = result.assets[0].uri;
      const faces = await FaceDetector.detectAsync(uri, { mode: FaceDetector.FaceDetectorMode.fast });
      
      if (faces.faces.length === 0) {
        alert("No face detected. Please try again.");
        return;
      }

      setImage(uri);
      uploadPhoto(uri); // Send to backend
    }
  };

  return (
    <>
      <Button title="Take Photo" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </>
  );
}